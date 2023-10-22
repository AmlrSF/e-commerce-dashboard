import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { BillboardsComponent } from './billboards/billboards.component';
import { WebsiteComponent } from './website/website.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { TagsComponent } from './tags/tags.component';
import { CategoriesComponent } from './categories/categories.component';
import { CustomersComponent } from './customers/customers.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'billboards', component: BillboardsComponent },
  { path: 'website', component: WebsiteComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'products/new', component: NewProductComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'categories', component: CategoriesComponent },
];


// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
