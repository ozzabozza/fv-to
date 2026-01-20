import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesComponent } from './jokes';

describe('JokesComponent', () => {
  let component: JokesComponent;
  let fixture: ComponentFixture<JokesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JokesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
