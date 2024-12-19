import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcourprofComponent } from './detailcourprof.component';

describe('DetailcourprofComponent', () => {
  let component: DetailcourprofComponent;
  let fixture: ComponentFixture<DetailcourprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailcourprofComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailcourprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
