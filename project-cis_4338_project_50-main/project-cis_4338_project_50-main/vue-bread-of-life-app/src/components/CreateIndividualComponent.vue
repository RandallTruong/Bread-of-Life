<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <!-- template for user sign up. -->
      <h3 class="text-center">Distribution Sign-Up</h3>
      <form @submit.prevent="postForm">
        <!-- v-if to check if status is success -->
        <div id="form-group" v-if="events.status == 'success'">
          <label
            >For Which distribution are you signing up
            <small class="text-danger"
              >* required, Must Select A Event Below If Shown</small
            ></label
          >
          <!-- v-for to loop from events object to display all events availiable from the database. -->
          <ul v-for="event in events.data.events" :key="event._id">
            <li>
              <div class="form-check">
                <!-- two way binding input using v-model for even detail for individual -->
                <!-- the value is concat with three different value from the object  -->
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="individual.eventDetail"
                  name="selectEvent"
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
                <!-- label with value location name and event event date and type from the databse. -->
                <label class="form-check-label" for="selectEvent1">
                  {{ event.location.locationName }},&nbsp;{{
                    event.event_date.slice(0, 10)
                  }},&nbsp;{{ event.event_type }}
                </label>
              </div>
            </li>
          </ul>
        </div>
        <small
          class="text-secondary d-flex justify-content-center"
          v-if="events.count == 0"
          >No Events Available Yet</small
        >
        <div class="form-group">
          <label>1. First Name <small class="text-danger">* </small></label>
          <!-- two way binding using v-model
          for the first name from the user input to the individual.identity object.
          pattern with regular expression only accept alphabets validation -->
          <input
            type="text"
            placeholder="John"
            pattern="^[A-Za-z]+$"
            class="form-control"
            v-model="individual.identity.firstName"
            required
          />
          <small class="text-secondary">Enter name with alphabets only</small>
        </div>
        <div class="form-group">
          <label>2. Last Name <small class="text-danger">* </small></label>
          <!-- two way binding using v-model
          for the last name from the user input to the individual.identity object.
          pattern with regular expression only accept alphabets for validation  -->
          <input
            type="text"
            placeholder="Doe"
            pattern="^[A-Za-z]+$"
            class="form-control"
            v-model="individual.identity.lastName"
            required
          />
          <small class="text-secondary">Enter name with alphabets only</small>
        </div>

        <div class="form-group">
          <label>3. Phone Number <small class="text-danger">* </small></label>
          <!-- two way binding using v-model for phone number from individual
          .identity, with pattern regular expression only accept 10 digits -->
          <input
            type="text"
            pattern="^\d{3}\d{3}\d{4}$"
            class="form-control"
            placeholder="8323332222"
            v-model="individual.identity.phoneNumber"
            required
          />
          <small id="phoneHelpBlock" class="form-text text-muted">
            phone number must be 10 digits
          </small>
        </div>
        <div class="form-group">
          <label>4. Zip Code <small class="text-danger">* </small></label>
          <!-- two way binding using v-model for individual.zipCode
          and pattern with regular expression only accept 5 digits input -->
          <input
            type="text"
            class="form-control"
            pattern="^[0-9]{5}$"
            placeholder="77777"
            v-model="individual.zipCode"
            required
          />
          <small id="phoneHelpBlock" class="form-text text-muted">
            zip code must be 5 digits
          </small>
        </div>
        <!-- form for questions when user sign up for events. -->
        <div id="form-group">
          <label>Questions</label> <br />
          <!-- ask user how did she/he heard about us -->
          <label
            >5. How did hear about our distribution
            <small class="text-danger">* </small></label
          >
          <br />
          <!-- tell user to select as many as possible -->
          <small id="phoneHelpBlock" class="form-text text-muted">
            check all that apply
          </small>
          <div class="form-check">
            <!-- two way binding using v-model for the first select 
            of how user heard about us, with type checkbox -->
            <input
              class="form-check-input"
              type="checkbox"
              v-model="individual.question.howDidHearBoutUs.facebook"
              id="facebook"
              value="0"
            />
            <!-- label for facebook -->
            <label class="form-check-label" for="facebook"> Facebook </label>
          </div>
          <div class="form-check">
            <!-- two way binding using v-model for the second select 
            of how user heard about us, with type checkbox -->
            <input
              class="form-check-input"
              type="checkbox"
              v-model="individual.question.howDidHearBoutUs.instagram"
              id="instagram"
              value="0"
            />
            <!-- lable for instagram -->
            <label class="form-check-label" for="instagram"> Instagram </label>
          </div>
          <div class="form-check">
            <!-- two way binding using v-model for the second select 
            of how user heard about us, with type checkbox -->
            <input
              class="form-check-input"
              type="checkbox"
              v-model="individual.question.howDidHearBoutUs.twitter"
              id="twitter"
              value="0"
            />
            <!-- label for twitter -->
            <label class="form-check-label" for="twitter"> Twitter </label>
          </div>
          <div class="form-check">
            <!-- two way binding using v-model for the third select 
            of how user heard about us, with type checkbox -->
            <input
              class="form-check-input"
              type="checkbox"
              v-model="individual.question.howDidHearBoutUs.wordOfMouth"
              id="wordOfMouth"
              value="0"
            />
            <!-- label for word of mouth -->
            <label class="form-check-label" for="wordOfMouth">
              Word of Mouth
            </label>
          </div>
          <div class="form-check">
            <!-- two way binding using v-model for the fourth select 
            of how user heard about us, with type checkbox -->
            <input
              class="form-check-input"
              type="checkbox"
              v-model="individual.question.howDidHearBoutUs.kmaz1025fm"
              id="kmaz1025fm"
              value="0"
            />
            <!-- label for kmaz1025fm -->
            <label class="form-check-label" for="kmaz1025fm">
              KMAZ 102.5FM
            </label>
          </div>
          <div class="form-check">
            <!-- two way binding using v-model for the fifth select 
            of how user heard about us, with type checkbox -->
            <input
              class="form-check-input"
              type="checkbox"
              id="others"
              value=""
            />
            <!-- label for others -->
            <label class="form-check-label" for="others"> Others </label>
            <input
              type="text"
              v-model="individual.question.howDidHearBoutUs.others"
            />
          </div>
          <!-- form group to ask user if they would like to recieve COVID vaccine during distribution -->
          <div class="form-group">
            <label
              >6. Would you like the COVID vaccine on during the distribution
              <small class="text-danger">* </small></label
            >
            <!-- form check for people say yes to COVID vaccine -->
            <div class="form-check">
              <!-- two way binding using v-model for user if they want to receieve vax on distribution -->
              <!-- type is radio and is required for the form -->
              <input
                class="form-check-input"
                type="radio"
                v-model="individual.question.covidVacCheck"
                name="covidVacCheck"
                value="1"
                id="covidVacCheck1"
                required
              />
              <!-- label for user say yes to the covid vaccine -->
              <label class="form-check-label" for="covidVacCheck1">
                Yes
                <small class="text-secondary">Answer Question 7</small></label
              >
            </div>
            <!-- form check for user say no to covid vaccine -->
            <div class="form-check">
              <!-- two way binding for input using v-model for individual.question.covidVacCheck -->
              <input
                class="form-check-input"
                type="radio"
                name="covidVacCheck"
                v-model="individual.question.covidVacCheck"
                value="0"
                id="covidVacCheck2"
              />
              <!-- label for people say no to the covid vaccine during distribution -->
              <label class="form-check-label" for="covidVacCheck2">
                No
                <small class="text-secondary">Skip to Question 8</small></label
              >
            </div>
          </div>
          <!-- form-group to ask people which COVID vaccine they prefer -->
          <div class="form-group">
            <label
              >7. Which COVID vaccine would you prefer to receive
              <small class="text-secondary">optional </small></label
            >
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.covidVacChoice with type radio-->
              <input
                class="form-check-input"
                type="radio"
                v-model="individual.question.covidVacChoice"
                name="vacChoice"
                value="Moderna"
                id="vacChoice1"
              />
              <label class="form-check-label" for="vacChoice1"> Moderna </label>
            </div>
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.covidVacChoice with type radio-->
              <input
                class="form-check-input"
                type="radio"
                name="vacChoice"
                v-model="individual.question.covidVacChoice"
                value="Pfizer"
                id="vacChoice2"
              />
              <label class="form-check-label" for="vacChoice2"> Pfizer </label>
            </div>
          </div>
          <!-- form-group to ask people if they have received the COVID vax -->
          <div class="form-group">
            <label
              >8. Have you received the COVID vaccine
              <small class="text-danger">* </small></label
            >
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.confirmVac with type radio -->
              <input
                class="form-check-input"
                type="radio"
                v-model="individual.question.confirmVac"
                name="confirmVac"
                value="1"
                id="confirmVac1"
                required
              />
              <!-- label for people if they have receieve COVID vax. -->
              <label class="form-check-label" for="confirmVac1"> Yes </label>
            </div>
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.confirmVac with type radio -->
              <input
                class="form-check-input"
                type="radio"
                name="confirmVac"
                v-model="individual.question.confirmVac"
                value="0"
                id="confirmVac2"
              />
              <!-- label for people if they have not receive any COVID vax -->
              <label class="form-check-label" for="confirmVac2"> No </label>
            </div>
          </div>
          <!-- form group to ask user if they need addtional suupport or nah. -->
          <div class="form-group">
            <label
              >9. Are you in need of addtional supportive services(e.g., utility
              assistance, rental assistance, housing, nutritional support,
              etc.)? <small class="text-danger">* </small></label
            >
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.addiSupportiveServces with type radio -->
              <input
                class="form-check-input"
                type="radio"
                v-model="individual.question.addiSupportiveServces"
                name="addiSupportiveServces"
                value="1"
                id="addiSupportiveServces1"
                required
              />
              <!-- label for people needs addtional suppport -->
              <label class="form-check-label" for="addiSupportiveServces1">
                Yes
              </label>
            </div>
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.addiSupportiveServces with type radio -->
              <input
                class="form-check-input"
                type="radio"
                name="addiSupportiveServces"
                v-model="individual.question.addiSupportiveServces"
                value="0"
                id="addiSupportiveServces2"
              />
              <!-- label for people doesnt need addtional support  -->
              <label class="form-check-label" for="addiSupportiveServces2">
                No <small class="text-secondary">Skip to Question 10</small>
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-control"
                type="text"
                v-model="individual.question.addtionalSupport"
              />
              <label class="form-check-label" for="addiSupportiveServces3">
                <!-- ask user the addtional support they need -->
                <small class="text-secondary"
                  >enter the addtional support needed</small
                >
              </label>
            </div>
          </div>
          <!-- for group to ask how many children in household -->
          <div class="form-group">
            <label
              >10. Number of Children in Household
              <small class="text-danger">* </small></label
            >
            <!-- two way binding using v-model for individual.question.numOfChildrenInHouseHold with type text -->
            <input
              pattern="^[0-9 -]+$"
              class="form-control"
              placeholder="1"
              type="text"
              v-model="individual.question.numOfChildrenInHouseHold"
              required
            />
            <!-- reminder for user that the entry must be whole digit -->
            <small class="text-secondary">must be whole digit </small>
          </div>
          <!-- form group to ask user if they have any people age 65 plus-->
          <div class="form-group">
            <label
              >11. Are you or anyone in your household 65+ in age
              <small class="text-danger">* </small></label
            >
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.age65PlusCheck with type radio -->
              <input
                class="form-check-input"
                type="radio"
                v-model="individual.question.age65PlusCheck"
                name="age65PlusCheck"
                value="1"
                id="age65PlusCheck1"
                required
              />
              <!-- label for yes to elderly check -->
              <label class="form-check-label" for="age65PlusCheck1">
                Yes
              </label>
            </div>
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.age65PlusCheck with type radio -->
              <input
                class="form-check-input"
                type="radio"
                name="age65PlusCheck"
                v-model="individual.question.age65PlusCheck"
                value="0"
                id="age65PlusCheck2"
              />
              <!-- label for no to elderly check -->
              <label class="form-check-label" for="age65PlusCheck2"> No </label>
            </div>
          </div>
          <div class="form-group">
            <label
              >12 Are you a veteran <small class="text-danger">* </small></label
            >
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.venteranCheck with type radio -->
              <input
                class="form-check-input"
                type="radio"
                v-model="individual.question.venteranCheck"
                name="venteranCheck"
                value="1"
                id="venteranCheck1"
                required
              />
              <!-- label for yes to veteran check -->
              <label class="form-check-label" for="venteranCheck1"> Yes </label>
            </div>
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.venteranCheck with type radio -->
              <input
                class="form-check-input"
                type="radio"
                name="venteranCheck"
                v-model="individual.question.venteranCheck"
                value="0"
                id="venteranCheck2"
              />
              <!-- label for no to venter check -->
              <label class="form-check-label" for="venteranCheck2"> No </label>
            </div>
          </div>
          <!-- form group to ask user their ethnicity -->
          <div class="form-group">
            <label
              >13. Which of the following best describes you?
              <small class="text-danger">*</small></label
            >
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.raceCheck with type radio -->
              <input
                class="form-check-input"
                type="radio"
                v-model="individual.question.raceCheck"
                name="raceCheck"
                value="Asian or Pacific Islander"
                id="raceCheck1"
                required
              />
              <!-- label for Asian or Pacific Islander user -->
              <label class="form-check-label" for="raceCheck1">
                Asian or Pacific Islander
              </label>
            </div>
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.raceCheck with type radio -->
              <input
                class="form-check-input"
                type="radio"
                name="raceCheck"
                v-model="individual.question.raceCheck"
                value="Black or African American"
                id="raceCheck2"
              />
              <!-- label for Black or African American user -->
              <label class="form-check-label" for="raceCheck2">
                Black or African American
              </label>
            </div>
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.raceCheck with type radio -->
              <input
                class="form-check-input"
                type="radio"
                name="raceCheck"
                v-model="individual.question.raceCheck"
                value="Hispanic or Latino"
                id="raceCheck3"
              />
              <!-- label for Hispanic or Latino user -->
              <label class="form-check-label" for="raceCheck3">
                Hispanic or Latino
              </label>
            </div>
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.raceCheck with type radio -->
              <input
                class="form-check-input"
                type="radio"
                name="raceCheck"
                v-model="individual.question.raceCheck"
                value="Native American or Alaskan Native"
                id="raceCheck4"
              />
              <!-- label for Native American or Alaskan Native user -->
              <label class="form-check-label" for="raceCheck4">
                Native American or Alaskan Native
              </label>
            </div>
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.raceCheck with type radio -->
              <input
                class="form-check-input"
                type="radio"
                name="raceCheck"
                v-model="individual.question.raceCheck"
                value="White or Caucasian"
                id="raceCheck5"
              />
              <!-- label for White or Caucasian user -->
              <label class="form-check-label" for="raceCheck5">
                White or Caucasian
              </label>
            </div>
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.raceCheck with type radio -->
              <input
                class="form-check-input"
                type="radio"
                name="raceCheck"
                v-model="individual.question.raceCheck"
                value="Multiracial or Biracial"
                id="raceCheck6"
              />
              <!-- label for Multiracial or Biracial user -->
              <label class="form-check-label" for="raceCheck6">
                Multiracial or Biracial
              </label>
            </div>
            <div class="form-check">
              <!-- two way binding using v-model for individual.question.raceCheck with type radio -->
              <input
                class="form-check-input"
                type="radio"
                name="raceCheck"
                v-model="individual.question.raceCheck"
                value="A race/ethnicity not listed here"
                id="raceCheck7"
              />
              <!-- label for user with race/ethnicity not listed in the form. -->
              <label class="form-check-label" for="raceCheck7">
                A race/ethnicity not listed here
              </label>
            </div>
          </div>
        </div>
        <!-- v-if when formError is true we display the message to tell
        user that the form may have errors  -->
        <div v-if="formError" class="text-danger">
          please check your form, make sure everything is filed and correct
        </div>
        <button class="btn btn-danger mt-3">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
// import axios from axios to request data from server
import axios from "axios";

export default {
  data() {
    return {
      // to check if any user error in the form.
      formError: false,
      // individual object to accept user input.
      individual: {
        identity: {
          firstName: "",
          lastName: "",
          phoneNumber: "",
        },
        zipCode: "",
        eventDetail: "",
        question: {
          howDidHearBoutUs: {
            facebook: 0,
            instagram: 0,
            twitter: 0,
            wordOfMouth: 0,
            kmaz1025fm: 0,
            others: "",
          },
          covidVacCheck: "",
          covidVacChoice: "",
          confirmVac: "",
          addiSupportiveServces: "",
          addtionalSupport: "",
          numOfChildrenInHouseHold: "",
          age65PlusCheck: "",
          venteranCheck: "",
          raceCheck: "",
        },
      },
      // store event data from the api call.
      events: {},
    };
  },
  // created instance to use axios call apis to get data from the database.
  created() {
    // set url to request data from the events api.
    let apiURL = `http://127.0.0.1:3000/events`;
    // axios get method to getting data from the api.
    axios
      .get(apiURL)
      .then((res) => {
        // return the data to the event object.
        this.events = res.data;
      })
      .catch((error) => {
        // catch error if any
        console.log(error);
      });
  },
  methods: {
    postForm() {
      // url to post to
      let apiURL = `http://localhost:3000/form`;
      // axios post method to post the user input form to the apiURL
      axios
        .post(apiURL, this.individual)
        .then(() => {
          //redirect user to the thank page.
          this.$router.push("/thanks");
          // set formError to false.
          this.formError = false;
          // set individual object to empty
          this.individual = {
            identity: {
              firstName: "",
              lastName: "",
              phoneNumber: "",
            },
            zipCode: "",
            eventDetail: "",
            question: {
              howDidHearBoutUs: {
                facebook: "",
                instagram: "",
                twitter: "",
                wordOfMouth: "",
                kmaz1025fm: "",
                others: "",
              },
              covidVacCheck: "",
              covidVacChoice: "",
              confirmVac: "",
              addiSupportiveServces: "",
              addtionalSupport: "",
              numOfChildrenInHouseHold: "",
              age65PlusCheck: "",
              venteranCheck: "",
              raceCheck: "",
            },
          };
        })
        .catch(() => {
          this.formError = true;
          // alert("please check your form");
        });
    },
    delay() {},
  },
};
</script>
<style scoped>
li {
  list-style-type: none;
}
</style>