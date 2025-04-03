import { Component, input, booleanAttribute, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CartService } from '../../services';
import { JlpButtonDirective } from '../jlp-button.directive';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [
    JlpButtonDirective,
  ],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToCartButtonComponent {
  protected readonly cartService = inject(CartService);
  productId = input.required<string>();
  numberOnly = input(false, { transform: booleanAttribute });

  protected readonly addToCartMessage = computed(() => {
    const total = this.cartService.cartItems()[this.productId()]?.quantity || 0;

    return total ? `Add one to the ${total} in the cart`
    : 'Add one to cart';
  });
  templateRendered() {
    console.log('Change Detection in AddToCartButtonComponent');
  }

  protected buttonMessage = computed(() => {
    const total = this.cartService.cartItems()[this.productId()]?.quantity || 0;

    if(this.numberOnly()){
      return total ? total : 0;
    }
    return total
      ? `${total} in cart`
      : 'Add to cart';
  });
}
