import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, Observable, throwError } from 'rxjs';

/**
 * Interface representing the response structure from the Chuck Norris API
 */
export interface ChuckNorrisJokeResponse {
  icon_url: string;
  id: string;
  url: string;
  value: string;
}

/**
 * Service for interacting with the Chuck Norris Jokes API
 * Provides methods to fetch random Chuck Norris jokes
 */
@Injectable({
  providedIn: 'root',
})
export class ChuckNorrisApiService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://api.chucknorris.io/jokes/random';

  /**
   * Fetches a random Chuck Norris joke from the API
   * @returns Observable that emits a ChuckNorrisJoke object
   * @throws Error if the API request fails
   */
  getRandomJoke(): Observable<ChuckNorrisJokeResponse> {
    return this.http.get<ChuckNorrisJokeResponse>(this.apiUrl).pipe(
      catchError(() => {
        return throwError(() => new Error('Failed to fetch Chuck Norris joke'));
      }),
    );
  }

  /**
   * Fetches multiple random Chuck Norris jokes from the API
   * Makes parallel requests to fetch the specified number of jokes
   * @param count - Number of jokes to fetch (default: 10)
   * @returns Observable that emits an array of ChuckNorrisJokeResponse objects
   * @throws Error if any of the API requests fail
   */
  getRandomJokes(count = 10): Observable<ChuckNorrisJokeResponse[]> {
    // Create an array of observables for parallel execution
    const jokeRequests: Observable<ChuckNorrisJokeResponse>[] = Array.from({ length: count }, () =>
      this.getRandomJoke(),
    );

    // Use forkJoin to execute all requests in parallel and wait for all to complete
    return forkJoin(jokeRequests).pipe(
      catchError(() => {
        return throwError(() => new Error('Failed to fetch Chuck Norris jokes'));
      }),
    );
  }
}
