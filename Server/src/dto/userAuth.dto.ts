export interface RegisterDto{
    username:string;
    email:string;
    password:string;
    
}

export type SignInResult = { 
    accessToken?: string;         
    refreshToken?: string;                    
};
