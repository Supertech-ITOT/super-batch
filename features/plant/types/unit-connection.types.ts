
export enum ConnectionType {
    MATERIAL = "MATERIAL",
    TRANSFER = "TRANSFER",
}

export interface UnitConnectionRequest {
    sourceUnitId: number;
    destinationUnitId: number;
    connectionType: ConnectionType;
}

export interface UnitConnectionResponse {
    id: number;
    sourceUnitId: number;
    sourceUnitName: string;
    destinationUnitId: number;
    destinationUnitName: string;
    connectionType: ConnectionType;
}