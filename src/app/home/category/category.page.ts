import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { ICategory } from '../../_models/category';
import { IProduct } from '../../_models/product';
import { ProductsService } from  '../../../app/_services/products.service' 
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  // categories:ICategory[];
  categories: any;
  baseUrl = environment.apiUrl;
  constructor(
    private productsService : ProductsService,
    private loadingController: LoadingController,
    private activatedRoute : ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategoryProducts(categoryId: any)
  {
    console.log('get category product:',categoryId);
    this.router.navigate(['/home/tabs/category/' + categoryId]);
    // routerLink="/home/tabs/category/{{category.id}}"
  }
  //Gets all categories.
  
  // getCategories()
  // {      
    
  //     this.productsService.getCategories().then(data => {
  //       this.categories =data;        
  //       console.log(this.categories);
  //     }, error => {       
  //       alert("Unable to connect apps server..");        
  //     });
      
  // }
 //Gets all categories.
 getCategories()
 {
   this.loadingController
   .create({ message:"loading..."})
   .then(loadingEl => {
     loadingEl.present();
     this.productsService.getCategories().then(data => {
       this.categories =data;
       loadingEl.dismiss();
       console.log(this.categories);
     }, error => {
      loadingEl.dismiss();
           console.log(" getcategory error: ",error);
     });
     }
     );
     
 }

}
