import { Routes } from '@angular/router';

import { JokesComponent } from './features/jokes/jokes';
import { AppLayoutComponent } from './layout/app-layout/app-layout';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [{ path: '', component: JokesComponent }],
  },
];
