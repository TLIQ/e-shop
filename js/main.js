const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

const app = new Vue({
    el: '#mega-container',
    data: {
        cartItems: [],
        cartAmount: 0
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.$refs.error.error())
        },
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
        clear(){
            this.cartItems.splice(0, this.cartItems.length);
            this.cartAmount = 0;
        },
    },
    mounted(){
        this.getJson(`db/cart.json`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                    this.cartAmount += el.price * el.quantity;
                }
            });
    },
});

