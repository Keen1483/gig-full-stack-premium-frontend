import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';
import { Subject } from 'rxjs';
import { HttpRequestsConfigService } from './http-requests-config.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments: Comment[];
  commentSubject$ = new Subject<Comment[]>();

  constructor(private httpRequestConfig: HttpRequestsConfigService) { }

  emitCommentSubject() {
    this.commentSubject$.next(this.comments.slice());
  }

  getAllComments() {
    this.httpRequestConfig.getAll<Comment>('/comments').subscribe(
      (Response: Comment[]) => {
        this.comments = Response;
        this.emitCommentSubject();
      }
    );
  }

  getComment(id: number) {
    return this.httpRequestConfig.get<Comment>('/comments', id);
  }

  createComment(comment: Comment) {
    return this.httpRequestConfig.post<Comment>('/comments/save', comment);
  }

  editComment(id: number, comment: Comment) {
    return this.httpRequestConfig.put<Comment>('/comments/edit', id, comment);
  }

  deleteComment(id: number|string) {
    return this.httpRequestConfig.delete<Comment>('/comments/delete', id);
  }
}
