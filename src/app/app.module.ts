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


import { Routing } from './app.routing';
import { QuillEditorModule } from 'ngx-quill-editor';
import { BsDropdownModule } from 'ngx-bootstrap';
import { SortableDirective } from '../../assignment/directives/sortable.directive';
import { OrderPipe } from '../../assignment/pipes/order/order.pipe';
import { FlickrImageSearchComponent } from './components/widget/widget-list/flickr-image-search//flickr-image-search.component';
import { FlickrService } from './services/flickr.service.client';


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
    OrderPipe,
    FlickrImageSearchComponent,
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
  providers: [UserService, WebsiteService, PageService, WidgetService, FlickrService],
  bootstrap: [AppComponent]
})
export class AppModule { }


