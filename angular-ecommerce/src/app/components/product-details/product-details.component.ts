import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  //non-null assertion operator to avoid compiler warning
  product!: Product;
  theProductId!: number;
  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => {
        this.handleProductDetails();
      })
  }

  handleProductDetails() {
    // get the "id" param string. 
    //convert the string to number using + symbol
    const productId:null|string =this.route.snapshot.paramMap.get('id');
    if (productId != null) {
      this.theProductId = Number.parseInt(productId);
    }
    this.productService.getProductDetail(this.theProductId).subscribe(
      (data: Product) => {
        this.product = data;
      }
    );
  }

}
