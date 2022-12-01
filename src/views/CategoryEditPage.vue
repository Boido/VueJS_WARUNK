<template>
    <div class="container">
        <div class="card border-primary mt-5 shadow mt-4">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <h4>
                            <span class="badge bg-primary">
                                Ubah data Kategori
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
                                        Nama Kategori
                                    </label>
                                    <input type="text" class="form-control" v-model="products.category_name" />
                                </div>
                                <div class="form-group b">
                                    <label class="form-label mt-4">Gambar Kategori</label>
                                    <input class="form-control" type="file" @change="imgupload" />
                                    <input class="form-control" type="text" v-model="products.category_image" />
                                </div>

                                <img :src="`http://localhost:8000/storage/${products.category_image}`" width="200" height="200" id="imager" />
                                
                                <div class="form-group mt-4">
                                    <img :src="preview" alt="" width="200" />
                                </div>
                                <button type="submit" class="btn btn-primary mt-2" style="float: right">
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
    name: "EditCategoryPage",
    data() {
        return {
            products:{},
            category_image: '',
            preview: ''
        };
    },
    created() {
        this.getProductById();
    },
    methods: {
        async getProductById() {

            let url = `http://127.0.0.1:8000/api/category/${this.$route.params.id}`;
            await axios.get(url).then(response => {
                console.log(response);
                this.products = response.data.data[0];
            }).catch(error => {
                console.log(error);
            });
        },
        conditional(e){
            e = this.products.category_image;

            if(e === null){
                document.querySelector('#imager').innerHTML = preview;
            }else{
                return e;
            }
        },
        imgupload(e) {
            this.category_image = e.target.files[0];
            console.log(this.category_image);

            // const filename = e.target.files[0].name;

            // this.products.category_image = filename;

            let fileReader = new FileReader();
            fileReader.readAsDataURL(this.category_image);
            fileReader.onload = e => {
                this.preview = e.target.result;
                console.log(this.preview);
            }
        },
        async updateproduct() {
            let category_name = this.products.category_name;
            let category_image = this.products.category_image;

            console.log(category_name);
            console.log(category_image);

            axios.put(`http://127.0.0.1:8000/api/category/${this.$route.params.id}`

                , {
                    category_name: category_name,
                    category_image: category_image,
                }
            ).then((response) => {
                console.log(response);

                this.$router.push({ name: 'homepage' });
            }).catch(error => {
                console.log(error);
            });
        }
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

*{
    font-family: 'Roboto Mono', monospace;
}
.b {
    margin-left: -10px;
}
</style>