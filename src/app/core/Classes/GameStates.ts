export class GameState{
    constructor(
        public currentPlayerId : number,
        public currentTurnIndex  : number,
        public maxTurnNumber  : number,
        public sips  : number | null = null,
        public probaToDrink : number | null = null,
        public playerLuck : number | null = null
    ){/** void */}

    public static clone(gameState : GameState){
        return new GameState(
            gameState.currentPlayerId,
            gameState.currentTurnIndex,
            gameState.maxTurnNumber,
            gameState.sips,
            gameState.probaToDrink,
            gameState.playerLuck,
        );
    }
}