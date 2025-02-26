<template>
  <div class="row my-5" v-if="data.product">
    <div class="col-md-10 mx-auto">
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              :src="data.product.image"
              alt="Product Image"
              class="img-fluid rounded-start"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-text">
                {{ data.product.name }}
              </h5>
              <p class="card-text">
                {{ data.product.desc }}
              </p>
              <p>
                <small class="text-body-secondary">
                  ${{ data.product.price }}
                </small>
              </p>
              <p v-if="data.product.reviews.length > 0">
                <StarRating
                  v-model:rating="reviewAvg"
                  :star-size="30"
                  read-only
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="data.product.reviews.length > 0">
        <ReviewsList
          :reviews="data.product.reviews"
          @deleteReviewEvent="deleteReview"
          @editReviewEvent="editReview"
        />
      </div>

      <div class="my-3">
        <div class="card">
          <div class="card-header bg-white text-center">
            <h5 class="mt-2" v-if="!data.reviewToUpdate.updating">
              Add a review
            </h5>
            <h5 class="mt-2" v-else>Edit a review</h5>
          </div>

          <div class="card-body">
            <ProductReview
              v-if="!data.reviewToUpdate.updating"
              @reviewAdded="setProduct"
              :product="data.product"
            />

            <ReviewUpdate
              v-else
              :reviewToUpdate="data.reviewToUpdate.data"
              @reviewUpdated="setProduct"
              @cancelUpdating="cancelUpdating"
              :product="data.product"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { computed, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import ProductReview from "../review/AddReview.vue";
import StarRating from "vue-star-rating";
import ReviewsList from "../review/ReviewsList.vue";
import ReviewUpdate from "../review/ReviewUpdate.vue";
import { useToast } from "vue-toastification";

const route = useRoute();
const toast = useToast();

const data = reactive({
  product: null,
  reviewToUpdate: {
    updating: false,
    data: null,
  },
});

// Calculate Average Rating For a Product

const reviewAvg = computed(() => {
  if (!data.product.reviews.length) return 0; // If no reviews, return 0
  const totalReviews = data.product.reviews.length;
  const totalRating = data.product.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  return parseFloat((totalRating / totalReviews).toFixed(1)); // Round to one decimal place
});

const fetchAllProductById = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/product/${route.params.id}/show`
    );
    data.product = response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const setProduct = (newProductdata) => {
  data.product = newProductdata;

  if (data.reviewToUpdate.updating) {
    data.reviewToUpdate = {
      updating: false,
      data: null,
    };
  }
};

const editReview = (review) => {
  data.reviewToUpdate = {
    updating: true,
    data: review,
  };
};

const cancelUpdating = () => {
  if (data.reviewToUpdate.updating) {
    data.reviewToUpdate = {
      updating: false,
      data: null,
    };
  }
};

const deleteReview = async (review_id) => {
  if (confirm("are you sure")) {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/review/${data.product.id}/delete`,
        {
          review_id,
        }
      );

      data.product = response.data.data;

      toast.success("Review has been Deleted successfully", {
      timeout: 2000,
    });
      
    } catch (error) {
      console.log(error);
    }
  }
};

onMounted(() => fetchAllProductById());

</script>
  
<style>
</style>