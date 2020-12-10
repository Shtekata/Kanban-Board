import { IUser } from './user';

export interface ITask<T= IUser, TT= IUser> {
    id?: string;
    title: string;
    resizedTitle?: string[];
    description: string;
    resizeDesc?: string[];
    solution?: string;
    creator?: T;
    executor?: TT;
    created_at?: string;
    executed_at?: string;
}
