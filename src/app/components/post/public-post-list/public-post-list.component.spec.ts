import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPostListComponent } from './public-post-list.component';

describe('PublicPostListComponent', () => {
  let component: PublicPostListComponent;
  let fixture: ComponentFixture<PublicPostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicPostListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
