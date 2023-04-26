import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { Subject } from 'rxjs';
import { HttpRequestsConfigService } from './http-requests-config.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[];
  postSubject$ = new Subject<Post[]>();

  comments: Comment[];
  commentSubject$ = new Subject<Comment[]>();

  constructor(private httpRequestConfig: HttpRequestsConfigService) { }

  emitPostSubject() {
    this.postSubject$.next(this.posts.slice());
  }

  emitCommentSubject() {
    this.commentSubject$.next(this.comments.slice());
  }

  getAllPosts() {
    this.httpRequestConfig.getAll<Post>('/posts').subscribe(
      (Response: Post[]) => {
        this.posts = Response;
        this.emitPostSubject();
      }
    );
  }

  getPost(title: string) {
    return this.httpRequestConfig.get<Post>('/posts', title);
  }

  createPost(post: Post) {
    return this.httpRequestConfig.post<Post>('/posts/save', post);
  }

  editPost(id: number, post: Post) {
    return this.httpRequestConfig.put<Post>('/posts/edit', id, post);
  }

  deletePost(title: string|number) {
    return this.httpRequestConfig.delete<Post>('/posts/delete', title);
  }

  getComments(post: Post) {
    return this.httpRequestConfig.getComments<Post, Comment>('/posts/comments', post).subscribe(
      (response: Comment[]) => {
        this.comments = response;
        this.emitCommentSubject();
      }
    );
  }
}
