export interface BatchAuditResponse{
    id:number;
    action:string;
    module:string;
    performedBy:BatchAuditUserResponse;
    performedAt:string;
    oldData:string;
    newData:string;
    entity:string;

}

export interface BatchAuditUserResponse{
    id:number;
    name:string;
    email:string;
    role:string;
}