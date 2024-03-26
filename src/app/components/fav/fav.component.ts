import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FavModel } from '../../Models/fav-model';
import { FavService } from '../../services/fav.service';
import { GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-fav',
  standalone: true,
  imports: [RouterLink, RouterOutlet, GoogleSigninButtonModule],
  templateUrl: './fav.component.html',
  styleUrl: './fav.component.css'
})

export class FavComponent {
  AllFavorites: FavModel[] = []
  loggedIn: boolean = false;
  user: SocialUser = {} as SocialUser;
  selectedFav: FavModel = {} as FavModel
  showHideAnswer: boolean = false
  
  constructor ( private favService: FavService, 
    private socialAuthServiceConfig: SocialAuthService, private router: Router) {}

  ngOnInit() {
    this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
      this.user = userResponse;
      //if login fails, it will return null.
      this.loggedIn = (userResponse != null);

    if(this.loggedIn == true) {
      this.favService.GetbyID(this.user.id).subscribe((response: FavModel[]) => {
        this.AllFavorites = response; 
        console.log(response)
      })
    }
        
    })

  }
  DisplayAnswer(f: FavModel){
   this.selectedFav = f;
    this.showHideAnswer = !this.showHideAnswer
  }
  deleteFav(id: number) {
    let deleteFavItem = this.AllFavorites.find(f => f.quiz.id == id)
    
    let index: number = this.AllFavorites.findIndex(x => x.quiz.id == id)
    this.AllFavorites.splice(index,1);

    this.favService.DeleteFav(deleteFavItem!).subscribe()

    this.showHideAnswer = false
  }

}
