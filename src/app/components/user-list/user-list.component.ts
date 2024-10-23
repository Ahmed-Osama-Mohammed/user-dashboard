import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUsers } from 'src/app/store/user.actions';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  totalUsers = 0;
  pageSize = 6;
  loading = true;

  constructor(private userService: UserService, private router: Router, private store: Store<{ user: { users: User[] } }>) {}

  ngOnInit(): void {
    this.loadUsers(1);
    this.store.dispatch(loadUsers({ page: this.page })); // Dispatch action with page
    this.store.select('user').subscribe(state => {
      this.users = state.users; // Update the users from the store
    });
  }

  loadUsers(page: number): void {
    this.loading = true;
    this.userService.getUsers(page).subscribe(data => {
      this.users = data.data;
      this.loading = false;
    });
  }

  onPageChange(event: any): void {
    this.loadUsers(event.pageIndex + 1);
  }
  onSearch(term: string): void {
    if (term) {
      this.userService.getUserDetails(Number(term)).subscribe(data => {
        this.users = [data.data]; // Display only the searched user
      });
    } else {
      this.loadUsers(1); // Reset to full list if search is cleared
    }
  }
  navigateToDetails(userId: number): void {
    this.router.navigate(['/users', userId]); // Navigate to user details
  }
 
  
  page = 1; // Define your current page state




  // Method to load the next page of users
  loadNextPage() {
    this.page++;
    this.store.dispatch(loadUsers({ page: this.page })); // Load next page
  }
}
