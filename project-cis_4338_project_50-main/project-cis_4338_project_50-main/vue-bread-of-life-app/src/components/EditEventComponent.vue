<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <!-- tempte to update event -->
      <h3 class="text-center">Update Event</h3>
      <!-- submittion form to edit the event. -->
      <!-- v-if to check if status is success -->
      <form @submit.prevent="handleUpdateForm" v-if="event.status == 'success'">
        <!-- form group for event name -->
        <div class="form-group">
          <label>Event Name</label>
          <!-- input two way binding using v-model to event.data.events[0].event_name -->
          <input
            type="text"
            class="form-control"
            v-model="event.data.events[0].event_name"
            required
          />
        </div>
        <!-- input two way binding using v-model for the event type (event.data.events[0].event_type) -->
        <div class="form-group">
          <label>Event Type</label>
          <input
            type="text"
            class="form-control"
            v-model="event.data.events[0].event_type"
            required
          />
        </div>

        <div class="form-group">
          <label>Current Event Date</label>
          <p>{{ event.data.events[0].event_date.slice(0, 10) }}</p>
        </div>
        <div class="form-group">
          <label>New Event Date</label>
          <!-- input two way binding using v-model fro the event date -->
          <!-- set input type to date to better select date  -->
          <input
            type="date"
            class="form-control"
            v-model="event.data.events[0].event_date"
          />
        </div>
        <!-- button to submit the form -->
        <button class="btn btn-danger mt-3">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
// axios module to request api from the backend.
import axios from "axios";

export default {
  // setting up data instance
  data() {
    return {
      // holding data from the backend database for event
      event: {},
    };
  },
  // created instance to request data upon load page.
  created() {
    // url set up fro the api with paramter id from the event page.
    let apiURL = `http://127.0.0.1:3000/event/${this.$route.params.id}`;
    // passin the url using axios.get function
    axios.get(apiURL).then((res) => {
      // assigning the data from database to the event object.
      this.event = res.data;
    });
  },
  // methods stores functions
  methods: {
    // event update form function
    handleUpdateForm() {
      // set up the url for api with event id
      let apiURL = `http://127.0.0.1:3000/event/${this.$route.params.id}`;
      // use axios put method to update the event
      axios
        // pass in the url and user input data
        .put(apiURL, this.event.data.events[0])
        .then(() => {
          // then we redirect user to the view page.
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