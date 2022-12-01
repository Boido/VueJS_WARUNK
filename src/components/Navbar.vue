<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary p-4">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Warunk<span class="setup">.eun</span></a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarColor01"
                aria-controls="navbarColor01"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/list">List Product</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Rubik+Mono+One&display=swap');
.setup{
    font-family: 'Roboto Mono', monospace;
    color: black;
    font-size: 25px !important;
    margin-left: -20px !important;
}
.navbar-brand{
    font-family: 'Rubik Mono One', sans-serif;
    font-size: 30px !important;
}
.nav-link{
    font-family: 'Roboto Mono', monospace;
}
nav{
    border-bottom-left-radius: 20px !important;
}
</style>