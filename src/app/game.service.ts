import { Injectable } from '@angular/core';
import { Player } from './core/Classes/Player';
import { GameState } from './core/Classes/GameStates';
import { Sip } from './core/Classes/Sip';
import { ResultPlayerData } from './core/Classes/ResultPlayerData';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly localStorageItemName = "gameState";
  private readonly playerObjectStoreName = "Players";
  private readonly sipObjectStoreName = "Sips";
  private readonly indexedDBName = "Fepalfu";
  
  /**
   * Start the game and initialise the game values
   * @param playerNames - A Set of `string` that contains the names of the players who plays.
   * @param nbTurns - A `number` that define how much turn will the game last.
   * @return A promise that resolve to `true` when all the players have been created to the database and the 
   * following game variable have been set: 
   * - currentPlayerId : `number` - Id IndexedDB of the first player to play
   * - currentTurnIndex : `number` - Current turn to be play, start at `0`
   * - maxTurnNumber : `number` - Number of turn the game will last before game over
   * - sips : `number` | `null` - Number of sips for this turn, the value is random between [1,6] and change each new turn. The value is `null` if the method setRandomSips have not been called
   * - probaToDrink : `number` | `null` - The probability to drink for a player if he choose to "ferlefu", value is random between [1,6]. The value is `null` if the method setProbaToDrink have not been called
   * - playerLuck : `number` | `null` - The value of the dice the player roll to know if he drinks or not when he choose to "ferlefu", value is random between [1,6]. The value is `null` if the method setPlayerLuck have not been called.
   */
  public startGame(playerNames : Set<string>, nbTurns : number) : Promise<boolean>{
    return new Promise((resolve,reject)=>{
      if(playerNames.size < 2){
        reject(`Too few player names provided, need at least 2 names and you provided ${playerNames.size}`);
        return;
      }
      if(nbTurns < 1){
        reject(`Too few turns number provided, need at least 1 and you provided ${nbTurns}`);
        return;
      }

      const openRequest : IDBOpenDBRequest = globalThis.indexedDB.open(this.indexedDBName,1);
      
      openRequest.onerror = (event : any)=>{
        reject("Error opening the Database");
        return;
      }
      openRequest.onblocked = ()=>{
        reject("Error : open request to IndexedDB is blocked probably due to a version change");
        return;
      }
      /**
       * If needed create Players and Sips object store
       */
      openRequest.onupgradeneeded = ()=>{
        const db = openRequest.result;
        db.createObjectStore(this.playerObjectStoreName,{keyPath:"id",autoIncrement:true});
        db.createObjectStore(this.sipObjectStoreName,{keyPath:"id",autoIncrement:true});
      }
      
      openRequest.onsuccess = ()=>{
        const db = openRequest.result;

        /**
         * Clear the sip object store
         */
        const transactionSip = db.transaction(this.sipObjectStoreName,"readwrite");
        const sipStore = transactionSip.objectStore(this.sipObjectStoreName);
        sipStore.clear();

        /**
         * Connect to the object store named "Players"
         */
        const transactionCreatePlayers = db.transaction(this.playerObjectStoreName,"readwrite");
        const playerStore = transactionCreatePlayers.objectStore(this.playerObjectStoreName);

        transactionCreatePlayers.onerror = function(){
          reject("Error during transaction to IndexedDB Players object store");
          return;
        }
        transactionCreatePlayers.onabort = function(){
          reject("Error indexedDB transaction aborted");
          return;
        }

        /**
         * Add all new players to the "Players" object store
         */
        playerStore.clear();  
        playerNames.forEach(name=>{ 
          const player = new Player(name);
          delete player.id; // Delete id attribute as this attribute is created by IndexedDB
          playerStore.add(player);
        });

        transactionCreatePlayers.oncomplete = ()=>{
          /**
           * Init a transaction on the "Players" object store in order to get all the players.
           */
          const transactionReadPlayers = db.transaction(this.playerObjectStoreName,"readonly");
          const playerStore = transactionReadPlayers.objectStore(this.playerObjectStoreName);  
          const getAllPlayersRequest = playerStore.getAll();

          getAllPlayersRequest.onerror = ()=>{
            reject(`Error during getAll request on IndexedDB's object store ${this.playerObjectStoreName}`);
            return;
          }

          getAllPlayersRequest.onsuccess = ()=>{
            /**
             * Init gameState in localStorage
            */
            const allPlayers = getAllPlayersRequest.result;

            if(isNaN(allPlayers[0].id)){
              reject("Error : current player id must be a number");
              return;
            }
            const gameState = new GameState(
              allPlayers[0].id,   // Id of the current player
              0,                  // Index ot the current turn, the game just start so the index is 0
              nbTurns             // How much turn the game will last
            );

            /**
             * Set an item inside the localStorage as a JSON string from a GameState object
             */
            localStorage.setItem(this.localStorageItemName,JSON.stringify(gameState));
            
            resolve(true);
          }
        }
      }
      /**Promise ends */
    });
  }

  /**
   * 
   * @param onsuccess - a callback function that you provide to retrieve data from the Object store. 
   * This callback function take to arguments  :
   * - playerStore : the IDBObjectStore of the "Players" object store with readonly access
   * - openRequest : the IDBOpenRequest in case you need to create other transaction on the DB 
   * @returns a promise that resolve to a IDBObjectStore of the "Players" Object store.
   */
  private readonlyPlayersStore(onsuccess : (playerStore : IDBObjectStore,openRequest:IDBOpenDBRequest)=>void) : Promise<IDBObjectStore>{
    return new Promise((resolve,reject)=>{

      const openRequest : IDBOpenDBRequest = globalThis.indexedDB.open(this.indexedDBName,1);
      
      openRequest.onerror = (event : any)=>{
        reject("Error opening the Database");
        return;
      }
      openRequest.onblocked = ()=>{
        reject("Error : open request to IndexedDB is blocked probably due to a version change");
        return;
      }
      
      openRequest.onsuccess = ()=>{
        /**
         * Connect to the object store named "Players"
         */
        const db = openRequest.result;
        const transactionCreatePlayers = db.transaction(this.playerObjectStoreName,"readonly");
        const playerStore = transactionCreatePlayers.objectStore(this.playerObjectStoreName);
        
        transactionCreatePlayers.onerror = function(){
          reject("Error during transaction to IndexedDB Players object store");
          return;
        }
        transactionCreatePlayers.onabort = function(){
          reject("Error indexedDB transaction aborted");
          return;
        }
        onsuccess(playerStore,openRequest);
        resolve(playerStore);
      }
      });
  }
  /**
   * @returns A promise that resolve to the current `Player`
   */
  public get currentPlayer() : Promise<Player>{
    return new Promise((resolve,reject)=>{
      // get player id from localStorage
      const jsonState = localStorage.getItem(this.localStorageItemName);
      if(jsonState=== null){
        reject("Error : Null game state inside localStorage");
        return;
      }
      const gameState : GameState = JSON.parse(jsonState);

      this.readonlyPlayersStore((playerStore : IDBObjectStore)=>{
        const getPlayerRequest = playerStore.get(gameState.currentPlayerId);
        getPlayerRequest.onsuccess = ()=>{
          const currentPlayer : Player = getPlayerRequest.result;
          if(currentPlayer === undefined){
            reject(`Error : Undefined player with id as ${gameState.currentPlayerId}`);
            return;
          }
          try {
            resolve(new Player(
              currentPlayer.name,
              currentPlayer.id,
              currentPlayer.nbCriticalFailure,
              currentPlayer.nbCriticalSuccess
              ));
              return;
          } catch (error) {
            reject(error)
            return;
          }
        }
      }).catch(error=>console.error(error));

    });
  }

  /**
   * Set the random number of sips to drink for this turn
   * @returns A promise that resolve to a `number` between [1;6], this value is stored in the local storage as followed :
   * - sips : `number` | `null` - Number of sips for this turn, the value is random between [1,6] and change each new turn. 
   * The value is `null` if the method setRandomSips have not been called
   */
  public setRandomSips() : Promise<number>{
    return new Promise((resolve,reject)=>{
      const sips = Math.floor(Math.random()*10%6)+1;

      this.updateGameState({
        sips
      })
      .then(newGameState=>{
        if(newGameState.sips && newGameState.sips === sips){
          resolve(newGameState.sips);
        }
        else{
          reject(`Error while updating the localStorage : sips equal ${newGameState.sips} and you ask for ${sips}`);
        }
      })
      .catch(error=>reject(error));
    });
  }

  /**
   * This method update the game state present in the localStorage depending of the state pass in the parameter
   * @param newGameState an object that correspond to the interface GameStateInterface
   * @returns the updated gameState
   * @example ``ts 
   * updateGameState({sips : 6}).then(gameState=>console.log(gameState.sips)); // Update only the sips property
   * ``
   */
  private updateGameState(newGameState : GameStateInterface) : Promise<GameState>{
    return new Promise((resolve,reject)=>{
      const json = localStorage.getItem(this.localStorageItemName);
      if(json){
        try {
          const gameState  : GameState = GameState.clone({...JSON.parse(json),...newGameState});
          localStorage.setItem(this.localStorageItemName,JSON.stringify(gameState));
          resolve(gameState);
        } catch (error) {
          reject(error);
        }
      }
      else{
        reject(`No item named ${this.localStorageItemName} where found in localStorage.`);
      }
    });
  }

  /**
   * 
   * @returns a promise that resolve as the current gameState
   */
  public getGameState() : Promise<GameState>{
    return new Promise((resolve,reject)=>{
      const json = localStorage.getItem(this.localStorageItemName);
      if(json){
        try{
          const gameState  : GameState = GameState.clone({...JSON.parse(json)});
          resolve(gameState);
        } catch (error) {
          reject(error);
        }
      }
      else{
        reject(`No item named ${this.localStorageItemName} where found in localStorage.`);
      }
    });
  }

  /**
   * Return the number of sips to drink this turn
   * @returns A promise that resolve to a `number`, the value is the number of sips currently in game for this turn.
   * The value is between [1;6]
   * - The resolve value is `null` if the method setRandomSips have not been called
   */
  public get sips() : Promise<number | null>{
    return new Promise((resolve,reject)=>{
      this.getGameState()
      .then((gameState : GameState)=>{
        resolve(gameState.sips);
      }).catch(error=>reject(error));
    });
  }

  /**
   * Roll a dice and set the probability for a player to drink
   * @returns  A promise that resolve to a `number` between [1;6], this value is stored in the local storage as followed :
   * - probaToDrink : `number` | `null` - The probability to drink for a player if he choose to "ferlefu", the value is random between [1,6]. 
   * The value is `null` if the method setProbaToDrink have not been called
   */
  public setProbaToDrink() : Promise<number>{
    return new Promise((resolve,reject)=>{
      const probaToDrink = Math.floor(Math.random()*10%6)+1;
      this.updateGameState({
        probaToDrink,
      });
      this.getGameState().then(gameState=>{
        if(gameState.probaToDrink === probaToDrink)
          resolve(probaToDrink);
        else
          reject(`Error : probaToDrink should be ${probaToDrink} but is ${gameState.probaToDrink} inside localStorage`);
      })
    });
  }

  /**
   * Return the probability for a player to drink
   * @returns A promise that resolve to a `number` or `null` if the method setProbaToDrink have not been called, the value is the probability to drink for a player that have choose to "ferlefu"
   */
  public get probaToDrink() : Promise<number | null>{
    return new Promise((resolve,reject)=>{
      this.getGameState()
      .then((gameState : GameState)=>{
        resolve(gameState.probaToDrink);
      })
      .catch(error=>reject(error));
    });
  }
  private readwriteSipsObjectStore(doSometingWithObjectStore : (sipsStore : IDBObjectStore,transaction : IDBTransaction,openRequest : IDBOpenDBRequest)=>Promise<void>) : Promise<void>{
    return new Promise((resolve,reject)=>{
      const openRequest = indexedDB.open(this.indexedDBName);

      openRequest.onsuccess = ()=>{
        const db = openRequest.result;
        const transaction = db.transaction(this.sipObjectStoreName,"readwrite"); 
        const sipsStore = transaction.objectStore(this.sipObjectStoreName);
        
        doSometingWithObjectStore(sipsStore,transaction,openRequest)
        .then(result=>resolve(result))
        .catch(error=>reject(error));
        
        transaction.onerror = (error)=>{
          reject(error);
        }
      }
      openRequest.onerror = (error)=>{
        reject(error);
      }
      
      
    })
  }

  /**
   * Make a player drink
   * @param sips : `number` - The value that will increment the number of sips the player has drink inside the BDD.
   * @param playerName : `string` - The name of the player that drinks.
   * @returns A promise that resolve to the `Sip` that the player drank
   */
  public drink(sips : number,playerName : string) : Promise<Sip>{
    return new Promise((resolve,reject)=>{
      if(sips <=0){
        reject("Argument sips should be bigger than 0");
        return;
      }
      /**
       * Get the sip store
       */
      this.readwriteSipsObjectStore(async (sipsStore : IDBObjectStore)=>{
        /**
         * Add sip data to the sip store
         */
        const addRequest = sipsStore.add(new Sip(sips,playerName));
        addRequest.onsuccess = ()=>{
          
          const getAllSipsRequest = sipsStore.getAll();
          
          getAllSipsRequest.onsuccess = ()=>{
            const allSips = getAllSipsRequest.result;
            const sip : Sip = allSips.find((sip : Sip)=>sip.targetPlayerName === playerName);
            resolve(sip);
            return;
          }
          
          getAllSipsRequest.onerror = (error)=>reject(error);
        }
      })
      .catch(error=>reject(error));

    });
  }

  /**
   * Make a player distribute sips to another player
   * @param sips : `number` - The value that will increment the number of sips the player has drink inside the BDD.
   * @param toPlayerName - The name of the player that drinks
   * @param fromPlayerName - The name of the player that distribute the sips
   * @returns A promise that resolve to the `Player` that took the sips
   */
  public distribute(sips : number,toPlayerName : string,fromPlayerName : string ) : Promise<Player>{
    return new Promise((resolve,reject)=> {
      if(sips <=0){
        reject("Argument sips should be bigger than 0");
        return;
      }

      /**
       * Get the player store
       */
      this.readonlyPlayersStore(async (playerStore)=>{
        /**
         * Get all the player from player store
         */
        const getAllPlayerRequest = playerStore.getAll();

        getAllPlayerRequest.onsuccess = ()=>{
          const players = getAllPlayerRequest.result;

          /**
           * Get the target player that should receive a sip
           */
          const targetPlayer =  players.find((player)=>player.name === toPlayerName);

          /**
           * Get the player that should give a sip
           */
          const giverPlayer =  players.find((player)=>player.name === fromPlayerName);

          /**
           * Reject if the target player does not exist on the player Store
           */
          if(!targetPlayer){
            reject(`No player is named ${toPlayerName}`);
            return;
          }

          /**
           * Reject if the giverPlayer does not exist on the player Store
           */
          if(!giverPlayer){
            reject(`No player is named ${fromPlayerName}`);
            return;
          }

          /**
           * Get the Sip store
           */
          this.readwriteSipsObjectStore(async (sipsStore)=>{
            /**
             * Add sip data to sip store
             */
            const addRequest = sipsStore.add(new Sip(sips,toPlayerName,Sip.DISTRIBUTED,fromPlayerName));

            addRequest.onsuccess = ()=>{
              /**
               * Resolve and send the player that drank
               */
              resolve(targetPlayer as Player);
              return;
            }

            addRequest.onerror = (error)=>{
              reject(error);
              return;
            }
          });
          }

      }).catch(error=>reject(error));
    });
  }

  /**
   * Set the player luck by rolling a dice
   * @returns A promise that resolve to a `number`, this value is a dice roll result between [1;6]
   */
  public setPlayerLuck() : Promise<number>{
    return new Promise((resolve,reject)=>{
      const playerLuck = Math.floor(Math.random()*10%6)+1;
      if(playerLuck < 1 || playerLuck > 6){
        reject("Player luck should be between 1 and 6 included.");
      }
      this.updateGameState({
        playerLuck
      })
      .then(gameState=>{
        if(gameState.playerLuck === playerLuck)
          resolve(gameState.playerLuck);
        else
          reject(`Error : playerLuck should be ${playerLuck} but is ${gameState.playerLuck} inside localStorage`);
      })
      .catch(error=>reject(error));
    });
  }

  /**
   * Get the player luck
   * @returns A promise that resolve to a `number` or `null` if setPlayerLuck method have not been called, this value is a dice roll result between [1;6]
   */
  public get playerLuck() : Promise<number | null >{
    return new Promise((resolve,reject)=>{
      this.getGameState()
      .then(gameState=>{
        resolve(gameState.playerLuck);
      }).catch(error=>reject(error));
    });
  }

  /**
   * Tell if the game is over or not
   * @returns A promise that resolve to `true` if the number of remains equal or is bigger than the maximum turn number set in the start method.
   */
  public isGameOver() : Promise<boolean>{
    return new Promise((resolve,reject)=>{
        this.getGameState()
        .then((gameState : GameState) =>{
          resolve(isNaN(gameState.maxTurnNumber) && gameState.currentTurnIndex < gameState.maxTurnNumber);
        })
        .catch(error=>{
          reject(error);          
        })
    });
  }


  /**
   * Give the current result and stats of the players based on the BDD and the localStorage
   * @returns A promise that resolve to a `Result` object
   */
  public get results() : Promise<ResultPlayerData[]>{
    return new Promise((resolve,reject)=>{
      this.readwriteSipsObjectStore(async (sipsStore : IDBObjectStore)=>{
        const getAllSipsRequest : IDBRequest = sipsStore.getAll();
        getAllSipsRequest.onerror = (error)=>{ reject(error); return; }
        getAllSipsRequest.onsuccess = async ()=>{
          const sips : Array<Sip> = getAllSipsRequest.result;
          const players = await this.players;
          let resultPlayerDatas :ResultPlayerData[] = [];
          players.forEach(player=>{
            const sipsDistrubutedToPlayer = sips.filter((sip : Sip)=>(sip.targetPlayerName === player.name && sip.context.distributed === true));
            
            /**
             * Getting a map of the the amount of sips distributed to the player 
             * and the name of the player that gave the sips.
            */
            let nbSipsReceivedFrom : Map<string,number> = new Map<string,number>();
            sipsDistrubutedToPlayer.forEach((distributedSip : Sip)=>{
              if(!distributedSip.distributorPlayerName)return;
              
              nbSipsReceivedFrom.set(
                distributedSip.distributorPlayerName,
                nbSipsReceivedFrom.get(distributedSip.distributorPlayerName)||0+distributedSip.nbSips
              );
            });

            /**
             * Getting the name of the player that gave the most sips
             * aka the nemesis
             */
            let nemesisName  = "";
            const maxSipsgivenByOtherPlayer = Math.max(...nbSipsReceivedFrom.values());
            nbSipsReceivedFrom.forEach((nbSips,distributorName)=>{
              if(nbSips === maxSipsgivenByOtherPlayer){
                nemesisName = distributorName;
              }
            });

            /**
             * Getting the amount of sips taken by the player
             */
            let playerSips  : Sip[] = [];
            let nbSipsTaken = 0;
            sips.forEach((sip)=>{
              if(sip.targetPlayerName === player.name){
                playerSips.push(sip);
                nbSipsTaken+=sip.nbSips;
              }
            });

            /**
             * Getting the amount of sips distributed to other player by the current player
             */
            let nbSipsDistributed = 0;
            let sipsDistributed : Sip[] = [];
            sips.forEach((sip)=>{
              if(sip.distributorPlayerName === player.name && sip.context.distributed === true){
                sipsDistributed.push(sip);
                nbSipsDistributed+=sip.nbSips;
              }
            });

            /**
             * Getting the amount of sips received from other player to the current player
             */
            let nbSipsReceived = 0;
            let sipsReceived : Sip[] = [];
            sips.forEach(sip=>{
              if(sip.targetPlayerName === player.name && sip.context.distributed === true){
                sipsReceived.push(sip);
                nbSipsReceived+=sip.nbSips;
              }
            });

            resultPlayerDatas.push(
              new ResultPlayerData(
                player.name,
                nemesisName, 
                nbSipsTaken,
                nbSipsDistributed,
                nbSipsReceived,
                sips
              )
            );
          });
          resolve(resultPlayerDatas);

        }
        
      }).catch(error=>console.log(error));
      
      /**
       * name : the name of the player of the row
       * nemesis : the player that distribute the bigger amount of sips to the player of the row
       * gorgées total bue par le player row peut importe d'ou ca viens
       * gorgées distribute par le player row a n'importe quel player
       * gorgées reçu 
       * 
       * 
       * 
       * 
       */
    });
  }

  /**
   * Make the game step one more turn and initialise the game values.
   * @returns A promise that resolve to `true` when the following game variable have been reset. 
   * - currentPlayerId : `number` - Id IndexedDB of the current player to play
   * - currentTurnIndex : `number` - Current turn to be play
   * - sips : `number` | `null` - Number of sips for this turn, the value is random between [1,6] and change each new turn. The value is `null` if the method setRandomSips have not been called
   * - probaToDrink : `number` | `null` - The probability to drink for a player if he choose to "ferlefu", value is random between [1,6]. The value is `null` if the method setProbaToDrink have not been called
   * - playerLuck : `number` | `null` - The value of the dice the player roll to know if he drinks or not when he choose to "ferlefu", value is random between [1,6]. The value is `null` if the method setPlayerLuck have not been called.
   */
  public nextTurn() : Promise<boolean>{
    return new Promise(async (resolve,reject)=>{
      /**
       * Update currentPlayerIndex to the next player Id
       */
      const currentPlayer = await this.currentPlayer;
      const players = await this.players;

      players.forEach((player,index,players)=>{
        if(player.id === currentPlayer.id){
          /**
           * Set the new player id to be the next player id 
           * If the current player is the last player of the list the next player id is the first player id
           */
          const nextPlayerId = index+1 >= players.length ? players[0].id : players[index+1].id;

          /**
           * Update game state for the next turn
           */
          this.getGameState()
          .then(gameState=>{
            this.updateGameState({
              currentPlayerId : nextPlayerId,
              currentTurnIndex : ++gameState.currentTurnIndex,
              sips : null,
              probaToDrink : null,
              playerLuck : null
            })
            .then(gameState=>{
              resolve(true);
            }).catch(error=>reject(error));
          }).catch(error=>reject(error));
        }
      });

    });
  }

  public get players() : Promise<Array<Player>>{
    return new Promise((resolve,reject)=>{
      this.readonlyPlayersStore((playerStore)=>{
        const getAllRequest = playerStore.getAll();

        getAllRequest.onerror = (error)=>{
          reject(error);
          return;
        }

        getAllRequest.onsuccess = ()=>{
          const players = getAllRequest.result as Array<Player>;
          resolve(players);
          return;
        }

      });
    })
  }

}


interface GameStateInterface {
  currentPlayerId ?: number;
  currentTurnIndex  ?: number,
  maxTurnNumber  ?: number,
  sips  ?: number | null,
  probaToDrink ?: number | null,
  playerLuck ?: number | null
}