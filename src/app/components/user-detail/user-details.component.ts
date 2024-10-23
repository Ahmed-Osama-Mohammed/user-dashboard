import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, private userService: UserService,private router:Router) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUserDetails(userId).subscribe(data => {
      this.user = data.data;
    });
  }
  goBack(): void {
    this.router.navigate(['/users']); // Navigate back to user list
  }
}
