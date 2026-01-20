import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuckNorrisJokeResponse } from '../../services/api/chuck-norris-api';
import { JokeListItemComponent } from './joke-list-item';

/**
 * Test suite for JokeListItemComponent.
 * Tests the joke list item display and favorite toggle functionality.
 */
describe('JokeListItemComponent', () => {
  let component: JokeListItemComponent;
  let fixture: ComponentFixture<JokeListItemComponent>;

  /**
   * Mock joke data for testing
   */
  const mockJoke: ChuckNorrisJokeResponse = {
    icon_url: 'https://api.chucknorris.io/img/avatar/chuck-norris.png',
    id: 'test-joke-id',
    url: 'https://api.chucknorris.io/jokes/test-joke-id',
    value: 'Chuck Norris can divide by zero.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JokeListItemComponent);
    component = fixture.componentInstance;

    // Set required inputs (each test will call detectChanges() after setting its specific properties)
    component.joke = mockJoke;
    component.index = 0;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display joke value', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const jokeText = compiled.querySelector('.line-clamp-2');

    expect(jokeText).toBeTruthy();
    expect(jokeText!.textContent).toContain(mockJoke.value);
  });

  it('should display joke icon', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const icon: HTMLImageElement = compiled.querySelector('img')!;

    expect(icon).toBeTruthy();
    expect(icon.src).toBe(mockJoke.icon_url);
    expect(icon.alt).toBe('Chuck Norris joke');
  });

  it('should emit toggleFavorite event when button is clicked', () => {
    fixture.detectChanges();

    let emittedValue: boolean | undefined;
    component.toggleFavorite.subscribe((value: boolean) => {
      emittedValue = value;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const button: HTMLButtonElement = compiled.querySelector('button')!;

    expect(button).toBeTruthy();
    button.click();
    expect(emittedValue).toBe(true);
  });

  it('should disable favorite button when max favorites reached and not favorite', () => {
    component.isMaxFavoritesReached = true;
    component.isFavorite = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const button: HTMLButtonElement = compiled.querySelector('button')!;

    expect(button).toBeTruthy();
    expect(button.disabled).toBe(true);
  });

  it('should not disable favorite button when max favorites reached but is favorite', () => {
    component.isMaxFavoritesReached = true;
    component.isFavorite = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const button: HTMLButtonElement = compiled.querySelector('button')!;

    expect(button).toBeTruthy();
    expect(button.disabled).toBe(false);
  });
});
