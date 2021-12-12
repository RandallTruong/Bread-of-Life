<template>
  <!-- thank you template to user when they submit the sign up form -->
  <div class="jumbotron text-center">
    <h1 class="display-3">Thank You!</h1>
    <p class="lead">
      <strong
        >Thank you for signing up Bread of Life distribution event!</strong
      >
    </p>
    <hr />
    <p>
      Want to Sign up for more events?
      <!-- router link to redirect the user to the sign up page -->
      <router-link to="/create">Sign Up</router-link>
    </p>
    <p class="lead">
      <!-- router link to redirect the user to the home page -->
      <router-link
        class="btn btn-primary btn-sm"
        href="https://bootstrapcreative.com/"
        role="button"
        to="/"
        >Home Page</router-link
      >
    </p>
  </div>
</template>