<template>
    <div class="container">
        <div class="page-header row">
            <h1 class="col-xs-offset-2">Router-basic</h1>
        </div>
        <div class="row">
            <div class="col-xs-offset-2 col-xs-2">
                <ul class="list-group">
                    <li class="list-group-item">
                        <router-link to="/home">home</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/about">about</router-link>    
                    </li>    
                </ul>   
            </div>
            <div class="col-xs-8">
                <router-view></router-view>
            </div>  
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style>
.router-link-active{
    text-decoration: none!important;
    color: red!important;
}
a:hover{
    text-decoration: none;
}
</style>