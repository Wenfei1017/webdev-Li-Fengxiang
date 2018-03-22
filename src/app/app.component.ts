import {Component, NgModule} from '@angular/core';
import {AppModule} from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})

@NgModule({
  imports: [AppModule],
  declarations: [AppComponent],
  exports: [AppComponent],
})

export class AppComponent {
  title = 'app';
  devices = [
    {Address: "safdaf", Name: "sfsadf"},
    {Address: "safdsadfasaf", Name: "sfd"},
  ];

  options = {
    languages: [{language: 'English', lg:'en'}, {language:'German', lg:'de'}]
  };
}
