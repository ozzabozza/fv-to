import { inject, Injectable, signal } from '@angular/core';

import { ChuckNorrisApiService, ChuckNorrisJokeResponse } from '../api/chuck-norris-api';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  private chuckNorrisApiService = inject(ChuckNorrisApiService);
  jokes = signal<ChuckNorrisJokeResponse[]>([]);
  isInitialLoading = signal(false);

  constructor() {
    this.loadInitialJokes();
  }

  private loadInitialJokes(): void {
    this.isInitialLoading.set(true);
    this.chuckNorrisApiService.getRandomJokes(10).subscribe({
      next: jokes => {
        this.jokes.set(jokes);
        this.isInitialLoading.set(false);
      },
      error: () => {
        this.isInitialLoading.set(false);
      },
    });
  }

  updateJoke(): void {
    this.chuckNorrisApiService.getRandomJoke().subscribe({
      next: joke => {
        // Atomically remove the first joke and add the new one at the end
        // Preventing visual glitches
        this.jokes.update(jokes => [...jokes.slice(1), joke]);
      },
    });
  }
}
