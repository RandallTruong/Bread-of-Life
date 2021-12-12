<template>
  <!-- the template for nav bar  -->
  <div>
    <!-- Nav bar -->
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="container">
        <!-- href to the home page  -->
        <a class="navbar-brand float-left" href="/"
          >Bread Of Life <small class="h6">Event Sign Up</small></a
        >
        <!-- bootstrap class for the nav bar -->
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <!-- list for each link to the components -->
            <li class="nav-item">
              <!-- router link to the sign up page for individuals to sign up for events  -->
              <router-link class="nav-link" :to="{ name: 'create' }"
                >Sign Up For Distribution</router-link
              >
            </li>
            <li class="nav-item">
              <!-- router link  to the view page to view all locations availiable -->
              <router-link class="nav-link" :to="{ name: 'view' }"
                >View Locations</router-link
              >
            </li>
            <li class="nav-item">
              <!-- router link to view over all activities participated by individuals signed up for events -->
              <router-link class="nav-link" :to="{ name: 'activities' }"
                >Activities</router-link
              >
            </li>
            <li class="nav-item">
              <!-- router link to view history of a persons participation in events that been signed up -->
              <router-link class="nav-link" :to="{ name: 'history' }"
                >Individual History</router-link
              >
            </li>
            <li class="nav-item">
              <!-- router link to the graph chart page  -->
              <router-link class="nav-link" :to="{ name: 'GraphChart' }"
                >Chart</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>
