import { Role } from './role.model';
import { User } from './user.model';
import { Post } from './post.model';
import { Comment } from './comment.model';

export type DatabaseObjects = User | Role | Post | Comment;

export type DatabaseObjectsName = 'User' | 'Role' | 'Post' | 'Comment';

export type HttpMethod = 'GET_ALL' | 'GET' | 'POST' | 'PUT' | 'DELETE';