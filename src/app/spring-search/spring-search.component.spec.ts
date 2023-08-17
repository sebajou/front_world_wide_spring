import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringSearchComponent } from './spring-search.component';

describe('SpringSearchComponent', () => {
  let component: SpringSearchComponent;
  let fixture: ComponentFixture<SpringSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpringSearchComponent]
    });
    fixture = TestBed.createComponent(SpringSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
