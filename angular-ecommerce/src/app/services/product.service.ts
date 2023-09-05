import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/products";
  private categoryUrl ='http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) {

  }

  getProductDetail(theProductId: number):Observable<Product> {
    //build url based on product id 
    const productUrl =this.baseUrl+'/'+theProductId;
     return this.httpClient.get<Product>(productUrl);
  }
  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }
  getProductListPaginate(thePage:number,thePageSize:number,theCategoryId:number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
        +`&page=${thePage}&size=${thePageSize}`;
    return  this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductListBycategoryId(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
     return this.getProducts(searchUrl);
  }

  searchProducts(theKeyWord: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`;
      return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
getProducts(searchUrl:string){
  return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
    map(response => response._embedded.products)
  );
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages :number,
    number :number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: any;
    products: Product[];
  }
}
