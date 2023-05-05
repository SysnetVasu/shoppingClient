import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintInvoiceRoutingModule } from './printInvoice-routing.module';

import  {PrintInvoicePage} from './printInvoice.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintInvoiceRoutingModule,
    PdfViewerModule
  ],
  declarations: [PrintInvoicePage]
})
export class PrintInvoicePageModule {}
