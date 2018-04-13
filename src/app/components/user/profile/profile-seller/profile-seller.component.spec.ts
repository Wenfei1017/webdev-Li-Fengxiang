import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSellerComponent } from './profile-seller.component';

describe('ProfileSellerComponent', () => {
  let component: ProfileSellerComponent;
  let fixture: ComponentFixture<ProfileSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
