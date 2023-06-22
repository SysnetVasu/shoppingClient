
export interface IOrderToCreate {
    cartId: string;
}
export interface IOrderUpdate {
    id: string;
    orderNo: string;
    customerId: string;
    orderDate: string;
    orderItems: IOrderUpdateItem[];
    totalPrice: number;
    discountAmount: number;
    taxAmount: number;
    netTotal: number;
}
export interface IOrderUpdateItem {
    productItemId: string;
    productName: string;
    thumbnailUrl: string;
    price: number;
    quantity: number;
    unitId:string;
    discount:number;
    total:number;
}
export interface IInvoiceToCreate {
    orderNo: string;
}
export interface IOrder {
    id: string;
    orderNo: string;
    orderDate: string;
    orderItems: IOrderItem[];
    subtotal: number;
    total: number;
}

export interface IOrderItem {
    productItemId: string;
    productName: string;
    thumbnailUrl: string;
    price: number;
    quantity: number;
}
export interface IOrderToInvoice {
    id: any;
}