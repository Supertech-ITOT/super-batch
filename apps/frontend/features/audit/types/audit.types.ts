export interface BatchAuditResponse{
    id:number;
    action:string;
    moduleName:string;
    performedBy:BatchAuditUserResponse;
    performedAt:string;
    oldData:string;
    newData:string;
    entityName:string;
    entityId:number;
}

export interface BatchAuditUserResponse{
    id:number;
    name:string;
    email:string;
    role:string;
}