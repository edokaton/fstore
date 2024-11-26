import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/product.interface';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.triggerLoadProducts();

    console.log('product list', this.products);
  }

  triggerLoadProducts(): void {
    this.productService.fetchProducts().subscribe((products: Product[]) => {
      console.log(' current products ', products);
      this.products = products;
      console.log("this.products", this.products);
    });
  }
}
