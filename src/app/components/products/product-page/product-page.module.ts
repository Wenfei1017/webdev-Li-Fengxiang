import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { productRoutes} from "./product-page.routes";
import {SharedModule} from "../../../shared/shared.module";
import {ProductPageComponent} from "./product-page.component";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(productRoutes)
    ],
    declarations: [
        ProductPageComponent
    ]
})
export class ProductModule { }
