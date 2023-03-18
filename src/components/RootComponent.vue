<template>
  <div>
    <div class="container px-5 mt-4 mb-4 mx-auto">
      <div class="d-flex justify-content-between">
        <button class="btn btn-lg btn-secondary mx-2" v-bind:disabled="true">
          {{ showCheckout ? 'Cart Page' : 'Lessons Page' }}
        </button>
        <button class="btn btn-lg btn-warning mx-2" @click="showCheckout = !showCheckout">
          {{ cart.length }} <fa icon="shopping-cart" /> &nbsp; | &nbsp;
          <span v-if="showCheckout"><fa icon="fa-solid fa-arrow-left" /> Go Back</span>
          <span v-else>Cart <fa icon="fa-solid fa-arrow-right" /></span>
        </button>
      </div>
    </div>
    <loading :active="isLoading" :is-full-page="fullPage"/>
    <CheckoutComponent v-if="showCheckout" :cart="cart" :error="error" @removeLesson="removeLesson"/>
    <LessonComponent v-else :lessons="lessonData" :error="error" @addLesson="addLesson"/>
  </div>
</template>

<script>
import LessonComponent from './LessonComponent.vue';
import CheckoutComponent from './CheckoutComponent.vue';
import LessonService from '../services/LessonService';
import { createToaster } from "@meforma/vue-toaster";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const toaster = createToaster({ position: "top", duration: 2000, maxToasts: 3 });

export default {
  name: 'RootComponent',
  components: {
    LessonComponent,
    CheckoutComponent,
    Loading
  },
  data() {
    return{
      error: '',
      showCheckout: false,
      cart: [],
      lessonData: [],
      isLoading: false,
      fullPage: true
    }
  },
  methods: {
    async addLesson(lesson) {
      this.isLoading = true
      const exists = this.cart.some(val => val._id === lesson._id);
      await LessonService.updateLesson(lesson._id, -1)
      this.lessonData = await LessonService.getLessons();
      if (!exists) {
        lesson.space = 1
        this.cart.push(lesson);
      } else {
        this.cart.forEach(val => {
          if ( val._id === lesson._id) {
            val.space += 1
          }
        });
      }
      toaster.show(`Item added to cart successfully`, {type: "success"});
      this.isLoading = false
    },
    async removeLesson(lessonId) {
      this.isLoading = true
      await LessonService.updateLesson(lessonId, 1)
      this.lessonData = await LessonService.getLessons();
      this.cart.forEach(val => {
        if ( val._id === lessonId) {
          if (val.space > 1) {
            val.space -= 1
          } else {
            this.cart = this.cart.filter((lesson) => lesson._id !== lessonId);
          }
        }
      });
      toaster.show(`Item removed from cart successfully`, {type: "success"});
      this.isLoading = false
    },
  },
  async created() {
    try {
      this.lessonData = await LessonService.getLessons();
    } catch (error) {
      this.error = error.message;
    }
  }
}
</script>

<style>
</style>
