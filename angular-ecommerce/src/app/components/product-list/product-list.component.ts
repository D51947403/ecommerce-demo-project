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

  constructor(private productServce:ProductService ,private route:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
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
      // check if "id" parameter is available
  const hasCategoryId: boolean =this.route.snapshot.paramMap.has('id');
  if(hasCategoryId){
//get the "id" param string . Convert string to number using + symbol
     this.currentCategoryId=+this.route.snapshot.paramMap.get('id')!;
  }
    this.productServce.getProductListBycategoryId(this.currentCategoryId).subscribe(
      ( data: Product[])=>{
        this.products=data;
      }
    )
  }

}