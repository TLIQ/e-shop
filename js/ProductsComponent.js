Vue.component('products', {
    props: ['slice'], 
    data(){
      return {
          products: [],
      }
    },
    methods: {

    },
    mounted(){
        this.$parent.getJson(`db/products.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            })
    },
    template: `<div class="fetured__box">
        <product
        v-for="product of products.slice(0, slice)"
        :key="product.id_product"
        :product="product"></product>
    </div>`
});
Vue.component('product', {
    props: ['product'],
    template: `<div class="fetured__block">
                    <a href="single.html"><img class="fetures__img" :src="product.img" alt="product.product_name"></a>
                    <a href="single.html">
                    <p class="title">{{product.product_name}}</p>
                    </a>
                    <p class="cost">$ {{product.price}}</p>
                    <a href="#" class="add" @click.prevent="$root.$refs.cart.addProduct(product)"><img class="add__img" src="img/icon_basket_white.svg" alt="">Add to Cart</a>
              </div>`
});
