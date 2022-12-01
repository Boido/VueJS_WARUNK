<template>
    <div class="container">
        <div class="card border-primary mt-5 shadow mt-4">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <h4>
                            <span class="badge bg-primary">
                                Ubah data Product
                            </span>
                        </h4>
                    </div>

                </div>
                <div class="row mt-2">
                    <div class="col p-4">
                        <form @submit.prevent="updateproduct">
                            <fieldset>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">
                                        Nama Pesanan
                                    </label>
                                    <input type="text" class="form-control" v-model="product.title" />
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">
                                        Harga Pesanan
                                    </label>
                                    <input type="text" class="form-control" v-model="product.price" />
                                </div>
                                <div class="form-group b">
                                    <label class="form-label mt-4">Gambar Pesanan</label>
                                    <input class="form-control" type="file" @change="imgupload" />
                                    <input class="form-control" type="text" v-model="product.image" />
                                </div>
                                
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Kategori</label>
                                    <select class="custom-select form-control" id="inputGroupSelect03"
                                        v-model="product.category_id">
                                        <option v-for="(categories) in categories" :value="categories.id" :key="categories">
                                            {{categories.category_name}}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group mt-4">
                                    <img :src="preview" alt="" width="200" />
                                </div>
                                <button type="submit" class="btn btn-primary" style="float: right">
                                    Submit
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "editpage",
    data() {
        return {
            categories: Array,

            product: {},
            image: '',
            preview: ''
        };
    },
    created() {
        this.getProductById();
        this.getKategoris();
    },
    methods: {
        async getProductById() {

            let url = `http://127.0.0.1:8000/api/crud/${this.$route.params.id}`;
            await axios.get(url).then(response => {
                console.log(response);
                this.product = response.data.data;
            }).catch(error => {
                console.log(error);
            });
        },
        imgupload(e) {
            this.image = e.target.files[0];
            console.log(this.image);

            const filename = e.target.files[0].name;

            this.products.image = filename;

            let fileReader = new FileReader();
            fileReader.readAsDataURL(this.image);
            fileReader.onload = e => {
                this.preview = e.target.result;
                console.log(this.preview);
            }
        },
        async updateproduct() {
            let title = this.product.title;
            let price = this.product.price;
            let image = this.product.image;
            let category_id = this.product.category_id;

            console.log(title);
            console.log(price);
            console.log(image);
            console.log(category_id);

            axios.put(`http://127.0.0.1:8000/api/crud/${this.$route.params.id}`

                , {
                    title: title,
                    price: price,
                    image: image,
                    category_id: category_id,
                }
            ).then((response) => {
                console.log(response);

                this.$router.push({ name: 'listpage' });
            }).catch(error => {
                console.log(error);
            });
        },
        async getKategoris() {
            let url = "http://127.0.0.1:8000/api/category";
            await axios
                .get(url)
                .then((response) => {
                    this.categories = response.data.data;
                    console.log(this.categories);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
};
</script>

<style>
.b {
    margin-left: -10px;
}
</style>