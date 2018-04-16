import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { WebsiteListComponent } from './components/website/website-list/website-list.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { WebsiteNewComponent } from './components/website/website-new/website-new.component';
import { WebsiteEditComponent } from './components/website/website-edit/website-edit.component';
import { PageNewComponent } from './components/page/page-new/page-new.component';
import { PageEditComponent } from './components/page/page-edit/page-edit.component';
import { PageListComponent } from './components/page/page-list/page-list.component';
import { WidgetChooserComponent } from './components/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './components/widget/widget-edit/widget-edit.component';
import { WidgetListComponent } from './components/widget/widget-list/widget-list.component';
import { WidgetHeaderComponent } from './components/widget/widget-edit/widget-header/widget-header.component';
import { WidgetImageComponent } from './components/widget/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './components/widget/widget-edit/widget-youtube/widget-youtube.component';
import { WidgetTextComponent } from './components/widget/widget-edit/widget-text/widget-text.component';
import { WidgetHtmlComponent } from './components/widget/widget-edit/widget-html/widget-html.component';

import { SafePipe } from '../../assignment/pipes/safe-url/safe-url.pipe';

// client side services
import { UserService } from './services/user.service.client';
import { WebsiteService } from './services/website.service.client';
import { PageService } from './services/page.service.client';
import { WidgetService } from './services/widget.service.client';
import { SharedService } from './services/shared.service';
import { CartService} from './services/cart.service';
import { ProductsService} from './services/products.service';
import { ImageService } from './services/image.service.client';


import { Routing } from './app.routing';
import { QuillEditorModule } from 'ngx-quill-editor';
import { BsDropdownModule } from 'ngx-bootstrap';
import { SortableDirective } from '../../assignment/directives/sortable.directive';
import { FlickrImageSearchComponent } from './components/widget/widget-list/flickr-image-search//flickr-image-search.component';
import { FlickrService } from './services/flickr.service.client';
import { AuthGuard } from './services/auth-guard.service';
import { CategoryComponent } from './components/category/category.component';
import { CartPageComponent } from './components/cart/cart-page.component';
import { CartPopupComponent} from './components/cart/cart-popup/cart-popup.component';
import { ProfileSellerComponent } from './components/user/profile/profile-seller/profile-seller.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductListComponent} from './components/products/product-list/product-list.component';
import { ProductPageComponent } from './components/products/product-page/product-page.component';
import { TopbarComponent } from './component/topbar/topbar.component';
import { QuantityControlComponent } from './component/quantity-control/quantity-control.component';
import { ProfileAdminComponent } from './components/user/profile/profile-admin/profile-admin.component';

@NgModule({
  // Declare components here
  declarations: [
    AppComponent,
    WebsiteListComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    PageNewComponent,
    PageEditComponent,
    PageListComponent,
    SafePipe,
    WidgetChooserComponent,
    WidgetEditComponent,
    WidgetListComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    WidgetTextComponent,
    WidgetHtmlComponent,
    SortableDirective,
    FlickrImageSearchComponent,
    CategoryComponent,
    CartPageComponent,
    CartPopupComponent,
    ProfileSellerComponent,
    ProductCreateComponent,
    ProductListComponent,
    ProductPageComponent,
    TopbarComponent,
    QuantityControlComponent,
    ProfileAdminComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing,
    QuillEditorModule,
    BsDropdownModule,
    BsDropdownModule.forRoot(),

  ],
  // Client Side services here
  providers: [UserService, WebsiteService, PageService, ImageService, FlickrService, SharedService, AuthGuard, CartService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }


