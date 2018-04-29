import { Profile } from "./user.model";

export class Question{
    id: number;
    title: string;
    content: string;
    vote: number;
    toggle: boolean;
    created_at: Date;
    author: Profile
}

export class QuestionPost{
    id?: number;
    title: string;
    content: string;
    vote: number;
    toggle: boolean;
    created_at: Date;
    author: number
}