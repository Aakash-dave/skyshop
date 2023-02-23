import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutdevComponent } from './aboutdev.component';

describe('AboutdevComponent', () => {
  let component: AboutdevComponent;
  let fixture: ComponentFixture<AboutdevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutdevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutdevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
