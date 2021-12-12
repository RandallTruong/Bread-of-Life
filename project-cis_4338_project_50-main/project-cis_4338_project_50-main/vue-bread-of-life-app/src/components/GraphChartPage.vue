<template>
  <!-- check if the Individuals status is success -->
  <div v-if="Individuals.status == 'success'">
    <!-- display all user's zip code info -->
    <h3>Demographic Pie Chart by Zip</h3>
    <!-- use pie chart to show the user demograph -->
    <pie-chart :data="byZip"></pie-chart>
    <!-- display all user's participated events -->
    <h3>Individual Participation in Events</h3>
    <!-- use pie chart to group user by participated events. -->
    <pie-chart :data="byEventDate"></pie-chart>
  </div>
</template>
<script>
// import axios from axios to request data from server
const axios = require("axios");
export default {
  data() {
    return {
      // Individuals to hold data from the get all individuals api.
      Individuals: {},
      // hold data for Demographic Pie Chart
      byZip: {},
      // hold data for Individual Participation in Events
      byEventDate: {},
      // test: {},
    };
  },
  // async methods for create instance..
  async created() {
    // try block to call apis
    try {
      // api to get all individuals
      const url = `http://127.0.0.1:3000/individuals`;
      // axios to call api
      const res = await axios.get(url);
      // empty the Individuals object
      this.Individuals = {};
      // assign newly requested data from the api to Individuals
      this.Individuals = res.data;
      // for of loop to loop through Individuals
      for (const el of this.Individuals.data.individuals) {
        // conditional statement to check if the el.zipCode value is not in byZip
        if (el.zipCode in this.byZip == false) {
          // if not in by zip we assign it to byZip object and with value 1
          this.byZip[el.zipCode] = 1;
        } else {
          // else we increment the zipCode by 1
          this.byZip[el.zipCode] += 1;
        }
      }
      // for of loop to loop through Individuals
      for (const el of this.Individuals.data.individuals) {
        // check if the eventDetail is string
        if (typeof el.eventDetail == "string") {
          // if is string we then also check if the value already in the byEventDate object
          if (el.eventDetail in this.byEventDate == false) {
            // if not we assign to the byEventDate object give a value 1
            this.byEventDate[el.eventDetail] = 1;
          } else {
            // else we just incremnt the value by 1
            this.byEventDate[el.eventDetail] += 1;
          }
        }
      }
    } catch (err) {
      // return errors if found
      if (err.response) {
        this.error = {
          title: "Server Response",
          message: err.message,
        };
      }
    }
  },
  methods: {},
};
</script>