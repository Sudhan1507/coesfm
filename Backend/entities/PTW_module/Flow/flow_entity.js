

export default class ApprovalFlow{
    constructor({flowId,flowName,nofSteps,processId,stepNo,statusName,declaration,userId,createdOn,createdBy,updatedOn,updatedBy}){
        this.flowId=flowId;
        this.flowName=flowName;
        this.nofSteps=nofSteps;
        this.createdOn=createdOn;
        this.createdBy=createdBy;
        this.updatedBy=updatedBy;
        this.updatedOn=updatedOn;
        this.processId=processId;
        this.stepNo=stepNo;
        this.statusName=statusName;
        this.declaration=declaration;
        this.userId=userId;
    };
};