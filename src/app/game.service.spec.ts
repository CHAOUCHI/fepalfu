import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { numberAttribute } from '@angular/core';

describe('GameService : Start a gaming session',()=>{
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should start the game",()=>{
    // Action
    const playersNames = ["Alexstrasza","Tyranastrasz","Nefarian","Onyxia","Korialstrasz","Malygos","Neltharion"];
    const nbTurn = 10;
    service.start(playersNames,nbTurn);

    // Tests

    expect(service.currentPlayer).toEqual(service.players[0]);


    expect(service.sips).not.toBeNaN();
    expect(service.sips).toBeGreaterThanOrEqual(1);
    expect(service.sips).toBeLessThanOrEqual(6);

    expect(service.totalTurnNumber).not.toBeNaN();
    expect(service.remaningTurnNumber).not.toBeNaN();
    expect(service.currentTurn).not.toBeNaN();

    expect(service.totalTurnNumber).toEqual(nbTurn);
    expect(service.remaningTurnNumber).toEqual(0);
    expect(service.currentTurn).toEqual(1);

    expect(service.probaToDrink).toBeNull();

    expect(service.playerLuck).toBeNull();
    
    expect(service.players).toBeInstanceOf(Array<Player>);
    expect(service.players.length).toEqual(playersNames.length);

    for (let i = 0; i < service.players.length; i++) {
      expect(player[i].name).toEqual(playersNames[i]);

      expect(service.sipsTaken).not.toBeNaN();
      expect(service.sipsReceived).not.toBeNaN();
      expect(service.sipsDistributed).not.toBeNaN();
      expect(service.nbCriticalSuccess).not.toBeNaN();
      expect(service.nbCriticalFailure).not.toBeNaN();

      expect(player[i].sipsTaken).toEqual(0);
      expect(player[i].sipsReceived).toEqual(0);
      expect(player[i].sipsDistributed).toEqual(0);
      expect(player[i].nbCriticalSuccess).toEqual(0);
      expect(player[i].nbCriticalFailure).toEqual(0);
      
      service.players.forEach(player => {
        expect(player[i].sipsDistributedTo(player));
        expect(player[i].sipsReceivedFrom(player));
      });
      
      expect(player[i].nemesis).toBeNull();
    }

  });
});

describe("GameService : gaming session life",()=>{
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);

    const playersNames = ["Alexstrasza","Tyranastrasz","Nefarian","Onyxia","Korialstrasz","Malygos","Neltharion"];
    const nbTurn = 10;
    service.start(playersNames,nbTurn);
  });

  it("should roll the 'probabilty to drink' dice",()=>{
    expect(service.roll(GameService.PROBA_TO_DRINK_DICE)).toBeInstanceOf(GameService);
    expect(service.probaToDrink).toBeGreaterThanOrEqual(1);
    expect(service.probaToDrink).toBeLessThanOrEqual(6);
    expect(service.playerLuck).toBeNull();
  });

  it("should make a player drink 2 sips",()=>{
    const playerName = "Onyxia";
    service.player(playerName).drink(2);
  });

  it("should make a player distribute 1 sip",()=>{
    const playerName = "Onyxia";
    const otherPlayerName = "Alexstrasza";
    
    expect(service.player(playerName).distribute(1,otherPlayerName)).toBeInstanceOf(GameService);
    
    expect(service.sipsDistributed).toEqual(1);
    expect(service.player(playerName).sipsDistributedTo(otherPlayerName)).toEqual(1);
    
    expect(service.player(otherPlayerName).sipsTaken).toEqual(1);
    expect(service.player(otherPlayerName).sipsReceivedFrom(playerName)).toEqual(1);
  });

  it("should roll the 'player luck' dice",()=>{
    expect(service.roll(GameService.PLAYER_LUCK_DICE)).toBeInstanceOf(GameService);
    expect(service.playerLuck).not.toBeNaN();
    expect(service.playerLuck).toBeGreaterThanOrEqual(1);
    expect(service.playerLuck).toBeLessThanOrEqual(6);
  });

  it("should pass to the next turn",()=>{
    service.roll(GameService.PROBA_TO_DRINK_DICE);
    service.roll(GameService.PLAYER_LUCK_DICE);

    const formertotalTurnNumber = service.totalTurnNumber;

    service.nextTurn();

    expect(service.sips).not.toBeNaN();
    expect(service.sips).toBeGreaterThanOrEqual(1);
    expect(service.sips).toBeLessThanOrEqual(6);

    expect(service.totalTurnNumber).not.toBeNaN();
    expect(service.remaningTurnNumber).not.toBeNaN();
    expect(service.currentTurn).not.toBeNaN();

    expect(service.totalTurnNumber).toEqual(formertotalTurnNumber);
    expect(service.remaningTurnNumber).toEqual(service.totalTurnNumber-1);
    expect(service.currentTurn).toEqual(2);

    expect(service.probaToDrink).toBeNull();

    expect(service.playerLuck).toBeNull();
    
    expect(service.players).toBeInstanceOf(Array<Player>);
    expect(service.players.length).toEqual(playersNames.length);

  });

  it("should set the current player correctly as the turns rolls",()=>{
    
    expect(service.currentPlayer).toEqual(service.players[0]);
    service.nextTurn();
    expect(service.currentPlayer).toEqual(service.players[1]);
    
    service.nextTurn();
    expect(service.currentPlayer).toEqual(service.players[2]);
    
    service.nextTurn();
    expect(service.currentPlayer).toEqual(service.players[3]);
    
    service.nextTurn();
    expect(service.currentPlayer).toEqual(service.players[4]);
    
    service.nextTurn();
    expect(service.currentPlayer).toEqual(service.players[5]);
    
    service.nextTurn();
    expect(service.currentPlayer).toEqual(service.players[6]);
    
    service.nextTurn();
    expect(service.currentPlayer).toEqual(service.players[7]);

    //expect(service.currentPlayer).toEqual(service.players[service.currentTurn%service.players.length -1])
  });
});

describe("GameService running an entire session",()=>{
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);

    const playersNames = ["Alexstrasza","Tyranastrasz","Nefarian","Onyxia","Korialstrasz","Malygos","Neltharion"];
    const nbTurn = 10;
    service.start(playersNames,nbTurn);
  });

  it("should return the game results",()=>{
    
    while(session.currentTurn !== session.totalTurnNumber+1){
      service.roll(GameService.PROBA_TO_DRINK_DICE);

      if(service.probaToDrink === 1){
        // Critical failure
        service.currentPlayer.drink(service.sips);
      }
      else if(service.probaToDrink === 6){
        // Critical Success

        // Get a player that is not the current player
        service.players.forEach(player=>{
          if(player !== service.currentPlayer){
            // Distribute to that player
            service.currentPlayer.distribute(service.sips,player);
            return;
          }
        });
      }else{
        // Dilemma
        if(Math.random()){
          // Drink
          session.currentPlayer.drink(session.sips);
        }else{
          // Felefu
          service.roll(GameService.PLAYER_LUCK_DICE);
          if(service.playerLuck > service.probaToDrink){
            // player won, he distribute
            
            // Get a player that is not the current player
            service.players.forEach(player=>{
              if(player !== service.currentPlayer){
                // Distribute to that player
                service.currentPlayer.distribute(service.sips,player);
                return;
              }
            });
          }
          else{
            // player fails
            service.currentPlayer.drink(service.sips*2);
          }
        }
      }
      service.nextTurn();
    }
    // GAME OVER


    let gameResults = service.getResults();

    expect(gameResults).toBeInstanceOf(Array<Result>);
    // TEST RESULTS
    gameResults.forEach(result : Result=>{
        expect(result.player).toBeInstanceOf(Player);
        
        expect(result.nemesis.constructor.name === "Player" || result.nemesis === null).toBeTruthy();

        expect(result.sipsTaken).not.toBeNaN();
        expect(result.sipsDistributed).not.toBeNaN();
        expect(result.sipsReceived).not.toBeNaN();
        expect(result.nbCriticalFailure).not.toBeNaN();
        expect(result.nbCriticalSuccess).not.toBeNaN();

        expect(result.sipsTaken).toBeGreaterThanOrEqual(0);
        expect(result.sipsDistributed).toBeGreaterThanOrEqual(0);
        expect(result.sipsReceived).toBeGreaterThanOrEqual(0);
        expect(result.nbCriticalFailure).toBeGreaterThanOrEqual(0);
        expect(result.nbCriticalSuccess).toBeGreaterThanOrEqual(0);
    });
  });

});
