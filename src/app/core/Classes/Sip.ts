export class Sip{
    constructor(
        public nbSips : number,
        public targetPlayerName : string,
        public context : {
            distributed : boolean,
            critical_success : boolean,
            critical_failure : boolean
        } = {distributed:false,critical_success:false,critical_failure:false},
        public distributorPlayerName : string | null = null, 
    ){/**void */}
}