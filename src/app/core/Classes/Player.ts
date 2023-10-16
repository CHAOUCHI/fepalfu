
export class Player{

    constructor(
        public name : string,
        public id : number | undefined = undefined,
        public nbCriticalFailure : number = 0,
        public nbCriticalSuccess : number = 0
    ){
    }

    
}