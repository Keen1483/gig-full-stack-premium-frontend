import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-public-post-list',
  templateUrl: './public-post-list.component.html',
  styleUrls: ['./public-post-list.component.scss']
})
export class PublicPostListComponent implements OnInit {

  showSpinner: boolean = true;

  posts: Post[];
  postSubscription$: Subscription;

  displayedColumns: string[] = ['title'];
  dataSource: MatTableDataSource<Post>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public additionalMethods: AdditionalMethodsService,
              private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts();
    this.postSubscription$ = this.postService.postSubject$.subscribe(
      (response: Post[]) => {
        this.posts = response.sort(this.additionalMethods.compareDatabaseObject);
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
