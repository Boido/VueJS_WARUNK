<template>
    <div class="container">
        <div class="card border-primary mt-5 shadow mt-4">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <h4><span class="badge bg-primary">
                                Tambah Product
                            </span>
                        </h4>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col p-4">
                        <form @submit.prevent="saveproduct">
                            <fieldset>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">
                                        Nama Pesanan
                                    </label>
                                    <input type="text" class="form-control" v-model="products.title" />
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">
                                        Harga Pesanan
                                    </label>
                                    <input type="text" class="form-control" v-model="products.price" />
                                </div>
                                <div class="form-group b">
                                    <label class="form-label mt-4">Gambar Pesanan</label>
                                    <input class="form-control" type="file" @change="imgupload" />
                                </div>
                                <div class="form-group mt-4">
                                    <img :src="preview" alt="" width="200" />
                                </div>
                                <div class="form-group row px-5">
                                    <label class="col-sm-2 col-form-label">Kategori</label>
                                    <select class="custom-select form-control" id="inputGroupSelect03"
                                        @change="selectOnChange" placeholder="...">
                                        <option v-for="(category) in categories" :value="category.id">
                                            {{ category.category_name }}</option>
                                    </select>
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
    name: "homepage",
    data() {
        return {
            categories: Array,

            products: {},
            image: '',
            preview: ''
        }
    },
    created() {
        this.getCategory();
    },
    methods: {
        imgupload(e) {
            this.image = e.target.files[0];
            console.log(this.image);

            console.log(this.products.title);
            console.log(this.products.price);
            console.log(this.products.category_id);

            let fileReader = new FileReader();
            fileReader.readAsDataURL(this.image);
            fileReader.onload = (e) => {
                this.preview = e.target.result;
                console.log(this.preview);
            };
        },
        selectOnChange(e){
           this.products.category_id=e.target.value;
        },
        async saveproduct() {
            let formData = new FormData();
            formData.append("title", this.products.title);
            formData.append("price", this.products.price);
            formData.append("image", this.image);
            formData.append("category_id", this.products.category_id);

            let url = `http://127.0.0.1:8000/api/crud`;
            await axios
                .post(url, formData)
                .then((response) => {
                    if (response.data.success == true) {
                        alert(response.data.message);
                        this.products.title = "";
                        this.products.price = "";
                        this.image = "";
                        this.preview = "";
                        this.$router.push({ name: "listpage" });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async getCategory() {
            let url = `http://127.0.0.1:8000/api/category`;
            await axios
                .get(url)
                .then((response) => {
                    this.categories = response.data.data;
                    this.products.category_id=response.data.data[0].id;
                    console.log(this.products);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>

<style>
.b {
    margin-left: -10px;
}
</style>