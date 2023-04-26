import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  post: Post;
  author: User;

  editPostForm: FormGroup;

  errorMessage: String;

  constructor(private fb: FormBuilder,
              private additionalMethods: AdditionalMethodsService,
              private postService: PostService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const title = this.route.snapshot.params['title'];
    this.postService.getPost(title).subscribe(
      (response: Post) => {
        this.post = response;
        this.initForm(this.post);
      },
      error => {
        console.log(`Cannot get post ${title}`);
      }
    );
    
    this.author = JSON.parse(sessionStorage.getItem('principal') || '');
  }

  initForm(post: Post) {
    this.editPostForm = this.fb.group({
      title: [post.title, [Validators.required, Validators.minLength(8)]],
      content: [post.content, [Validators.required, Validators.minLength(20)]],
      imageUrl: [
        post.imageUrl,
        [
          Validators.required,
          Validators.pattern(/^(((https?|ftp):\/\/(w{3}\.)?)(?<!www)(\w+-?)*\.([a-z]{2,4})\/.+\.(png|jpg|jpeg))$/)
        ]
      ]
    });
  }

  submitForm() {
    const formValue = this.editPostForm.value;
    const post: Post = {
      title: formValue['title'],
      content: formValue['content'],
      imageUrl: formValue['imageUrl'],
      author: this.author
    };

    if (!this.comparePost(post, this.post)) {
      this.postService.editPost(this.post.id ?? -1, post).subscribe(
        (response: Post) => {
          this.additionalMethods.openSnackBar(`Post ${response.title} is successful updated`, 'Close');
          this.router.navigate([`/posts/${response.title}`]);
        },
        error => {
          console.log('An error occured, cannot edite post');
        }
      );
    } else {
      this.errorMessage = 'No change maked';
    }
  }

  comparePost(postA: Post, postB: Post): boolean {
    return (postA.title === postB.title) && (postA.content === postB.content) && (postA.imageUrl === postB.imageUrl);
  }

}
