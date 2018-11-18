<template>
<div class="container is-fluid">
    <section class="hero is-light is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-1">{{ msg }}</h1>
                <form class="field has-addons" v-on:submit.prevent>
        <div class="control is-expanded">
            <input class="input" v-model="searchTerm" type="text" name="search" placeholder="Search"><br>
        </div>
        <div class="control">
          <button class="button is-success control" type="submit" v-on:click="scrape(searchTerm)">Submit</button>
        </div>
        </form>
      </div>
    </div>
    </section>
  <section class="hero">
    <div class="hero-body">
      <div class="container">

      </div>
    </div>
  </section>
    <p>
      <span v-if="iconSeen" class="icon is-large">
        <i class="fas fa-3x fa-spinner fa-pulse"></i>
      </span>
    </p>
    <ul v-if="resultsSeen">
      <li v-for="item in searchResults" :key="item">{{ item }}</li>
    </ul>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SearchForm",
  props: {
    msg: String
  },
  data: function () {
    return {
      searchTerm: "",
      searchResults: [],
      resultsSeen: false,
      iconSeen: false
    }
  },
  methods: {
    scrape: function(searchTerm) {

      this.iconSeen = true;
      this.resultsSeen = false;

      axios.post('/api/search', {
        search: searchTerm,
      })
      .then(response => {
        console.log("response: "+response.data);
        this.searchResults = response.data;
        this.resultsSeen = true;
        this.iconSeen = false;
      })
      .catch(error => {
        console.log(error);
      });

      this.searchTerm = "";

    }
  }
};
</script>

