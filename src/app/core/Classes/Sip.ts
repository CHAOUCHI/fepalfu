export class Sip{
    static DISTRIBUTED: { distributed: boolean; critical_success: boolean; critical_failure: boolean; } = {
        distributed : true,
        critical_failure : false,
        critical_success : false
    };
    static CRITICAL_SUCCESS: { distributed: boolean; critical_success: boolean; critical_failure: boolean; } = {
        distributed : false,
        critical_failure : false,
        critical_success : true
    };
    static CRITICAL_FAILURE: { distributed: boolean; critical_success: boolean; critical_failure: boolean; } = {
        distributed : false,
        critical_failure : true,
        critical_success : false
    };
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