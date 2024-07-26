
export default class PermitType{
    constructor({ptId,ptName,checklistId,flowId,reqId,checklistName,flowName,reqTag,remarks,createdOn,createdBy,updatedBy,updatedOn,active}){
            this.ptId=ptId;
            this.ptName=ptName;
            this.checklistId=checklistId;
            this.flowId=flowId;
            this.reqId=reqId;
            this.checklistName=checklistName;
            this.flowName=flowName;
            this.reqTag=reqTag;
            this.remarks=remarks;
            this.createdOn=createdOn;
            this.createdBy=createdBy;
            this.updatedBy=updatedBy;
            this.updatedOn=updatedOn;
            this.active=active;
    };
};