import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/product.interface';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  imports: [CommonModule, CardModule, ButtonModule, ProgressSpinnerModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [MessageService]
})
export class ProductsComponent {
  isLoading: boolean = true;
  categories: string[] = [];
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.triggerLoadCategories();
    this.triggerLoadProducts();
  }

  triggerLoadCategories(): void {
    this.productService.fetchCategories().subscribe({
      next: (categories: string[]) => {
        this.categories = categories;
      },
      error: (error) => {
        console.log(' error ', error);
      },
    });
  }

  triggerLoadProducts(): void {
    this.productService.fetchProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(' error ', error);
      },
    });
  }

  triggerLoadProductsFromCategory(category: string): void {
    this.isLoading = true;
    this.productService.fetchFromCategory(category).subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(' error ', error);
      },
    });
  }

  async onAddToCart(product: Product) {
    this.cartService.addToCart(product);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Success add to cart',
    });
  }
}
