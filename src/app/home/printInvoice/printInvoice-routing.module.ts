import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintInvoicePage } from './printInvoice.page';

const routes: Routes = [
  {
    path: '',
    component: PrintInvoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintInvoiceRoutingModule {}
