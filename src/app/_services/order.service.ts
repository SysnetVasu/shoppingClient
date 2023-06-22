import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IInvoiceToCreate, IOrderToCreate, IOrderUpdate } from '../_models/order';
import { SourceCode } from 'eslint';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.apiUrl+'api/';
  isOrderDone=false;

  constructor(private http: HttpClient) { }

  //Creates an order.
  creatOrder(order: IOrderToCreate) {
    console.log('create Order url:  ',this.baseUrl + 'orders', order);
    return this.http.post(this.baseUrl + 'orders', order);
  }
   //update order.
   UpdateOrder(order: IOrderUpdate) {
    console.log('Update Order url:  ',this.baseUrl + 'orders/UpdateOrder', order);
    return this.http.post(this.baseUrl + 'orders/UpdateOrder', order)
    .subscribe((response: IOrderUpdate) => {      
      console.log('Update Order success');
    }, error => {
      console.log('Update Order error:  ',error);
    });
  }
 
  //Returns all orders.
  getOrdersForUser() {
    return  this.http.get(this.baseUrl + 'orders');
   
  }

  //Returns an order by Id.
  getOrderDetailed(id: string) {
    return this.http.get(this.baseUrl + 'orders/' + id);
  }


  //Deletes an order by Id.
  deleteOrder(id:string){
    return this.http.delete(this.baseUrl + 'orders/' + id);
  }
}
