export class Player{
    constructor(private playerName : string){
    }
    get name() : string{
        return this.playerName;
    }
}