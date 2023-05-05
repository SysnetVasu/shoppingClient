import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HometabPageModule } from './hometab/hometab.module';

const routes: Routes = [
 
  {
    path:'tabs',
    component: HomePage,
    children:[
      {
        path: 'hometab',
        loadChildren: () => import('./hometab/hometab.module').then( m => m.HometabPageModule)
      },
      {
        path: 'category',
        children:[
          {
            path:'',
            loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
          },
          {
            path: 'productdetail/:productId',
            loadChildren: () => import('./category/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
          },
          {
            path:':id',
            loadChildren: () => import('./category/products/products.module').then( m => m.ProductsPageModule)
          }
        ]       
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
      },
      {        
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then( m => m.InvoicePageModule)
        // path: 'invoicelist',
        // loadChildren: () => import('../invoicelist/invoicelist.module').then( m => m.InvoicelistPageModule)
      }    
            
    ]
   
  },
  {
    path: '',
    redirectTo:'/home/tabs/hometab',
    pathMatch:'full'
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('./invoice/invoice.module').then( m => m.InvoicePageModule)
    // path: 'invoicelist',
    // loadChildren: () => import('../invoicelist/invoicelist.module').then( m => m.InvoicelistPageModule)
  },
  {
    path: 'printInvoice',
    loadChildren: () => import('./printInvoice/printInvoice.module').then( m => m.PrintInvoicePageModule)
    // path: 'invoicelist',
    // loadChildren: () => import('../invoicelist/invoicelist.module').then( m => m.InvoicelistPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
