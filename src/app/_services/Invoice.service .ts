import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IInvoiceToCreate, IOrderToCreate, IOrderToInvoice } from '../_models/order';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  // baseUrl = environment.apiUrl+'api/';
  baseUrl = environment.apiUrl+'api/';
  isOrderDone=false;

  constructor(private http: HttpClient) { }

  //Creates an order.
  creatOrder(order: IOrderToCreate) {

    return this.http.post(this.baseUrl + 'invoice', order );
  }

   //Creates an order.
//  createInvoice(orderId : IOrderToInvoice) {
  createInvoice(OrderId: any) {
  console.log("IOrderToInvoice: ", OrderId);
  // return this.http.post(this.baseUrl + 'Invoice',JSON.stringify(orderId));
   return this.http.get(this.baseUrl + 'Invoice/CreateInvoce?OrderId='+ OrderId);
}
  //Returns all orders.
  getInvoiceList() {
    return  this.http.get(this.baseUrl + 'invoice');
   
  }

  //Returns an order by Id.
  getInvoiceDetails(id: any) {
    return this.http.get(this.baseUrl + 'invoice/' + id);
  }

  //Deletes an order by Id.
  deleteOrder(id:string){
    return this.http.delete(this.baseUrl + 'orders/' + id);
  }
  //PDF an Invoice.
 getPrintInvoice(invoiceNo: any) {
console.log("getprintinvoice: ", this.baseUrl + 'Invoice/PrintInvoice/'+ invoiceNo);
  return this.http.get(this.baseUrl + 'Invoice/PrintInvoice/'+ invoiceNo);
}
}
