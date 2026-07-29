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

export interface BatchAuditSearchRequest {
  search: string;
  module: number | null;
  action: string | null;
  userId: number | null;
  fromDate: string | null;
  toDate: string | null;
  page: number;
  size: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}