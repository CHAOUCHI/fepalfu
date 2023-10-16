export class Response{
    constructor(response : {data:any,message:string,succeded:boolean}){
        this.data = response.data;
        this.message = response.message;
        this.succeded = response.succeded;
    }
    
    private data : any;
    private message : string;
    private succeded : boolean;
}