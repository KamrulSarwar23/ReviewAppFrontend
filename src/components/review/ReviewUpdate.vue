<template>
    <form class="mt-5">
      <div class="mb-3">
        <label for="title">Title*</label>
        <input
          type="text"
          name="title"
          id="title"
          v-model="data.review.title"
          class="form-control"
          placeholder="Title"
        />
      </div>
      <div class="mb-3">
        <label for="body">Body*</label>
        <textarea
          rows="3"
          cols="30"
          name="body"
          id="body"
          v-model="data.review.body"
          class="form-control"
          placeholder="Body"
        ></textarea>
      </div>
      <div class="mb-3">
        <StarRating
          v-model:rating="data.review.rating"
          :show-rating="false"
          :star-size="30"
        />
      </div>
      <div class="mb-3">
        <button
          class="btn btn-dark me-2"
          :disabled="disabled"
          @click.prevent="updateReview"
        >
          Submit
        </button>

        <button @click.prevent="cancelUpdate"
        class="btn btn-danger">
        Cancel
      </button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { computed, onMounted, reactive } from "vue";
  import StarRating from "vue-star-rating";
  import axios from "axios";
  import { useToast } from "vue-toastification";
  
  const toast = useToast();
  
  const data = reactive({
    review: {
      title: "",
      body: "",
      rating: 0,
    },
  });
  
  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  
    reviewToUpdate: {
      type: Object,
      required: true,
    },
  });
  
  const emit = defineEmits(['reviewUpdated', 'cancelUpdating']);
  
  const disabled = computed(() => {
    return !data.review.title || !data.review.body || data.review.rating === 0;
  });
  
  const updateReview = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/review/${props.product.id}/${data.review.id}/update`,
        {
          title: data.review.title,
          body: data.review.body,
          rating: data.review.rating,
          user_id: data.review.user.id,
        }
      );
  
      data.review = {
        title: "",
        body: "",
        rating: 0,
      };
  
      emit("reviewUpdated", response.data.data);
  
      toast.success("Review has been updated successfully", {
        timeout: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cancelUpdate = () => {
    emit("cancelUpdating");
  }

  
  onMounted(() => data.review = data.review = props.reviewToUpdate);

  </script>
  
  <style>
  </style>
  