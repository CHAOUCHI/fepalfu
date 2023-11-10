import { Sip } from "./Sip";


export class ResultPlayerData{
    constructor(
        public playerName : string,
        public nemesisName : string,
        public nbSipsTaken : number,
        public nbSipsDistributed : number,
        public nbSipsReceived : number,
        public sips : Sip[]
        ){

    }
}