import { Injectable, signal, WritableSignal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { CART_KEY } from '../global-data';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: WritableSignal<Product[]> = signal([]);

  constructor(
    private localService: LocalStorageService
  ) { }

  getCartFromStorage() {
    const response = this.localService.getData(CART_KEY);

    if (response != null) {
      const cart = JSON.parse(response);
      this.updateCart(cart);
    }
  }

  saveCartToStorage(cart: (Product)[]) {
    return this.localService.saveData(CART_KEY, JSON.stringify(cart));
  }

  cartIsExist(
    currentCartList: (Product)[],
    newProduct: Product
  ) {
    if (currentCartList.length === 0) {
      return false;
    }

    const movie = currentCartList.find((movie) => movie.id === newProduct.id);
    if (movie !== undefined) {
      return true;
    }

    return false;
  }

  addToCart(
    newProduct: Product
  ) {
    const tempCart = [...this.cart(), newProduct];
    this.updateCart(tempCart);
  }

  removeFromCart(
    removedProduct: Product
  ) {
    const tempCart = this.cart().filter(
      (movie) => movie.id !== removedProduct.id
    );
    this.updateCart(tempCart);
  }

  updateCart(cart: (Product)[]) {
    this.cart.set(cart);
    this.saveCartToStorage(cart);
  }
}
