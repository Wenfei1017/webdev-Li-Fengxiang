import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ProfileComponent} from './components/user/profile/profile.component';
import {WebsiteListComponent} from './components/website/website-list/website-list.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {WebsiteNewComponent} from './components/website/website-new/website-new.component';
import {PageListComponent} from './components/page/page-list/page-list.component';
import {PageNewComponent} from './components/page/page-new/page-new.component';
import {PageEditComponent} from './components/page/page-edit/page-edit.component';
import {WidgetListComponent} from './components/widget/widget-list/widget-list.component';
import {WidgetChooserComponent} from './components/widget/widget-chooser/widget-chooser.component';
import {WidgetEditComponent} from './components/widget/widget-edit/widget-edit.component';
import {WebsiteEditComponent} from './components/website/website-edit/website-edit.component';

import {AuthGuard} from './services/auth-guard.service';
import {CartPageComponent} from './components/cart/cart-page.component';
import {CategoryComponent} from './components/category/category.component';
import {ProfileSellerComponent} from './components/user/profile/profile-seller/profile-seller.component';
import {ProductListComponent} from './components/products/product-list/product-list.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductPageComponent } from './components/products/product-page/product-page.component';
import {ProfileAdminComponent} from './components/user/profile/profile-admin/profile-admin.component';
import { AllProductsComponent} from './components/user/profile/profile-admin/all-products/all-products.component';
import { AllUsersComponent } from './components/user/profile/profile-admin/all-users/all-users.component';
import {ProductEditComponent} from './components/products/product-edit/product-edit.component';


// Import all other components here

const APP_ROUTES: Routes = [
  { path : '' , component: LoginComponent},
  { path : 'login' , component: LoginComponent},
  { path : 'login/:type' , component: LoginComponent},
  { path : 'register/:type' , component: RegisterComponent },

  { path : 'user/:uid' , component: ProfileComponent, canActivate: [AuthGuard]},
  { path : 'user/:uid' , component: ProfileComponent, canActivate: [AuthGuard]},
  { path : 'user/:uid/website' , component: WebsiteListComponent},
  { path : 'user/:uid/website/new' , component: WebsiteNewComponent},
  { path : 'user/:uid/website/:wid' , component: WebsiteEditComponent},
  { path : 'user/:uid/website/:wid/edit' , component: WebsiteEditComponent},

  { path : 'user/:uid/website/:wid/page' , component: PageListComponent},
  { path : 'user/:uid/website/:wid/page/new' , component: PageNewComponent},
  { path : 'user/:uid/website/:wid/page/:pid' , component: PageEditComponent},

  { path : 'user/:uid/website/:wid/page/:pid/widget' , component: WidgetListComponent},
  { path : 'user/:uid/website/:wid/page/:pid/widget/new' , component: WidgetChooserComponent},
  { path : 'user/:uid/website/:wid/page/:pid/widget/:wgid' , component: WidgetEditComponent},
  // so on

  { path : 'user/:uid/cart', component: CartPageComponent},
  { path : 'category', component: CategoryComponent, canActivate: [AuthGuard],
  },

  { path: 'category/products/:pid',
    component: ProductPageComponent,
    canActivate: [AuthGuard],
  },

  { path: 'seller/:uid', component: ProfileSellerComponent},
  { path: 'seller/:uid/products', component: ProductListComponent},
  { path: 'seller/:uid/products/new', component: ProductCreateComponent},
  { path: 'admin/:uid', component: ProfileAdminComponent},
  { path: 'admin/:uid/allproducts', component: AllProductsComponent},
  { path: 'admin/:uid/allusers', component: AllUsersComponent},

  {path: 'user/:uid/products/product/edit/:prid', component: ProductEditComponent},

  {
    path: 'product',
    loadChildren: './components/products/product-page/product-page.module#ProductModule'
  },
];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
