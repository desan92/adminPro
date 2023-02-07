import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromesesComponent } from './promeses.component';

describe('PromesesComponent', () => {
  let component: PromesesComponent;
  let fixture: ComponentFixture<PromesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromesesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
