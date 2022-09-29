import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateProductDTO, Product,UpdateroductDTO} from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.apiURL);
  }

  getProduct(id : string){
    return this.http.get<Product>(`${this.apiURL}/${id}`);
  }

  getProductsByPage (limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiURL}`,{
    params: {limit,offset}
  })

  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(this.apiURL,dto);
  }

  update(id: string, dto:UpdateroductDTO){
    return this.http.put<Product>(`${this.apiURL}/${id}`,dto);
  }

  delete(id: string){
    return this.http.delete<boolean>(`${this.apiURL}/${id}`);
  }

}
