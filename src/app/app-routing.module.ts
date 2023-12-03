import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { BillboardsComponent } from './billboards/billboards.component';
import { WebsiteComponent } from './website/website.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products-routes/products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { TagsComponent } from './tags/tags.component';
import { CategoriesComponent } from './categories/categories.component';
import { CustomersComponent } from './customers/customers.component';
import { NewProductComponent } from './products-routes/new-product/new-product.component';
import { ProductDetailComponent } from './products-routes/product-detail/product-detail.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CommentsComponent } from './comments/comments.component';
const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'billboards', component: BillboardsComponent },
  { path: 'website', component: WebsiteComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'products/new', component: NewProductComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'customers/:id', component: CustomerDetailsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'comments', component: CommentsComponent },
  { path: '', redirectTo: 'overview', pathMatch: 'full' }
];


// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
