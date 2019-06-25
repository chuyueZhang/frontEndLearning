<template>
    <div>
        <h2>当前数字为: {{count}}, 是{{isOddOrNot?'奇数': '偶数'}}</h2>
        <button class="btn btn-default btn-sm" @click="increment">+</button>
        <button class="btn btn-default btn-sm" @click="decrement">-</button>
        <button class="btn btn-default btn-sm" @click="increseWhenOdd">increseWhenOdd</button>
        <button class="btn btn-default btn-sm" @click="increseAsync">increseAsync</button>
    </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
    export default {
        //原生方式
        // data(){
        //     return {
        //         count: 0
        //     }
        // },
        computed: {
            //原生方式
            // isOddOrNot(){
            //     return this.count%2===1?true:false
            // }
            //vuex方式
            ...mapState(['count']),
            ...mapGetters(['isOddOrNot'])
        },
        methods: {
            //原生方式
            // increment(){
            //     this.count++
            // },
            // decrement(){
            //     this.count--
            // },
            // increseWhenOdd(){
            //     this.isOddOrNot?this.increment(): ''
            // },
            // increseAsync(){
            //     setTimeout(()=>this.count++, 1000)
            // }
            //vuex方式
            ...mapActions(['increment', 'decrement', 'increseWhenOdd', 'increseAsync'])
        }
    }
</script>

<style>

</style>