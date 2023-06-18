import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { IOrderToCreate } from 'src/app/_models/order';
import { IProduct } from '../../_models/product';
import { CartService } from '../../_services/cart.service';
import { OrderService } from '../../_services/order.service';
import { ProductsService } from '../../_services/products.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

function convertFileToBase64String(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const result = reader.result;

      if (!result) {
        reject('result is null');
        return;
      }

      resolve(reader.result.toString());
    });
    reader.addEventListener('error', reject);
    reader.readAsDataURL(file);
  });
}

@Component({
  selector: 'app-printInvoice',
  templateUrl: './printInvoice.page.html',
  styleUrls: ['./printInvoice.page.scss'],
})
export class PrintInvoicePage implements OnInit {
  safePdfBase64String: SafeResourceUrl; // 👈 declare the variable as a SafeResourceUrl
  pdfLoaded = false;
  baseUrl = environment.apiUrl;
  products:any;
  product: any;
  quantity=1;
  isCartSet=this.cartService.isCartSet;

  routeSub: any;
  invoiceNo: any;
  printInvoice: string;
  constructor(private sanitizer: DomSanitizer,
    private productsService:ProductsService,
    private cartService:CartService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    public toastController: ToastController,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private navCtrl: NavController    
  )
 
  { 
    this.safePdfBase64String =
    this.sanitizer.bypassSecurityTrustResourceUrl('');

    this.activatedRoute.params.subscribe(params => {
      this.routeSub = params;
      console.log('pa rams', params.id)
      this.printInvoice = this.routeSub.id;     
      console.log('route id', this.printInvoice)
    });
  }
  async loadPdf(event: Event) {
    
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    const file = files.item(0);
    

    if (!file) {
      return;
    }

    const rawPdfBase64String = await convertFileToBase64String(file);
 
    this.safePdfBase64String =
      this.sanitizer.bypassSecurityTrustResourceUrl(rawPdfBase64String);
    this.pdfLoaded = true;
  }
  ngOnInit() {
     this.printInvoice= this.baseUrl+"Content/invoice/IN-20230325053443.pdf";
     console.log('print:',  this.printInvoice);
   // this.printInvoice="D:/Suresh/Testing/Core/Working/IonciApps/ShoppingAPI/shoppingAPI/shopping-app-server/Content/Invoice/IN-20230325053443.pdf";
    
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  goBack() {
    this.navCtrl.back();
  }


  // //Gets product by its Id.
  // loadProduct() {
  //   console.log(' get product id ',this.productID)
  //   this.loadingController
  //   .create({ message:"loading..."})
  //   .then(loadingEl => {
  //         loadingEl.present();  
  //         this.productsService.getProduct(this.productID)
  //       .subscribe((product) => 
  //       {
  //           this.product = product;          
  //           console.log('load product by id : ',this.product);
  //           loadingEl.dismiss();
  //       }, error => {
  //         console.log(error);
  //       });  
  //   });
  //   //this.product=this.products.find(p=> p.id  ===  (+this.activatedRoute.snapshot.paramMap.get('productId')));
  // }
  
  // getProductDetails()
  // {
    
  //   this.loadingController
  //   .create({ message:"loading..."})
  //   .then(loadingEl => {
  //         loadingEl.present();
  //         console.log('getProductDetails id : ', this.productID);
  //         this.productsService.getProduct(this.productID)
  //       .subscribe((product) => 
  //       {
  //           this.product = product;
  //           console.log('getProductDetails by id : ',this.product);
  //           loadingEl.dismiss();
  //       }, error => {
  //         console.log(error);
  //       });  
  //   });
  // }

  //Adds items into cart. 
  addToCart() {
console.log('addToCart : ', this.product);
    this.loadingController
    .create({ message:"adding.."})

    
    .then(loadingEl => {
        loadingEl.present();
       // console.log("addToCart: ",this.product);
      // this.product.thumbnailUrl=this.product.thumbnailUrl;
      //  console.log('thumbnailUrl:',this.product.thumbnailUrl);
       console.log('additemtocart:',this.product);
        this.cartService.addItemToCart('CUS-001',this.product, this.quantity);
        
          loadingEl.dismiss();
          this.presentToast();
        
        this.router.navigateByUrl('/home/tabs/cart');
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Added to cart successfully.',
      duration: 2000
    });
    toast.present();
  }
  
  //Gets all products.
  getProducts()
  {
    this.productsService.getProducts().then(products => {
      this.products=products;
      console.log('get all Products: ',this.products)
    }, error => {
      console.log(error);
    });
  }

}
