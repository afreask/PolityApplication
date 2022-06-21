import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddPageComponent } from './user-add-page.component';

describe('UserAddPageComponent', () => {
  let component: UserAddPageComponent;
  let fixture: ComponentFixture<UserAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
