import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import {Product} from '../../models/product.client';
import {Cart} from '../../models/cart';
import {CartComponent} from '../cart/cart-page.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {categoryRoutes} from './category.routes';
import {CartService} from '../../services/cart.service';
import {ProductService} from '../../services/products.service';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpModule} from '@angular/http';


describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
