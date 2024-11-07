<template>

  <div class="row">
    <ProductListItem v-for="product in products" :key="product.id" :product="product" />

  </div>

</template>

<script setup>

import ProductListItem from './ProductListItem.vue';

    const props = defineProps({
        products:{
            type:Array,
            required:true
        }
    })

</script>


<style scoped>


</style>