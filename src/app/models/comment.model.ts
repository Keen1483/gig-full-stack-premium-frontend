import { User } from "./user.model";
import { Post } from './post.model';

export interface Comment {
    id?: number;
    content: string;
    author: User;
    post: Post;
    createdAt?: Date;
    editedAt?: Date;
}
