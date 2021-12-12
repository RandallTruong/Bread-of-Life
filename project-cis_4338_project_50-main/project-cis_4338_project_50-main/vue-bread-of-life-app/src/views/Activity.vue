<template>
  <!-- template for the activitiy page -->
  <div class="activity">
    <!-- activity page imported from the components directory -->
    <ActivitiesComponent />
  </div>
</template>

<script>
// import ActivitiesComponent from the components directory
import ActivitiesComponent from "@/components/ActivitiesComponent.vue";

export default {
  // name for the page
  name: "Activity",
  components: {
    // compoent for the template to render
    ActivitiesComponent,
  },
};
</script>