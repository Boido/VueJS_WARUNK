<template>
    <div class="container">
        <div class="card border-primary mt-5 shadow">
            <h1 class="m-auto mt-5 mb-2 text-title">LIST PRODUCT</h1>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4" v-for="(product) in products" :key="product.id">
                        <div class="card mt-4 p-4 customcard">
                            <center>
                                <img :src="`http://localhost:8000/storage/${product.image}`" width="200" height="200" />
                            </center>
                            <div class="card-body">
                                <h5 class="card-title">{{product.title}}</h5>
                                <p class="card-text">Harga Rp. {{product.price}}</p>

                                <router-link class="ctn-del hover-edit" :to="{ name: 'editpage', params: {id: product.id}}">
                                    Edit
                                </router-link>&nbsp;


                                <button class="ctn-del hover-del" @click.prevent="delProduct(product.id)">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.text-title{
    font-family: monospace;
    font-weight: bolder;
}
.hover-del:hover{
    color: red;
}
.r:hover{
    color: rgb(13,110,253);
}

.ctn-del {
  align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
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
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
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
.hover-edit{
    margin-left: 85px !important; 
    margin-right: -23px;
}
img{
    border-radius: 10px;
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
            let url = `http://127.0.0.1:8000/api/crud`;
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
        async delProduct(id){
            let url = `http://127.0.0.1:8000/api/crud/${id}`;
            await axios
                .delete(url)
                .then((response) => {
                    if(response.data.code == 200){
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