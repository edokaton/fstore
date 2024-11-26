import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../interface/product.interface';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ProgressSpinnerModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  isLoading: boolean = true;

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.getCartFromStorage();

    this.isLoading = false;
  }

  get cart() {
    return this.cartService.cart();
  }

  onRemoveFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }
}
