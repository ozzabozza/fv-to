import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

/**
 * Main application layout component.
 * Provides the overall structure including header, navigation, and content area.
 */
@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
})
export class AppLayoutComponent {
  /**
   * Current year for footer copyright display.
   */
  currentYear = new Date().getFullYear();
}
