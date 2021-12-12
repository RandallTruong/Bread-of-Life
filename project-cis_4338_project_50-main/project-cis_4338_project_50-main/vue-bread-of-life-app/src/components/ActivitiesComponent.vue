<template>
  <div class="row">
    <div class="col-md-12">
      <!-- template to view all activities accros user base -->
      <form @submit.prevent="getInfoByEvent">
        <!-- v-if to check if the events status is success -->
        <div id="form-group" v-if="events.status == 'success'">
          <label>Choose the event to see activities</label>
          <ul v-for="event in events.data.events" :key="event._id">
            <li>
              <div class="form-check">
                <!-- input two way binding for event detail, where we have concat value from three different object -->
                <input
                  class="form-check-input"
                  type="radio"
                  name="selectEvent"
                  v-model="eventDetail"
                  :value="
                    event.event_date.slice(0, 10) +
                    ' ' +
                    event.event_type +
                    ' ' +
                    event.location.locationName
                  "
                  id="selectEvent1"
                  required
                />
                <!-- form check label for events location name and event date -->
                <label class="form-check-label" for="selectEvent1">
                  {{ event.location.locationName }},&nbsp;{{
                    event.event_date.slice(0, 10)
                  }},&nbsp;{{ event.event_type }}
                </label>
              </div>
            </li>
          </ul>
        </div>
        <!-- when the events.count is 0 that means we didnt get any data back from the database
        then we just display the block with no events available yet -->
        <small
          class="text-secondary d-flex justify-content-start"
          v-if="events.count == 0"
          >No Events Available Yet</small
        >
        <!-- check if the stringify version of the eventDetail object is not empty object -->
        <small v-if="JSON.stringify(eventDetail) !== '{}'">{{
          eventDetail
        }}</small>
        <br />
        <!-- submit button -->
        <button class="btn btn-danger mt-3">Find</button>
      </form>

      <br />
      <!-- check if the status of the Individuals object is success -->
      <div v-if="Individuals.status == 'success'">
        <!-- if the count of the Individuals is 0 that means we didnt have any match in the database -->
        <div v-if="Individuals.count == 0">No data found</div>
        <!-- if the count if not 0 we display the Individuals information along with the event details -->
        <div v-else-if="Individuals.count != 0">
          <h6 class="text-dark">
            Event: {{ Individuals.data.eventDate[0].eventDetail }}
          </h6>
          <h6>Total Participated: {{ Individuals.count }}</h6>
          <!-- table to output individual names -->
          <h5>Individual Participated</h5>
          <table class="table table-bordered table-hover">
            <thead class="table-bordered table-dark">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Zip</th>
              </tr>
            </thead>
            <tbody>
              <!-- v-for to loop through the Individuals object to get user's first, last and cell and zip code -->
              <tr v-for="ind in Individuals.data.eventDate" :key="ind.id">
                <td>{{ ind.identity.firstName }}</td>
                <td>{{ ind.identity.lastName }}</td>
                <td>{{ ind.identity.phoneNumber }}</td>
                <td>{{ ind.zipCode }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- todo1
       -->
      <br />
      <!-- form to get users with the matching zip code -->
      <form @submit.prevent="getInfoByZip">
        <div class="form-group">
          <label>Search Individual By Zip</label>
          <!-- input to ask user to enter a zipcode with the pattern of 5 digits only -->
          <input
            type="text"
            class="form-control"
            v-model="zip"
            pattern="^[0-9]{5}$"
            placeholder="Enter zip to search participant"
            required
          />
          <small class="form-text text-muted">
            zip code must be 5 digits
          </small>
        </div>
        {{ zip }}
        <br />
        <!-- submit button -->
        <button class="btn btn-danger mt-3">Find</button>
      </form>
      <!-- 
        todo1
       -->

      <!-- todo2
       -->
      <!-- if the count of the IndividualsByZip is greater than 0 that means we have match data from the database -->
      <div v-if="IndividualsByZip.count > 0">
        <br />
        <!-- we output the zipcode through the IndividualsByZip object -->
        <h6>
          Target Zip Code: {{ IndividualsByZip.data.findIdentity[0].zipCode }}
        </h6>
        <h6>
          <!-- and display the total count of users being returned from the database. -->
          Individual Participation History Total By Zip Code:
          {{ IndividualsByZip.count }}
        </h6>
        <!-- the below table to display users' information -->
        <table class="table table-bordered table-hover">
          <thead class="table-bordered table-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Zip</th>
              <th>Event</th>
            </tr>
          </thead>
          <tbody>
            <!-- v-for to loop throught IndividualsByZip object for user's first, last name and phone, zip code and eventDetail -->
            <tr v-for="ind in IndividualsByZip.data.findIdentity" :key="ind.id">
              <td>{{ ind.identity.firstName }}</td>
              <td>{{ ind.identity.lastName }}</td>
              <td>{{ ind.identity.phoneNumber }}</td>
              <td>{{ ind.zipCode }}</td>
              <td>{{ ind.eventDetail }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- if the count is 0 that means no data being returned from the database -->
      <div v-else-if="IndividualsByZip.count == 0">
        <!-- we give user the no record found message -->
        <br />
        No Zip Code Record Found
      </div>
      <!-- 
        todo2
       -->
    </div>
  </div>
</template>


<script>
// import axios from axios to request data from server
import axios from "axios";
export default {
  data() {
    return {
      // to hold return data from the database
      Individuals: {},
      // to hold return data from the database with matching zip
      IndividualsByZip: {},
      // to hold the eventDetail for users, to match with this eventDetail object
      eventDetail: {},
      // to hold the event being returned
      events: {},
      // to hold the zip code we going to use for api get users by zip
      zip: "",
    };
  },
  // created instance to get data back from the database
  created() {
    // api url to get all events from the database.
    let apiURL = `http://127.0.0.1:3000/events`;
    // axios get method to get all events.
    axios
      .get(apiURL)
      .then((res) => {
        // assign the result data from the database to events.
        this.events = res.data;
      })
      .catch((error) => {
        // output to console if any error occured
        console.log(error);
      });
  },
  // methods instance
  methods: {
    // methods to get user info by event
    getInfoByEvent() {
      // api to get all users with matching evetDetails from the database.
      let apiURL = `http://localhost:3000/individuals/event/${this.eventDetail}`;
      // axios get call api
      axios
        .get(apiURL)
        .then((res) => {
          // first we empty the Individuals object
          this.Individuals = {};
          // assign newly requested data from the api to Individuals.
          this.Individuals = res.data;
          // empty the eventDetail object
          this.eventDetail = {};
        })
        .catch((error) => {
          // output error to console if any
          console.log(error);
        });
    },
    // todo3
    // get user info by zip code
    getInfoByZip() {
      // api to get all user information with matching zip code
      let apiURL = `http://127.0.0.1:3000/individuals/${this.zip}`;
      // axios get method to get data from the database.
      axios
        .get(apiURL)
        .then((res) => {
          // empty the object
          this.IndividualsByZip = {};
          // assign newly requested data from the backend database to IndividualsByZip
          this.IndividualsByZip = res.data;
          // empty the zip variable.
          this.zip = "";
        })
        .catch((error) => {
          // output error to console if any
          console.log(error);
        });
    },
    // todo3
  },
};
</script>
<style scoped>
li {
  /* style for the list */
  list-style-type: none;
}
</style>