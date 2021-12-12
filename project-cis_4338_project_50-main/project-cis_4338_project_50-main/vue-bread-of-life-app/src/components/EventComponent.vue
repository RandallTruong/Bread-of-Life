<template>
  <!-- template for display events -->
  <div class="row">
    <div class="col-md-12">
      <!-- v-if to check if the status is success from the database -->
      <h2 v-if="location.status == 'success'">
        <!-- get the location name for the events -->
        Events for: {{ location.data.location[0].locationName }}
      </h2>
      <!-- v-if to check if the status is success from the database  -->
      <!-- table to hold the information about a event-->
      <table
        class="table table-bordered table-hover"
        v-if="location.status == 'success'"
      >
        <thead class="table-bordered table-dark">
          <!-- tr and th for the table field -->
          <tr>
            <th>Event Name</th>
            <th>Event Type</th>
            <th>Event Date</th>
            <th>Address</th>
            <th>City</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <!-- table body and data for the events -->
          <!-- v-for to loop through the events object which from the database -->
          <tr v-for="event in Events.data.events" :key="event._id">
            <!-- getting the event_name from event object -->
            <td>{{ event.event_name }}</td>
            <!-- getting the event_type from the event object -->
            <td>{{ event.event_type }}</td>
            <!-- getting the event data from the event object, then use slice to get the first 10 charcters from the object value -->
            <td>{{ event.event_date.slice(0, 10) }}</td>
            <!-- getting the locations address from the event object-->
            <td>{{ event.location.address }}</td>
            <!-- getting the locations city from the event object -->
            <td>{{ event.location.city }}</td>
            <td>
              <!-- router link to the edit events page and with paramter event._id -->
              <router-link
                :to="{ name: 'editEvents', params: { id: event._id } }"
                class="btn btn-success"
                >Edit
              </router-link>
              <!-- button to delete the event using evnet._id -->
              <button
                @click.prevent="deleteEvent(event._id)"
                class="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- form to add new event  v-if isShow is true we display the below form-->
      <form @submit.prevent="handleSubmitForm" v-if="isShow">
        <div class="form-group">
          <!-- label for event name -->
          <label>Event Name</label>
          <!-- input two way binding using v-model to event.event_name object value -->
          <input
            type="text"
            class="form-control"
            v-model="event.event_name"
            required
          />
        </div>
        <div class="form-group">
          <label>Event Type</label>
          <!-- input two way binding using v-model to event.event_type object value -->
          <input
            type="text"
            class="form-control"
            v-model="event.event_type"
            required
          />
        </div>
        <div class="form-group">
          <label>New Event Date</label>
          <!-- two way binding using v-model to event.event_date -->
          <input
            type="date"
            class="form-control"
            v-model="event.event_date"
            required
          />
        </div>
        <!-- button to submit the form  -->
        <button class="btn btn-danger mt-3">Create</button>
      </form>
      <!-- button to display the add location form when user clicked on  -->
      <button
        @click="isShow = !isShow"
        class="btn btn-primary mt-3"
        v-if="!isShow"
      >
        Add Event
      </button>
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
      // Events to hold events from database.
      Events: {},
      // location to hold location from database.
      location: {},
      // variable to determine to display add events form
      isShow: false,
      // event object to accept user input new event information
      event: {
        location: "",
        event_name: "",
        event_type: "",
        event_date: "",
      },
    };
  },
  // created instance to use axios call apis to get data from the database.
  created() {
    // api to get event by location _id
    let apiURL = `http://127.0.0.1:3000/events/${this.$route.params.id}`;
    // axios to call api and getting data back from the database.
    axios
      .get(apiURL)
      .then((res) => {
        // assigning the result data from the backend api to the Events object
        this.Events = res.data;
      })
      .catch((error) => {
        // catch error then output to the console if any
        console.log(error);
      });
    // get location by location _id
    let apiURL1 = `http://localhost:3000/locationsByName/${this.$route.params.id}`;
    // axios get method to request data from database through backend api
    axios
      // pass in the url
      .get(apiURL1)
      .then((res) => {
        // assigning location with the result data from the api
        this.location = res.data;
      })
      .catch((error) => {
        // catch error if any then display in the console.
        console.log(error);
      });
  },
  // methods instance to store functions
  methods: {
    // delete event by id
    deleteEvent(id) {
      // set up url to pass into the axios function
      let apiURL = `http://127.0.0.1:3000/event/${id}`;
      // prompt a alert window to confirm with user deletion of the event.
      if (window.confirm("Do you really want to delete?")) {
        // axios delete method to request delete event api from the backend server.
        axios
          // pass in the url
          .delete(apiURL)
          .then(() => {
            // redirect the user to the event page after deletion.
            this.$router.go("/events");
          })
          .catch((error) => {
            // console log error if any
            console.log(error);
          });
      }
    },
    // handle the new event submittion function
    handleSubmitForm() {
      // set up the url to pass into the axios function
      let apiURL = "http://127.0.0.1:3000/event";
      // assign the location key and values to the location object inside the event object.
      this.event.location = {
        locationName: this.location.data.location[0].locationName,
        address: this.location.data.location[0].address,
        city: this.location.data.location[0].city,
        state: this.location.data.location[0].state,
        zipCode: this.location.data.location[0].zipCode,
        country: this.location.data.location[0].country,
      };
      // axios post method to post the user input to the database through api.
      axios
        // pass in the url and the object we want to post
        .post(apiURL, this.event)
        .then(() => {
          // redirect user to the evetns page.
          this.$router.go("/events");
          // set the event object to empty again.
          this.event = {
            location: "",
            event_name: "",
            event_type: "",
            event_date: "",
          };
        })
        .catch((error) => {
          // catch error if any
          console.log(error);
        });
    },
  },
};
</script>



<style>
.btn-success {
  margin-right: 10px;
}
</style>
