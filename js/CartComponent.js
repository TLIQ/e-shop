Vue.component('cart', {
    data(){
      return {
          cartItems: [],
          showCart: false,
          cartAmount: 0
      }
    },
    methods: {
        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                find.quantity++;
                this.cartAmount += product.price;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.cartItems.push(prod);
                this.cartAmount += product.price;
            }
        },
        remove(product){
            if(product.quantity > 1){
                product.quantity--;
                this.cartAmount -= product.price;
            } else {
                this.cartItems.splice(this.cartItems.indexOf(product), 1);
                this.cartAmount -= product.price;
            }
        },
    },
    mounted(){
        this.$parent.getJson(`db/cart.json`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                    this.cartAmount += el.price * el.quantity;
                }
            });
    },
    computed: {
        total(){
            return this.cartAmount;
        }
    },
    template: `<div class="for-basket-drop">
                    <a class="basket-block" @click.prevent="showCart = !showCart">
                        <img src="img/icon_basket.svg" alt="basket" class="basket-head">
                        <span class="basket-quantity">{{cartItems.length}}</span>
                    </a>
                    <div class="drop drop_basket" v-show="showCart">
                            <div class="basket-null" v-if="!cartItems.length">Корзина пуста</div>
                            <div class="basket-wrap" v-if="cartItems.length">
                                <ul class="drop__cart">
                                   <cart-item
                                     v-for="item of cartItems"
                                     :key="item.id_product"
                                     :cart-item="item"
                                     @remove="remove"></cart-item>
                                </ul>
                                <div class="cart__total">
                                    <div class="total-text">TOTAL</div>
                                    <div class="total-sum">$ {{total}}</div>
                                </div>
                                <div class="cart__bottom">
                                    <a href="checkout.html" class="cart-checkout">checkout</a>
                                    <a href="cart.html" class="cart-go">go to cart</a>
                                </div>
                            </div>
                    </div>
                </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `<li>
                    <div class="cart__item">
                        <div class="cart__img"><img :src="cartItem.img" :alt="cartItem.product_name" class="cart__img_width"></div>
                        <div class="cart__desc">
                            <div class="cart__title">{{cartItem.product_name}}</div>
                            <div class="cart__rank"><img src="img/cartrank.png" alt="cartrank"></div>
                            <div class="cart__stats">
                                <span class="cart__quantity">{{cartItem.quantity}}</span>
                                <span class="cart__x">x</span>
                                <span class="cart__count">{{cartItem.price}} $</span>
                            </div>
                        </div>
                        <div class="cart__remove">
                            <a class="basket__del" href="#" @click="$emit('remove', cartItem)">
                                <i class="fas fa-times-circle"></i>
                            </a>
                        </div>
                    </div>
                </li>`
})
