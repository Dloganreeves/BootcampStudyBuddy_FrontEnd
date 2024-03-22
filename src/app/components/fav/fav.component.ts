import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-fav',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './fav.component.html',
  styleUrl: './fav.component.css'
})
export class FavComponent {

}
