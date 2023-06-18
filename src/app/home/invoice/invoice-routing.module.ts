import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicePage } from '../invoice/invoice.page';

const routes: Routes = [
  {
    path: '',
    component: InvoicePage
  },
  {
    path: 'invoice-details/:Id',
    loadChildren: () => import('./invoice-details/invoice-details.module').then( m => m.InvoiceDetailsPageModule)
  },
  {
    path: 'printInvoice',
    loadChildren: () => import('./printInvoice/printInvoice.module').then( m => m.PrintInvoicePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicePageRoutingModule {}
