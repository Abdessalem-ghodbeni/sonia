import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportcourComponent } from './supportcour.component';

describe('SupportcourComponent', () => {
  let component: SupportcourComponent;
  let fixture: ComponentFixture<SupportcourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportcourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportcourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
