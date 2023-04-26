import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../../models/post.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  showSpinner: boolean = true;

  posts: Post[];
  postSubscription$: Subscription;

  displayedColumns: string[] = ['position', 'title', 'content', 'imageUrl', 'createdAt', 'editedAt', 'edit', 'delete'];
  dataSource: MatTableDataSource<Post>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public additionalMethods: AdditionalMethodsService,
              private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts();
    this.postSubscription$ = this.postService.postSubject$.subscribe(
      (response: Post[]) => {
        this.posts = response.map(post => {
          let subContent = post.content.substring(0, 80);
          subContent = subContent.substring(0, subContent.lastIndexOf(' '));
          subContent += '...';
          post.content = subContent
          return post;
        }).sort(this.additionalMethods.compareDatabaseObject);
        this.showSpinner = false;

        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log('An error occured');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
      this.postSubscription$.unsubscribe();
  }

}
