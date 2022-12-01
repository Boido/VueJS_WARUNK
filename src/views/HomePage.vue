<template>
    <div class="container">
        <div class="row mt-4">
            <div class="col">
                <router-link to="/categoryin" type="submit" class="btn btn-primary text-btn" style="float : left">Tambah
                    Kategori
                </router-link>
            </div>
            <div class="col">
                <router-link to="/add" type="submit" class="btn btn-primary text-btn" style="float : right">Tambah
                    Product
                </router-link>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-md-4" v-for="(product) in products" :key="product.id">
                <div class="col">
                    <div class="card cardstyle" style="width: 18rem">
                        <div class="card-media">
                            <center>
                                <img :src="`http://localhost:8000/storage/${product.category_image}`"
                                    class="card-img-top img-fluid" />
                            </center>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{product.category_name}}</h5>
                            <p class="card-text">
                                Some quick example text to build on the card title
                            </p>
                            <div class="btn-grup">
                                <button class="ctn-del hover-del" @click.prevent="delProduct(product.id)">
                                    Delete
                                </button>
                                <router-link class="ctn-del a" :to="{ name: 'ceditpage', params: { id: product.id } }">
                                    Edit
                                </router-link>&nbsp;
                                <router-link class="ctn-del r" :to="{ name: 'FilterProduct', params: { id: product.id } }">Tombol</router-link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

.router-link-active {
    font-weight: bolder;
    font-size: larger;
    font-style: italic;
}

.hover-del:hover {
    color: red;
}

.r:hover {
    color: rgb(63, 206, 63) !important;
}

img {
    width: 100% !important;
    height: 325px !important;
}

.cardstyle {
    width: 350px !important;
}

.card-title {
    font-family: monospace;
    font-weight: bolder;
    background: -webkit-linear-gradient(137deg, rgba(0, 18, 255, 1) 76%, rgba(0, 169, 228, 1) 82%, rgba(255, 0, 189, 1) 89%, rgba(255, 218, 0, 1) 95%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.card-text {
    font-family: 'Roboto Mono', monospace;
}

.text-btn {
    color: rgb(13, 110, 253) !important;
    background-color: white !important;
    font-family: 'Roboto Mono', monospace !important;
}

.text-btn:hover {
    color: white !important;
    background-color: rgb(13, 110, 253) !important;
    font-family: 'Roboto Mono', monospace !important;
}


.ctn-del {
    align-items: center;
    appearance: none;
    background-color: #FCFCFD;
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    box-sizing: border-box;
    color: #36395A;
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono", monospace;
    height: 35px;
    justify-content: center;
    align-items: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s, transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow, transform;
    font-size: 18px;
    margin-left: 17px;
}

.ctn-del:focus {
    box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.ctn-del:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    transform: translateY(-2px);
}

.ctn-del:active {
    box-shadow: #D6D6E7 0 3px 7px inset;
    transform: translateY(2px);
}

.r {
    margin-left: -17px !important;
}

.hover-del {
    margin-right: -15px !important;
    margin-left: 30px !important;
}
</style>


<script>
import axios from "axios";

export default {
    data() {
        return {
            products: Array,
        };
    },
    created() {
        this.getProduct();
    },
    mounted() {
        console.log("Product List Created");
    },
    methods: {
        async getProduct() {
            let url = `http://127.0.0.1:8000/api/category`;
            await axios
                .get(url)
                .then((response) => {
                    this.products = response.data.data;
                    console.log(this.products);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async delProduct(id) {
            let url = `http://127.0.0.1:8000/api/category/${id}`;
            await axios
                .delete(url)
                .then((response) => {
                    if (response.data.code == 200) {
                        alert(response.data.message);
                        this.getProduct();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async filProduct(id) {
            let url = `http://127.0.0.1:8000/api/category/${id}`;
            await axios
                .get(url)
                .then((response) => {
                    if (response.data.code == 200) {
                        alert(response.data.message);
                        this.getProduct();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>