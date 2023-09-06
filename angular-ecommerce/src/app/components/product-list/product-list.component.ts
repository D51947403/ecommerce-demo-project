import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
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
  previousCategoryId:number=1;
  searchMode :boolean=false;
  peviouskeyword:string="";
  //new properties for server side pagination
  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;

  constructor(private productServce:ProductService , private cartService:CartService , private route:ActivatedRoute) { }

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
//if we have a different keyword than prevoius 
//then set thePageNumber to 1
if(this.peviouskeyword !=theKeyWord){
  this.thePageNumber=1;
}
this.peviouskeyword=theKeyWord;
    console.log(`keyword=${theKeyWord},thePageNumber=${this.thePageNumber}`);

    // now search for the products using keyword
    this.productServce.searchProductsPaginate(this.thePageNumber-1,this.thePageSize ,theKeyWord).subscribe(
     this.processResult()
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
     //check if we have different category than previous
     //Note: Angular will reuse a component if it is currently being viewed

     //if we have a different category id than previous
     //then set thePageNumber back to 1
     if(this.currentCategoryId !=this.previousCategoryId){
      this.thePageNumber=1;
     }
     this.previousCategoryId=this.currentCategoryId;
     console.log("previousCategoryId="+this.previousCategoryId);
     console.log("thePageNumber="+this.thePageNumber);
      //get the products for the given category id
        this.productServce.getProductListPaginate(this.thePageNumber -1, this.thePageSize , this.currentCategoryId).subscribe(
          this.processResult()
        )
        }

        updatePageSize(pageSize: string) {
           this.thePageSize=+pageSize;
           this.thePageNumber=1;
           this.listProducts();
          }

          processResult(){
            return (data :any)=>{
              this.products=data._embedded.products;
              this.thePageNumber=data.page.number +1;
              this.thePageSize=data.page.size;
              this.theTotalElements=data.page.totalElements;
            }
          }

          addToCart(theProduct: Product) {
            console.log(`Adding to cart :${theProduct.name},${theProduct.unitPrice}`);
            // todo ... do the real work
         const theCartItem=new CartItem(theProduct);
          this.cartService.addToCart(theCartItem);
            }
  }