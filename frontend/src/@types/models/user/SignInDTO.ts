import User from "./User";

export interface SignInDTO {
    email: string;
    password: string;
}

export interface SignInResponseDTO {
    user: User;
    token: string;
}