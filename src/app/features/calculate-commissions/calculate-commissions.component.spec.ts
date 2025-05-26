import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateCommissionsComponent } from './calculate-commissions.component';

describe('CalculateCommissionsComponent', () => {
  let component: CalculateCommissionsComponent;
  let fixture: ComponentFixture<CalculateCommissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculateCommissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculateCommissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
