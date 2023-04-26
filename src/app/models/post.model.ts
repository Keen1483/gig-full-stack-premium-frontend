import { User } from './user.model';
import { Comment } from './comment.model';

export interface Post {
    id?: number;
    title: string;
    content: string;
    imageUrl: string;
    author: User;
    comments?: Comment[];
    createdAt?: Date;
    editedAt?: Date;
}
