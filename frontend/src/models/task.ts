import { User } from "./user";

export class Task {
    id: number;
    issuedAt: Date;
    dueTo: Date;
    subject: string;
    title: string;
    verified: boolean;
    createdAt: Date;
    updatedAt?: Date;
    verifierId?: number;
    creatorId: number;
    updaterId?: number;
    verifier?: User;
    creator?: User;
    updater?: User;
}