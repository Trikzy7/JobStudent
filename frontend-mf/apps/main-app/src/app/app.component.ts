import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '@frontend-mf/data-access-user';
import { User } from 'libs/shared/data-access-user/src/lib/user.model';
import { distinctUntilChanged } from 'rxjs/operators';
import { NotificationsComponent } from './notification/notification.component';
import { ChatComponent } from './chat/chat.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationsComponent],
  selector: 'ng-mf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  isLoggedIn$ = this.userService.isUserLoggedIn$;

  userConnected !: User;
  usersList !: any[];

  ngOnInit() {
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (loggedIn) => {
        if (!loggedIn) {
          this.router.navigateByUrl('login');
        } else {

          // Get user data
          let user_id = localStorage.getItem("user_id");
          let token_api = localStorage.getItem("token_api");
          if (user_id !== null) {
            this.userService.getUserById(user_id).subscribe((response: any) => {
              this.userConnected = new User(
                response.id,
                response.email,
                response.password,
              );
              console.log('User connecteddddddddddd:', this.userConnected);
            })
          }

          // Get all users
          // let token_api = localStorage.getItem("token_api") as string;
          // if (token_api !== null) {
          //   this.userService.getAllUsers(token_api).subscribe((response: any) => {
          //     this.usersList = response;
          //     console.log('Users list:', this.usersList);
          //   });
          // }

          // console.log('User connected:', this.userConnected);


          this.router.navigateByUrl('dashboard');
        }

      });
  }

  logout() {
    this.userService.logout();  // Appelle la méthode logout du service
    this.router.navigateByUrl('login');  // Redirige l'utilisateur vers la page de login après la déconnexion
  }

  isUserConnected() {
    return localStorage.getItem("user_id") !== null;
  }

  onOutletLoaded(component: { userConnected: User; }) {
    component.userConnected = this.userConnected;
  }
}