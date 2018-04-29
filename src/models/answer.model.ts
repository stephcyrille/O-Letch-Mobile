import { Profile } from "./user.model";

export class Answer{
    id?: number;
    content: string;
    vote: number;
    created_at: Date;
    author: Profile;
}

export class AnswerPost{
    id?: number;
    question: number;
    content: string;
    vote: number;
    created_at: Date;
    author: number;
}