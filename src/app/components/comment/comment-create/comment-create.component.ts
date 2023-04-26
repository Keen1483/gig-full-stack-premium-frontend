import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Comment } from 'src/app/models/comment.model';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { CommentService } from '../../../services/comment.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {

  commentForm: FormGroup;
  auhtor: User;
  @Input() post: Post;

  constructor(private fb: FormBuilder,
              private additionalMethods: AdditionalMethodsService,
              private commentService: CommentService,
              private postService: PostService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.auhtor = JSON.parse(sessionStorage.getItem('principal') || '');

    this.initForm();
  }

  initForm() {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitForm() {
    const formValue = this.commentForm.value;
    const comment: Comment = {
      content: formValue['content'],
      author: this.auhtor,
      post: this.post
    };

    this.commentService.createComment(comment).subscribe(
      (response: Comment) => {
        this.additionalMethods.openSnackBar(`Comment ${response.id} is successful created`, 'Close');
        this.postService.getComments(this.post);
        this.postService.emitCommentSubject();
        this.router.navigate([`/posts/${this.post.title}`]);
      },
      error => {
        console.log('Cannot create post, an error occured: ' + error);
      }
    );
  }

}
