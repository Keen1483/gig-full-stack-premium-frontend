import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { PostService } from '../../../services/post.service';
import { Router } from '@angular/router';
import { Post } from '../../../models/post.model';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  postForm: FormGroup;
  author: User;

  constructor(private fb: FormBuilder,
              private additionalMethods: AdditionalMethodsService,
              private postService: PostService,
              private router: Router,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.author = JSON.parse(sessionStorage.getItem('principal') || '');
    this.initForm();
  }

  initForm() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(8)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      imageUrl: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(((https?|ftp):\/\/(w{3}\.)?)(?<!www)(\w+-?)*\.([a-z]{2,4})\/.+\.(png|jpg|jpeg))$/)
        ]
      ]
    });
  }

  submitForm() {
    const formValue = this.postForm.value;
    const post: Post = {
      title: formValue['title'],
      content: formValue['content'],
      imageUrl: formValue['imageUrl'],
      author: this.author
    };

    this.postService.createPost(post).subscribe(
      (response: Post) => {
        this.additionalMethods.openSnackBar(`Post ${response.title} is successful created`, 'Close');
        this.router.navigate([`/posts/${response.title}`]);
      },
      error => {
        console.log('Cannot create post, an error occured: ' + error);
      }
    );
  }

}
