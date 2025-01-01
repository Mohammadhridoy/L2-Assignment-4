import { User_Role } from "./user.constants";



export interface IUser {
    name: string, 
    email: string, 
    password: string,
    role: "admin" | "user", 
    isBlocked: boolean, 
}

export type TUserRole = keyof typeof User_Role;