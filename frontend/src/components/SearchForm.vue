<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1>{{ msg }}</h1>
        <form class="field has-addons" v-on:submit.prevent="onSubmit">
        <div class="control is-expanded">
            <input class="input" v-model="searchTerm" type="text" name="search" placeholder="Search"><br>
        </div>
        <div class="control">
          <button class="button is-primary control" v-on:click="scrape(searchTerm)">Submit</button>
        </div>
        </form>
      </div>
    </div>
    <p v-if="seen">Search text is: {{ searchResults }}</p>
  </section>
</template>

<script>
// import axios from 'axios';

export default {
  name: "SearchForm",
  props: {
    msg: String
  },
  data: function () {
    return {
      searchTerm: "",
      searchResults: [],
      seen: false
    }
  },
  methods: {
    scrape: function(searchTerm) {
      this.searchResults = searchTerm;
      this.searchTerm = "";
      this.seen = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
