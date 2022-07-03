import { Role } from "./role";

export class User {
    id: number;
    name?: string;
    banned?: boolean;
    bannedBy?: User;
    role?: Role;
}