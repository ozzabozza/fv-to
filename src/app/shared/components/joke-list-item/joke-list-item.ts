import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ChuckNorrisJokeResponse } from '../../services/api/chuck-norris-api';

@Component({
  selector: 'app-joke-list-item',
  imports: [],
  templateUrl: './joke-list-item.html',
  styleUrl: './joke-list-item.scss',
})
export class JokeListItemComponent {
  @Input() joke!: ChuckNorrisJokeResponse;
  @Input() index!: number;
  @Input() isFavorite = false;
  @Input() isMaxFavoritesReached = false;
  @Output() toggleFavorite = new EventEmitter<boolean>();
}
