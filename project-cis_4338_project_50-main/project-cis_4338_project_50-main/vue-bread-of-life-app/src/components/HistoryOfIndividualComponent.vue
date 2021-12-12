<template>
  <!-- template for individual history -->
  <div class="row">
    <div class="col-md-12">
      <!-- form to submit to handelSubmitForm method -->
      <form @submit.prevent="handleSubmitForm">
        <!-- heading for the page -->
        <h3>Search Individual Record</h3>
        <div class="form-group">
          <label>First Name</label>
          <!-- ask user input their first name -->
          <input
            type="text"
            class="form-control"
            v-model="identity.firstName"
            required
          />
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <!-- ask user input their last name -->
          <input
            type="text"
            class="form-control"
            v-model="identity.lastName"
            required
          />
        </div>
        <div class="form-group">
          <label>Phone</label>
          <!-- ask user to input their phone number -->
          <input
            type="text"
            pattern="^[0-9 -]+$"
            class="form-control"
            v-model="identity.phoneNumber"
            required
          />
        </div>
        <button class="btn btn-danger mt-3">Find</button>
      </form>
      <br />
      <!-- v-if to check if Individuals.eventCount is greater than 0 -->
      <div v-if="Individuals.eventCount > 0">
        <!-- table to displya user first and last name and Total participated Events -->
        <table class="table table-bordered table-hover">
          <thead class="table-bordered table-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Total Participated Event</th>
              <td>Zip Code</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <!-- table data to hold first name  -->
              <td>
                {{ Individuals.data.findIndividuals[0].identity.firstName }}
              </td>
              <!-- table data to hold last name -->
              <td>
                {{ Individuals.data.findIndividuals[0].identity.lastName }}
              </td>
              <!-- table data to hold eventCount -->
              <td>{{ Individuals.eventCount }}</td>
              <td>{{ Individuals.data.findIndividuals[0].zipCode }}</td>
            </tr>
          </tbody>
        </table>
        <!-- table to hold user participated events -->
        <table class="table table-bordered table-hover">
          <thead class="table-bordered table-dark">
            <tr>
              <th>Events Participated</th>
            </tr>
          </thead>
          <tbody>
            <!-- tr to loop through the Indiviudals data for event detail -->
            <tr
              v-for="individual in Individuals.data.findIndividuals"
              :key="individual._id"
            >
              <!-- display the eventDetail -->
              <td>{{ individual.eventDetail }}</td>
            </tr>
          </tbody>
        </table>
        <!-- table to display user answered questions from the sign up form. -->
        <h3>Questions Answered:</h3>
        <table class="table table-bordered table-hover">
          <thead class="table-bordered table-dark">
            <tr>
              <th>Heard about us from:</th>
              <th>Others</th>
            </tr>
          </thead>
          <tbody>
            <!-- get all user how did they heard us answer with key and value -->
            <tr
              v-for="(x, y) in Individuals.data.findIndividuals[
                Individuals.data.findIndividuals.length - 1
              ].question.howDidHearBoutUs"
              :key="x.id"
            >
              <!-- output only the answer that the value is not 0  -->
              <td v-if="x && x != 0">{{ y.toUpperCase() }}</td>
              <td v-if="y == 'others' && x != ''">{{ x }}</td>
            </tr>
          </tbody>
        </table>
        <!-- table to display user COVID vaccine response -->
        <table class="table table-bordered table-hover">
          <thead class="table-bordered table-dark">
            <tr>
              <th>Get COVID vaccine During distribution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <!-- table data to display user's reponse for taking COVID vaccine during distribution -->
              <td
                v-if="
                  Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.covidVacCheck
                "
              >
                Yes
              </td>
              <!-- if the negation of the value is true that means answer is no -->
              <td
                v-else-if="
                  !Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.covidVacCheck
                "
              >
                No
              </td>
            </tr>
          </tbody>
        </table>
        <!-- todo1 -->
        <!-- table to output users choice of vaccine -->
        <table class="table table-bordered table-hover">
          <thead class="table-bordered table-dark">
            <tr>
              <th>Which Covid Vaccine would you prefer to receive?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <!-- if the value returned is empty we display none -->
              <td
                v-if="
                  Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.covidVacChoice == ''
                "
              >
                None
              </td>
              <!-- v-else we display the record -->
              <td v-else>
                {{
                  Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.covidVacChoice
                }}
              </td>
            </tr>
          </tbody>
        </table>
        <!-- table to display if user have recieved vaccine or not -->
        <table class="table table-bordered table-hover">
          <thead class="table-bordered table-dark">
            <tr>
              <th>Have you received the COVID vaccine?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <!-- if the user value is true we display yes -->
              <td
                v-if="
                  Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.confirmVac
                "
              >
                Yes
              </td>
              <!-- else if the value negation is true we display no. -->
              <td
                v-else-if="
                  !Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.confirmVac
                "
              >
                No
              </td>
            </tr>
          </tbody>
        </table>
        <!-- ask the user if needs any supportive services -->
        <table class="table table-bordered table-hover">
          <thead class="table-bordered table-dark">
            <tr>
              <th>Do you have Any Addtional Supportive services needed?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <!-- if the value turns out to be true we display yes. -->
              <td
                v-if="
                  Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.addiSupportiveServces
                "
              >
                Yes
              </td>
              <!-- if the value turns out to be true with negation sign we display no.  -->
              <td
                v-else-if="
                  !Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.addiSupportiveServces
                "
              >
                No
              </td>
            </tr>
          </tbody>
        </table>
        <!-- display the list of addtional supportive service needed by user. -->
        <table class="table table-bordered table-hover">
          <thead class="table-bordered table-dark">
            <tr>
              <th>List of addtional supportive services needed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <!-- display the user's request for addtional support if any -->
              <td
                v-if="
                  Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.addtionalSupport
                "
              >
                {{
                  Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.addtionalSupport
                }}
              </td>
              <!-- display none if the user doesnt need any addtional support -->
              <td
                v-else-if="
                  !Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.addtionalSupport
                "
              >
                None
              </td>
            </tr>
          </tbody>
        </table>
        <!-- table to display the number of children in household -->
        <table class="table table-bordered table-hover">
          <thead class="table-bordered table-dark">
            <tr>
              <th>Number of Children In Household</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <!-- display the number of children in a household  -->
              <td>
                {{
                  Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.numOfChildrenInHouseHold
                }}
              </td>
            </tr>
          </tbody>
        </table>
        <!-- table to display if the user if 65+ or have anyone with age 65+  -->
        <table class="table table-bordered table-hover">
          <thead class="table-bordered table-dark">
            <tr>
              <th>Are you or anyone in your house-hold 65+ in age?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <!-- if the value from the database if true we display yes -->
              <td
                v-if="
                  Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.age65PlusCheck
                "
              >
                Yes
              </td>
              <!-- if the value from the database if false we display no -->
              <td
                v-else-if="
                  !Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.age65PlusCheck
                "
              >
                No
              </td>
            </tr>
          </tbody>
        </table>
        <!-- table to display the answer from user when asked if she/he is vetern -->
        <table class="table table-bordered table-hover">
          <thead class="table-bordered table-dark">
            <tr>
              <th>Are you a veteran?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <!-- if the value from the database if true we display yes -->
              <td
                v-if="
                  Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.venteranCheck
                "
              >
                Yes
              </td>
              <!-- if the value from the database if true we display no -->
              <td
                v-else-if="
                  !Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.venteranCheck
                "
              >
                No
              </td>
            </tr>
          </tbody>
        </table>
        <!-- table to display the answer where user choose his/her race -->
        <table class="table table-bordered table-hover">
          <thead class="table-bordered table-dark">
            <tr>
              <th>Race</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <!-- table data to display the user's choice from the database. -->
              <td>
                {{
                  Individuals.data.findIndividuals[
                    Individuals.data.findIndividuals.length - 1
                  ].question.raceCheck
                }}
              </td>
            </tr>
          </tbody>
        </table>
        <!-- todo1 -->
      </div>
      <!-- if the eventCount is 0 we display no data found -->
      <div v-else-if="Individuals.eventCount == 0">
        Individual Record Not Found!
      </div>
    </div>
  </div>
</template>


<script>
//Mauro Rodriguez
// you will need this module to react with the backend api
// import axios from "axios";
import axios from "axios";
export default {
  data() {
    return {
      // to hold Individuals being returned from the database.
      Individuals: {},
      // to hold identity for the user.
      identity: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
      },
    };
  },
  created() {},
  // methods to hold all methods.
  methods: {
    // the submit form to search for matching identity in the database.
    handleSubmitForm() {
      // api call to get individual with matching record.
      let apiURL = `http://localhost:3000/form/${this.identity.firstName}/${this.identity.lastName}/${this.identity.phoneNumber}`;
      // axios call
      axios
        .get(apiURL)
        .then((res) => {
          // get newly requested data and assign to the Individuals object.
          this.Individuals = res.data;
          // set the identity object to empty again.
          this.identity = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
          };
        })
        .catch((error) => {
          // catch and output to console if any error occured.
          console.log(error);
        });
    },
  },
};
</script>