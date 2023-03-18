<template>
  <div>
    <section class="d-flex justify-content-center ">
      <p class="error" v-if="error">{{ error }}</p>
      <div class="row justify-content-center">
        <div v-if="cart.length == 0">
          <p>The cart is empty. Go back to the Lesson page and add lesson to the shopping cart</p>
        </div>
        <div v-else v-for="lesson in cart" :key="lesson._id" class="d-flex justify-content-center" >
          <div class="card set-border" style="width: 28rem;">
            <div class="card-body">
              <h5 class="card-title">
                <div class="row">
                  <div class="col">
                    <ul class="set-alignment-left">
                      <li> topic: {{ lesson.topic }} </li>
                      <li> location:  {{ lesson.location }} </li>
                      <li> price: {{ lesson.price }} </li>
                      <li> space: {{ lesson.space }} </li>
                    </ul>
                  </div>
                  <div class="col set-alignment-right">
                    <img v-bind:src="lesson.pic" class="image-size" />
                  </div>
                </div>
              </h5>
              <div class="d-flex justify-content-center">
                <button class="btn btn-lg btn-danger mx-2" v-on:click="$emit('removeLesson', lesson._id)" v-bind:disabled="lesson.space <= 0">Remove from cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'CheckoutComponent',
  props: ['cart', 'error'],
}

</script>

<style scoped>
* {
  box-sizing: border-box;
  font-weight:bold;
  font-size: 15px;
  margin: 5px;
}
.error {
  background-color: brown;
  padding: 25px;
  color: white;
}
.image-size{
  height: 60px;
  width: 60px;
}
.set-border {
  border: 4px solid rgb(162, 199, 221);
}
.set-alignment-left {
  text-align: left;
}
.set-alignment-right {
  text-align: right;
}
</style>
