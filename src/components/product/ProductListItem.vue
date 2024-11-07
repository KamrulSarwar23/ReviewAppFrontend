<template>

    <div class="col-md-3 mb-2">
      <div class="card h-100">
          <img :src="product.image" alt="Product Image" 
              class="card-img-top"
              >
          <div class="card-body">
              <div class="card-title">
                  {{ product.title }}
              </div>
              <p class="card-text">
                 {{ product.desc }}
              </p>
              <p>
                  <span class="fw-bold text-danger">
                      $ {{ product.price }}
                  </span>
              </p>
              <p>
                <!-- <StarRating read-only/> -->
              </p>
              <router-link :to="`product/${product.id}`" class="btn btn-dark">
                  <i class="bi bi-eye"></i> View
              </router-link>
          </div>
      </div>
    </div>

  </template>
  
  <script setup>

       const props = defineProps({
        product:{
            type:Object,
            required:true
        }
    })
  </script>
  
  <style>
  
  </style>