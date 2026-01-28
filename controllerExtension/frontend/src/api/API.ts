export interface API {
    getBannedApplications(): Promise<any>;
    postBannedApplications(): Promise<any>;
    putNewBannedApplication(): Promise<any>;
    deleteBannedApplications(): Promise<any>;

}