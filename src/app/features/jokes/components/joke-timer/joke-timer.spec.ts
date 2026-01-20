import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { JokeTimerComponent } from './joke-timer';

describe('JokeTimerComponent', () => {
  let component: JokeTimerComponent;
  let fixture: ComponentFixture<JokeTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeTimerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JokeTimerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Tests that when a timer is paused and then resumed,
   * it continues from the remaining time when it was paused,
   * rather than resetting to the initial time
   */
  it('should resume from remaining time when paused timer is resumed', fakeAsync(() => {
    // Timer starts automatically in ngOnInit with 5 seconds
    expect(component.timeLeft()).toBe(5);
    expect(component.isRunning()).toBe(true);

    // Let the timer run for 2 seconds (should be at 3 seconds now)
    tick(2000);
    expect(component.timeLeft()).toBe(3);

    // Pause the timer
    component.toggleTimer();
    expect(component.isRunning()).toBe(false);
    const pausedTime = component.timeLeft();
    expect(pausedTime).toBe(3);

    // Wait a bit while paused - time should not change
    tick(1000);
    expect(component.timeLeft()).toBe(3);

    // Resume the timer
    component.toggleTimer();
    expect(component.isRunning()).toBe(true);

    // Let it run for 1 more second
    tick(1000);

    // Should be at 2 seconds (continued from 3, not reset to 5)
    expect(component.timeLeft()).toBe(2);
  }));
});
