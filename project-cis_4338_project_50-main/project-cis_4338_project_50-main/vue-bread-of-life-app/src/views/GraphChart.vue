<template>
  <!-- template for the sign up page -->
  <div class="graphChart">
    <!-- chart page imported from the components directory -->
    <GraphChartPage />
  </div>
</template>

<script>
// import GraphChart from the components directory
import GraphChartPage from "@/components/GraphChartPage.vue";

export default {
  // name for the page
  name: "GraphChart",
  components: {
    // compoent for the template to render
    GraphChartPage,
  },
};
</script>