import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductPageComponent } from './product-page.component';
import {SharedModule} from '../../../shared/shared.module';
import {ProductsService} from '../../../services/products.service';
import {CartService} from '../../../services/cart.service';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {CartPageComponent} from '../../cart/cart-page.component';
import {Product} from '../../../models/product.client';

describe('Product Page, test add to cart button', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let cartPageComponent: CartPageComponent;
  let products: Product[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        ProductPageComponent, CartPageComponent
      ],
      providers: [CartService, ProductsService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let f = TestBed.createComponent(CartPageComponent);
    cartPageComponent = f.componentInstance;
    f.detectChanges();
    products = [
      {
        'title': '1',
        'price': 40
      },
      {
        'title': '2',
        'price': 28
      }
    ];
  });

  it('Add 1 first item.', () => {
    component.addToCart(products[0]);
    expect(cartPageComponent.cartList).toEqual([{product: products[0], quantity:1}]);
    expect(cartPageComponent.totalPrice).toEqual(40);
  });
  it('When quantity is null.', () => {
    component.quantity = null;
    component.addToCart(products[0]);
    expect(cartPageComponent.cartList).toEqual([]);
    expect(cartPageComponent.totalPrice).toEqual(0);
  });
  it('Add duplicate item.', () => {
    component.quantity = 2;
    component.addToCart(products[0]);
    expect(cartPageComponent.cartList).toEqual([{product: products[0], quantity: 2}]);
    expect(cartPageComponent.totalPrice).toEqual(80);
    component.quantity = 3;
    component.addToCart(products[0]);
    expect(cartPageComponent.cartList).toEqual([{product: products[0], quantity: 5}]);
    expect(cartPageComponent.totalPrice).toEqual(200);
  });
});
