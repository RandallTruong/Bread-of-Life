<template>
  <!-- template for the sign up page -->
  <div class="home">
    <!-- sign up page imported from the components directory -->
    <CreateIndividualComponent msg="Bread Of Life" />
  </div>
</template>

<script>
// import createindividualcomponent from the components directory
import CreateIndividualComponent from "@/components/CreateIndividualComponent.vue";

export default {
  // name of this vue page
  name: "Home",
  components: {
    // compoent for the template to render
    CreateIndividualComponent,
  },
};
</script>
