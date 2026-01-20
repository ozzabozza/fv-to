import { Component, inject } from '@angular/core';

import { JokeListItemComponent } from '../../shared/components/joke-list-item/joke-list-item';
import { FavoritesService } from '../../shared/services/state/favorites';

@Component({
  selector: 'app-favorites',
  imports: [JokeListItemComponent],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class FavoritesComponent {
  favoritesService = inject(FavoritesService);
}
