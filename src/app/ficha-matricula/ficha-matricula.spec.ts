import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaMatricula } from './ficha-matricula';

describe('FichaMatricula', () => {
  let component: FichaMatricula;
  let fixture: ComponentFixture<FichaMatricula>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaMatricula]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaMatricula);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
