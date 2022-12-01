<template>
    <div class="container">
        <div class="card border-primary mt-5 shadow mt-4">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <h4><span class="badge bg-primary">
                                Tambah Kategori
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
                                        Nama Kategori
                                    </label>
                                    <input type="text" class="form-control" v-model="products.category_name" />
                                </div>
                                <div class="form-group b">
                                    <label class="form-label mt-4">Gambar Kategori</label>
                                    <input class="form-control" type="file" @change="imgupload" />
                                </div>
                                <div class="form-group mt-4">
                                    <img :src="preview" alt="" width="200" />
                                </div>
                                
                                <button type="submit" class="btn btn-primary mt-3" style="float: right">
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
    name: "InputCategoryPage",
    data() {
        return {
            products: {},
            category_image: '',
            preview: ''
        }
    },
    
    methods: {
        imgupload(e) {
            this.category_image = e.target.files[0];
            console.log(this.category_image);

            console.log(this.products.category_name);

            let fileReader = new FileReader();
            fileReader.readAsDataURL(this.category_image);
            fileReader.onload = (e) => {
                this.preview = e.target.result;
                console.log(this.preview);
            };
        },
        async saveproduct() {
            let formData = new FormData();
            formData.append("category_name", this.products.category_name);
            formData.append("category_image", this.category_image);

            let url = "http://127.0.0.1:8000/api/category";
            await axios
                .post(url, formData)
                .then((response) => {
                        alert(response.data.message);
                        this.products.category_name = "";
                        this.category_image = "";
                        this.preview = "";
                        this.$router.push({ name: "homepage" });
                })
                .catch((error) => {
                    console.log('Penyimpanan Gagal');
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