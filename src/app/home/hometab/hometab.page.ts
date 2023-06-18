import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ICategory } from 'src/app/_models/category';
import { ProductsService } from 'src/app/_services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hometab',
  templateUrl: './hometab.page.html',
  styleUrls: ['./hometab.page.scss'],
})
export class HometabPage implements OnInit {

  // categories:ICategory[]=[];
  baseUrl = environment.apiUrl;
  categories:any=[];
  promotiondisplay:any=[];
  constructor(
    private productsService:ProductsService,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getPromotionDisplay();
  }

  
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
        console.log(error);
      });
      });
  }
  //Gets promotion images.
  getPromotionDisplay()
  {
    this.loadingController
    .create({ message:"loading..."})
    .then(loadingEl => {
      loadingEl.present();
      this.productsService.getPromotionDisplay().then(data => {
        this.promotiondisplay =data;
        loadingEl.dismiss();
        console.log('promotiondisplay: ',this.promotiondisplay);
      }, error => {
        console.log(error);
      });
      });
  }

}
