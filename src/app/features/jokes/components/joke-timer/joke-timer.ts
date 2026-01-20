import { NgClass } from '@angular/common';
import { Component, computed, EventEmitter, OnDestroy, OnInit, Output, signal } from '@angular/core';

@Component({
  selector: 'app-joke-timer',
  imports: [NgClass],
  templateUrl: './joke-timer.html',
  styleUrl: './joke-timer.scss',
})
export class JokeTimerComponent implements OnInit, OnDestroy {
  @Output() timerEnded = new EventEmitter<null>();
  private initialTime = 5; // 5 seconds
  private timeRemaining = signal(this.initialTime);
  readonly isRunning = signal(false);
  readonly timeLeft = computed(() => this.timeRemaining());
  private intervalId: number | null = null;

  ngOnInit(): void {
    this.startTimer();
  }

  /**
   * Starts the countdown timer
   * Updates every 1 sec
   */
  private startTimer() {
    if (this.isRunning()) {
      return; // Prevent multiple intervals
    }

    this.isRunning.set(true);
    this.intervalId = window.setInterval(() => {
      const currentTime = this.timeRemaining();
      if (currentTime <= 0) {
        this.timerEnded.emit();
        this.resetTimer();
        return;
      }
      this.timeRemaining.set(currentTime - 1);
    }, 1000);
  }

  /**
   * Resets the timer to initial time and restarts it
   */
  private resetTimer() {
    this.stopTimer();
    this.timeRemaining.set(this.initialTime);
    this.startTimer();
  }

  /**
   * Stops the timer and clears the interval
   */
  private stopTimer() {
    this.isRunning.set(false);
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Pauses the timer if running, resumes if paused
   */
  toggleTimer(): void {
    if (this.isRunning()) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
