import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
 
  public products: Product[]=[];
  currentCategoryId:number=1;
  searchMode :boolean=false;

  constructor(private productServce:ProductService ,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      //this.listProducts();
      this.getProductListBycategoryId();
    });
  }



listProducts(){   
  this.productServce.getProductList().subscribe(  
    data => {
      this.products=data;
      console.log(data);
    }
  );
  }

  getProductListBycategoryId(){
    this.searchMode =this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }
  handleSearchProducts(){
    const theKeyWord: string=this.route.snapshot.paramMap.get('keyword')!
    // now search for the products using keyword
    this.productServce.searchProducts(theKeyWord).subscribe(
      (data :Product[]) =>{
        this.products =data;
      }
    )
  }

  handleListProducts(){
      // check if "id" parameter is available
      const hasCategoryId: boolean =this.route.snapshot.paramMap.has('id');
      if(hasCategoryId){
    //get the "id" param string . Convert string to number using + symbol
         this.currentCategoryId=+this.route.snapshot.paramMap.get('id')!;
      }
      console.log("currentCategoryId="+this.currentCategoryId);
        this.productServce.getProductListBycategoryId(this.currentCategoryId).subscribe(
          ( data: Product[])=>{
            this.products=data;
          }
        )
  }

}