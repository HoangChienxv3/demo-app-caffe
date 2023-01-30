import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppAppComponent } from './shopp-app.component';

describe('ShoppAppComponent', () => {
  let component: ShoppAppComponent;
  let fixture: ComponentFixture<ShoppAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
