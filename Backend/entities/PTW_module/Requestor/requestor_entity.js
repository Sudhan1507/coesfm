
export default class Requestor{
    constructor({reqId,reqName,createdOn,createdBy,updatedOn,updatedBy}){
        this.reqId=reqId;
        this.reqName=reqName;
        this.createdOn=createdOn;
        this.createdBy=createdBy;
        this.updatedBy=updatedBy;
        this.updatedOn=updatedOn;
    }
}