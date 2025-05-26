import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateCommisionsComponent } from './calculate-commisions.component';

describe('CalculateCommisionsComponent', () => {
  let component: CalculateCommisionsComponent;
  let fixture: ComponentFixture<CalculateCommisionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculateCommisionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculateCommisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
