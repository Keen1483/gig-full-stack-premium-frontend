import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../models/post.model';
import { Comment } from '../../../models/comment.model';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit, OnDestroy {

  principal: User;

  post: Post;
  comments: Comment[];
  commentSubscription$: Subscription = new Subscription();

  constructor(public additionalMethods: AdditionalMethodsService,
              private postService: PostService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const title = this.route.snapshot.params['title'];
    this.postService.getPost(title).subscribe(
      (response: Post) => {
        this.post = response;
        
        this.postService.getComments(this.post);
        this.commentSubscription$ = this.postService.commentSubject$.subscribe(
          (comments: Comment[]) => this.comments = comments.sort(this.additionalMethods.compareDatabaseObject),
          error => console.log('An error occured')
        );
      },
      error => {
        console.log(`Cannot get post ${title}`);
      }
    );

    // Get connected user
    if (sessionStorage.getItem('principal')) {
      this.principal = JSON.parse(sessionStorage.getItem('principal') || '');
    }
  }

  isAuthor() {
    return this.post.author.username === this.principal.username;
  }

  isAdmin(): boolean {
    if (this.principal && this.principal.roles) {
      return this.principal.roles.filter(role => role.name === 'ROLE_ADMIN').length !== 0;
    }
    return false
  }

  ngOnDestroy(): void {
      this.commentSubscription$.unsubscribe();
  }

}
