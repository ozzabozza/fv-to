import { Component, inject } from '@angular/core';

import { JokeListItemComponent } from '../../shared/components/joke-list-item/joke-list-item';
import { FavoritesService } from '../../shared/services/state/favorites';
import { JokesService } from '../../shared/services/state/jokes';
import { JokeTimerComponent } from './components/joke-timer/joke-timer';

@Component({
  selector: 'app-jokes',
  imports: [JokeListItemComponent, JokeTimerComponent],
  templateUrl: './jokes.html',
  styleUrl: './jokes.scss',
})
export class JokesComponent {
  jokesService = inject(JokesService);
  favoritesService = inject(FavoritesService);
}
