<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <!-- template to update loaction -->
      <h3 class="text-center">Update Location</h3>
      <!-- form for location update -->
      <!-- v-if to check if location.staus is success -->
      <form
        @submit.prevent="handleUpdateForm"
        v-if="location.status == 'success'"
      >
        <div class="form-group">
          <label>Location Name</label>
          <!-- two way binding using v-model for location name -->
          <input
            type="text"
            class="form-control"
            v-model="location.data.location[0].locationName"
            disabled
          />
        </div>

        <div class="form-group">
          <label>Address</label>
          <!-- two way binding using v-model for location address -->
          <input
            type="text"
            class="form-control"
            v-model="location.data.location[0].address"
          />
        </div>

        <div class="form-group">
          <label>Zip</label>
          <!-- two way binding using v-model for location zipcode -->
          <input
            type="text"
            class="form-control"
            pattern="^[0-9]{5}$"
            v-model="location.data.location[0].zipCode"
          />
          <small id="phoneHelpBlock" class="form-text text-muted">
            zip code must be 5 digits
          </small>
        </div>

        <div class="form-group">
          <label>City</label>
          <!-- two way binding using v-model for location city -->
          <input
            type="text"
            class="form-control"
            v-model="location.data.location[0].city"
          />
        </div>
        <div class="form-group">
          <label>State</label>
          <!-- two way binding using v-model for location state -->
          <input
            type="text"
            class="form-control"
            v-model="location.data.location[0].state"
          />
        </div>
        <div class="form-group">
          <label>Country</label>
          <!-- two way binding using v-model for location country -->
          <input
            type="text"
            class="form-control"
            v-model="location.data.location[0].country"
          />
        </div>
        <!-- button to submit the update form -->
        <button class="btn btn-danger mt-3">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
// import axios from axios to request data from server
import axios from "axios";

export default {
  // setting up data instance
  data() {
    return {
      location: {},
    };
  },
  // created instance to use axios call apis to get data from the database.
  created() {
    // url for api to get locations by id.
    let apiURL = `http://127.0.0.1:3000/locations/${this.$route.params.id}`;
    // axios get method pass in the url to get data from the backend database through api
    axios.get(apiURL).then((res) => {
      // assigning the result data from the api to the location object.
      this.location = res.data;
    });
  },
  // methods instance for functions
  methods: {
    // update form function
    handleUpdateForm() {
      // url for api to update the locations by id.
      let apiURL = `http://127.0.0.1:3000/locations/${this.$route.params.id}`;
      // axios put method accept url and the data to update from the user input.
      axios
        .put(apiURL, this.location.data.location[0])
        .then((res) => {
          console.log(res);
          // redirect to the view page.
          this.$router.push("/view");
        })
        .catch((error) => {
          // catch error if any
          console.log(error);
        });
    },
  },
};
</script>