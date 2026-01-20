import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

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
  it('should resume from remaining time when paused timer is resumed', () => {
    // Use Vitest's fake timers to control time without zone.js
    // Must be set up BEFORE creating the component so the interval uses fake timers
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval'] });

    // Create a new component instance with fake timers active
    const testFixture = TestBed.createComponent(JokeTimerComponent);
    const testComponent = testFixture.componentInstance;
    testFixture.detectChanges();

    // Timer starts automatically in ngOnInit with 5 seconds
    expect(testComponent.timeLeft()).toBe(5);
    expect(testComponent.isRunning()).toBe(true);

    // Let the timer run for 2 seconds (should be at 3 seconds now)
    // Advance timers by 2000ms, which should trigger 2 interval callbacks (1000ms each)
    vi.advanceTimersByTime(2000);
    testFixture.detectChanges(); // Ensure Angular processes the signal updates
    expect(testComponent.timeLeft()).toBe(3);

    // Pause the timer
    testComponent.toggleTimer();
    testFixture.detectChanges();
    expect(testComponent.isRunning()).toBe(false);
    const pausedTime = testComponent.timeLeft();
    expect(pausedTime).toBe(3);

    // Wait a bit while paused - time should not change
    vi.advanceTimersByTime(1000);
    testFixture.detectChanges();
    expect(testComponent.timeLeft()).toBe(3);

    // Resume the timer
    testComponent.toggleTimer();
    testFixture.detectChanges();
    expect(testComponent.isRunning()).toBe(true);

    // Let it run for 1 more second
    vi.advanceTimersByTime(1000);
    testFixture.detectChanges(); // Ensure Angular processes the signal updates

    // Should be at 2 seconds (continued from 3, not reset to 5)
    expect(testComponent.timeLeft()).toBe(2);

    // Clean up fake timers
    vi.useRealTimers();
  });
});
