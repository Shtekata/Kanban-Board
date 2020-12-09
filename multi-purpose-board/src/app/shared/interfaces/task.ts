import { IUser } from './user';

export interface ITask<T= IUser, TT= IUser> {
    id?: string;
    title: string;
    description: string;
    solution?: string;
    creator?: T;
    executor?: TT;
    created_at?: string;
    executed_at?: string;
}
