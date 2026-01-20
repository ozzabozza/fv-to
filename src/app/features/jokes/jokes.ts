import { Component, inject } from '@angular/core';

import { JokesService } from '../../shared/services/state/jokes';

@Component({
  selector: 'app-jokes',
  imports: [],
  templateUrl: './jokes.html',
  styleUrl: './jokes.scss',
})
export class JokesComponent {
  jokesService = inject(JokesService);
}
