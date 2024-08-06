
export default class PermitToWork{
    constructor({appId,ptId,flowId,checklistId,accId,activeStatus,updatedOn}){
        this.appId = appId;
        this.ptId = ptId;
        this.flowId = flowId;
        this.checklistId = checklistId;
        this.accId = accId;
        this.activeStatus = activeStatus;
        this.updatedOn = updatedOn;
    };
};
