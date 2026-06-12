export declare const api: {
    login: (email: string, password: string) => Promise<any>;
    register: (name: string, email: string, password: string) => Promise<any>;
    getUserProfile: (token: string) => Promise<any>;
};
