export class Profile{
    id: number;
    user: UserModel;
    age: number;
    profession: string;
    phone: string;
    country: string;
    city: string;
    avatar: string;
    created_at: Date;
    update_at: Date;
}

export class UserModel{
    public id?: number;
    public username:string;
    public first_name: string;
    public last_name: string;
    public email: string;
    public password: string;
}

export class ProfilePost{
    id?: number;
    age: number;
    profession: string;
    phone: string;
    country: string;
    city: string;
}
