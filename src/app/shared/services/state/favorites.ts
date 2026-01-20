import { computed, effect, Injectable, signal } from '@angular/core';

import { ChuckNorrisJokeResponse } from '../api/chuck-norris-api';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites = signal<ChuckNorrisJokeResponse[]>(this.loadFavoritesFromStorage());
  private maxFavoritesReached = computed(() => this.favorites().length >= 10);

  constructor() {
    // Effect to persist favorites to localStorage whenever the favorites array changes
    effect(() => {
      const favorites = this.favorites();
      try {
        localStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites to localStorage:', error);
      }
    });
  }

  /**
   * Loads favorites from localStorage on service initialization
   * @returns Array of favorite jokes or empty array if none exist or parsing fails
   */
  private loadFavoritesFromStorage(): ChuckNorrisJokeResponse[] {
    try {
      const stored = localStorage.getItem('favorites');
      if (stored) {
        return JSON.parse(stored) as ChuckNorrisJokeResponse[];
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
    }
    return [];
  }

  private addFavorite(joke: ChuckNorrisJokeResponse): void {
    if (this.maxFavoritesReached()) {
      return;
    }
    this.favorites.update(favorites => [...favorites, joke]);
  }

  private removeFavorite(joke: ChuckNorrisJokeResponse): void {
    this.favorites.update(favorites => favorites.filter(f => f.id !== joke.id));
  }

  isMaxFavoritesReached(): boolean {
    return this.maxFavoritesReached();
  }

  isFavorite(joke: ChuckNorrisJokeResponse): boolean {
    return this.favorites().some(f => f.id === joke.id);
  }

  toggleFavorite(favorite: boolean, joke: ChuckNorrisJokeResponse): void {
    if (favorite) {
      this.addFavorite(joke);
    } else {
      this.removeFavorite(joke);
    }
  }
}
