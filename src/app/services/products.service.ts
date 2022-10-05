import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpErrorResponse,HttpStatusCode } from '@angular/common/http';
import { retry, catchError,map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CreateProductDTO, Product,UpdateroductDTO} from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset',limit);
    }
    return this.http.get<Product[]>(this.apiURL,{params}).pipe(
      map(products => products.map(item => {
        return{
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }



  getProduct(id : string){
    return this.http.get<Product>(`${this.apiURL}/${id}`)
    .pipe(
      catchError((error : HttpErrorResponse) =>{
        if(error.status === 500){
          return throwError('Algo esta fallando en el sever')  
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError('El producto no existe')  
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError('No esta autorizado')  
        }
        return throwError('Ups.. algo salio mal')
       })
       )
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
