<template>
  <!-- bootstrap row layout -->
  <div class="row">
    <!-- divide the col using boostrap -->
    <div class="col-md-12">
      <!-- the v-if checks if the locations.status is success or not -->
      <table
        class="table table-bordered table-hover"
        id="form-group"
        v-if="locations.status == 'success'"
      >
        <!-- thead for the table -->
        <thead class="table-bordered table-dark">
          <!-- table row for the table haead -->
          <tr>
            <!-- field for each data row  -->
            <th>Location Name</th>
            <th>Address</th>
            <th>Zip</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <!-- v-for to loop through the locations object  -->
          <tr v-for="location in locations.data.locations" :key="location._id">
            <!-- each table data getting values from the object -->
            <td>{{ location.locationName }}</td>
            <!-- getting address from location object  -->
            <td>{{ location.address }}</td>
            <!-- getting zipcode from location object  -->
            <td>{{ location.zipCode }}</td>
            <!-- getting city from location object -->
            <td>{{ location.city }}</td>
            <!-- getting state from location object -->
            <td>{{ location.state }}</td>
            <!-- getting country from location object -->
            <td>{{ location.country }}</td>
            <td>
              <!-- router link with paramter of the location index _id to the edit location page -->
              <router-link
                :to="{ name: 'edit', params: { id: location._id } }"
                class="btn btn-success"
                >Edit
              </router-link>
              <!-- router link with paramter of the location name to the event page -->
              <router-link
                :to="{ name: 'events', params: { id: location.locationName } }"
                class="btn btn-info"
                >Events
              </router-link>
              <!-- button to delete a location using location id -->
              <button
                @click="deleteLocation(location._id)"
                class="btn btn-danger mx-2"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- submit form to add new loaction, v-if isShow is true we display the below form -->
      <form @submit="handleSubmitForm" v-if="isShow">
        <div class="form-group">
          <!-- label for location name -->
          <label>LocationName</label>
          <!-- input that binded using v-model to the Newlocation.locationName -->
          <input
            type="text"
            class="form-control"
            v-model="Newlocation.locationName"
            required
          />
        </div>
        <div class="form-group">
          <label>Address</label>
          <!-- input that binded using v-model to the Newlocation.address -->
          <input
            type="text"
            class="form-control"
            v-model="Newlocation.address"
            required
          />
        </div>
        <div class="form-group">
          <label>Zip</label>
          <!-- input that binded using v-model to the Newlocation.zipCode -->
          <input
            type="text"
            class="form-control"
            pattern="^[0-9]{5}$"
            v-model="Newlocation.zipCode"
            required
          />
          <small id="phoneHelpBlock" class="form-text text-muted">
            zip code must be 5 digits
          </small>
        </div>
        <div class="form-group">
          <label>City</label>
          <!-- input that binded using v-model to the Newlocation.city -->
          <input
            type="text"
            class="form-control"
            v-model="Newlocation.city"
            required
          />
        </div>
        <div class="form-group">
          <label>State</label>
          <!-- input that binded using v-model to the Newlocation.state -->
          <input
            type="text"
            class="form-control"
            v-model="Newlocation.state"
            required
          />
        </div>
        <div class="form-group">
          <label>Country</label>
          <!-- input that binded using v-model to the Newlocation.country -->
          <input
            type="text"
            class="form-control"
            v-model="Newlocation.country"
            required
          />
        </div>
        <!-- button to submit the form  -->
        <button class="btn btn-danger mt-3">Add</button>
      </form>
      <!-- button to display the add location form when user clicked on  -->
      <button
        @click="isShow = !isShow"
        class="btn btn-primary mt-3"
        v-if="!isShow"
      >
        Add Location
      </button>
    </div>
  </div>
</template>

<script>
// import axios from axios to request data from server
import axios from "axios";

export default {
  // setting data
  data() {
    return {
      // empty array to hold income data from database
      locations: [],
      // variable to determine to display add location form
      isShow: false,
      // object to hold new location data from user input
      Newlocation: {
        locationName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    };
  },
  // created instance to use axios call apis to get data from the database.
  created() {
    // set apiurl
    let apiURL = "http://127.0.0.1:3000/locations";
    // use axios to call apis and getting data back from the database.
    axios
      .get(apiURL)
      .then((res) => {
        // assign locations object with the data from the database.
        this.locations = res.data;
      })
      .catch((error) => {
        // output any error to the console.
        console.log(error);
      });
  },
  // methods instance for all functions
  methods: {
    // delete location function using id
    deleteLocation(id) {
      // set api url
      let apiURL = `http://127.0.0.1:3000/locations/${id}`;
      // alert user when trying to delete the location to confirm.
      if (window.confirm("Do you really want to delete?")) {
        // axios delete method to request api delet data from the database.
        axios
          .delete(apiURL)
          .then(() => {
            // redirect the user to the view page.
            this.$router.go("/view");
          })
          .catch((error) => {
            // output any error to the console.
            console.log(error);
          });
      }
    },
    // submition form function for new location
    handleSubmitForm() {
      // set api url
      let apiURL = "http://127.0.0.1:3000/locations";
      // axios post method to post the new location to the database.
      axios
        .post(apiURL, this.Newlocation)
        .then(() => {
          // redirect user to the view page.
          this.$router.push("/view");
          // set the newlocation to empty object again
          this.Newlocation = {
            locationName: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
          };
        })
        .catch((error) => {
          // console display error if any.
          console.log(error);
        });
    },
  },
};
</script>



<style>
.btn-success {
  /* sett margin to the right for the button 10px */
  margin-right: 10px;
}
</style>
