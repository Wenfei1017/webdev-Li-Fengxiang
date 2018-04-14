/**
 * Created by andrew.yang on 7/27/2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { productRoutes} from "./products.routes";
import {SharedModule} from "../../shared/shared.module";
import {ProductsComponent} from "./products.component";
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(productRoutes)
    ],
    declarations: [
        ProductsComponent,
        ProductListComponent
    ]
})
export class ProductModule { }
