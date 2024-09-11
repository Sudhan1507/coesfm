

export default class Checklist{
    constructor({checklistId,cName,frequency,assignTo,signOff,createdOn,createdBy,updatedBy,updatedOn}){
        this.checklistId=checklistId;
        this.cName=cName;
        this.frequency=frequency;
        this.assignTo=assignTo;
        this.signOff=signOff;
        this.createdOn=createdOn;
        this.createdBy=createdBy;
        this.updatedBy=updatedBy;
        this.updatedOn=updatedOn;
    };
};