import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators'
import { zip } from 'rxjs'
import { CreateProductDTO, Product ,UpdateroductDTO} from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductsDetails= false;
  productChosen : Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    }, 
    description: ''
  }


  limit = 10 ;
  offset = 0;

  statusDetail: 'loading' | 'succes' | 'error' | 'init' = 'init'

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getProductsByPage(10,0)
    .subscribe(data => {
      this.products = data;
      this.offset += this.limit;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail (){
    this.showProductsDetails =  !this.showProductsDetails ;
  }

  onShowDetail(id : string){
    this.statusDetail = 'loading'
    this.productsService.getProduct(id)
    .subscribe(data => {
      console.log(data);
      this.productChosen = data;
      this.toggleProductDetail();
      this.statusDetail = 'succes'
    },error => {
      console.log(error);
      this.statusDetail = 'error';
    });
    // console.log(id);
  }

  readAndUpdate(id : string){

    this.productsService.getProduct(id).pipe(
      switchMap((product)=> {
        return this.productsService.update(product.id,{title: 'change'})
      })
    ).subscribe( data => {
      console.log(data);
    });
    zip
      (this.productsService.getProduct(id),
      this.productsService.update(id,{title: 'zip'})
    ).subscribe(response => {
      const read = response[0];
      const update = response[1];
    }

    )
    
  }

  createNewProduct (){
    const product: CreateProductDTO = {
      title: 'Nuevo',
      description : 'asdasd',
      images: [''],
      price: 4000,
      categoryId: 2,
    }
    this.productsService.create(product)
    .subscribe(data => {
      this.products.unshift(data);
      
    });
  }
  editProduct(){
    const changes: UpdateroductDTO = {
      title: 'Editadoo!',
      price: 589325,
    }
    const id = this.productChosen.id;
    this.productsService.update(id,changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products[productIndex] = data;
      this.productChosen = data;
      console.log(data);
    });
  }
  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe( () => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products.splice(productIndex,1);
      this.showProductsDetails = false;
    })
  }

  loadMore(){
    this.productsService.getProductsByPage(this.limit,this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}
