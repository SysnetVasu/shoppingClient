import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IOrder, IOrderToInvoice } from 'src/app/_models/order';
import { InvoiceService } from 'src/app/_services/Invoice.service ';
// import { NotifyService } from 'src/app/_services/notify.service';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  //orders:IOrder[];
  order: IOrderToInvoice ;
  orders: any;
  constructor(
    // private notifyservice: NotifyService,
    private orderService:OrderService,
    private invoiceService:InvoiceService,
    private loadingController: LoadingController,
    public router: Router,
  ) { }

  ngOnInit() {
     this.getOrders();
  }

  //Gets all orders.
  getOrders(){

    this.loadingController
    .create({ message:"loading..."})
    .then(loadingEl => {
      loadingEl.present();
      this.orderService.getOrdersForUser().subscribe(data=>{
        this.orders=data;
        console.log("Getting orders..");
        console.log('orders: ',this.orders);
        loadingEl.dismiss();
      },error => {
        console.log(error);
      });
    });
    }

    //Delets an order by id.
    deleteOrder(id){

      this.loadingController
      .create({ message:"Cancel the order..."})
      .then(loadingEl => {
          loadingEl.present();
          this.orderService.deleteOrder(id).subscribe(()=>
          {
            loadingEl.dismiss();
            this.getOrders();
          });
    });
    }

    getOrderdetails(orderId: any)
    {
      console.log('getproduct details:',orderId);
      this.router.navigate(['/home/orders/order-details/' + orderId]);
    }
    editOrderdetails(orderId: any)
    {
      console.log('edit order details:',orderId);
      this.router.navigate(['/home/orders/orderedit/' + orderId]);
    }

   
    //Delets an order by id.
    createInvoice(OrderId: any){

      console.log('Create Invoice - orderid: ',OrderId);
      this.loadingController
      .create({ message:"Converting to sales Invoice..."})
      .then(loadingEl => {
          loadingEl.present();

          this.invoiceService.createInvoice(OrderId).subscribe((invoiceID)=>
          {            
          console.log('Invoice - Id: ',invoiceID);
           this.createInvoicePDF(invoiceID);
            loadingEl.dismiss();
            this.getOrders();
          }, err => {            
            // this.notifyservice.showError('error on create Invoice :', 'Error')
          });
    });
    }

    createInvoicePDF(value: any) {    
      
      console.log('createInvoicePDF id:', value);
      this.invoiceService.getPrintInvoice(value).subscribe(data => {        
        console.log('Create Invoice PDF:', data);
      }
      , err => {            
        // this.notifyservice.showError('error on create Invoice PDF file :', 'Error')
      });
     
    }
    
}
