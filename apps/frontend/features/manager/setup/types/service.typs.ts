export interface SetupResponse {
    firstSetup: boolean;
}

export interface SetupRequest {
    name: string;
    companyName: string;
    email: string;
    password: string;
}