<template>
<div class="container">
    <section class="hero is-success is-bold main-header">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-1">{{ msg }}</h1>
        <p>Use the search field below to scrape IMDB for Movies, TV Shows, Celebrities and more!</p>
        <br>
        <form class="field has-addons has-addons-centered" v-on:submit.prevent>
          <div class="control">
            <input class="input" v-model="searchTerm" type="text" name="search" placeholder="Search"><br>
          </div>
          <div class="control">
            <button class="button is-warning control" type="submit" v-on:click="scrape(searchTerm)">Submit</button>
          </div>
      </form>
      </div>
    </div>
    </section>
  <section class="container">
    <p class="spinner" v-if="iconSeen">
      <span  class="icon is-large">
        <i class="fas fa-3x fa-spinner fa-pulse"></i>
      </span>
    </p>
    <p class="intro" v-if="introSeen">
      Please enter search criteria above to see results here.
    </p>
    <div v-if="resultsSeen" class="box top-box">
      <h3 class="title is-3">Titles</h3>
      <ul>
        <li v-for="item in searchResults.Titles" :key="item">{{ item }}</li>
      </ul>
    </div>
    <div v-if="resultsSeen" class="box">
      <h3 class="title is-3">Names</h3>
      <ul>
        <li v-for="item in searchResults.Names" :key="item">{{ item }}</li>
      </ul>
    </div>
    <div v-if="resultsSeen" class="box">
      <h3 class="title is-3">Keywords</h3>
      <ul>
        <li v-for="item in searchResults.Keywords" :key="item">{{ item }}</li>
      </ul>
    </div>
    <div v-if="resultsSeen" class="box bottom-box">
      <h3 class="title is-3">Companies</h3>
      <ul>
        <li v-for="item in searchResults.Companies" :key="item">{{ item }}</li>
      </ul>
    </div>
  </section>
  <footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>IMDB Scraper</strong> by <a href="http://christopherlynam.com">Chris Lynam</a>.
    </p>
  </div>
</footer>
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
      introSeen: true,
      iconSeen: false
    }
  },
  methods: {
    scrape: function(searchTerm) {

      this.iconSeen = true;
      this.resultsSeen = false;
      this.introSeen = false;

      axios.post('/api/search', {
        search: searchTerm,
      })
      .then(response => {
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

<style>
.main-header {
  background-image: url('../assets/rogueone.jpg') !important;
  object-fit: cover;
}
.box {
  background-color: #f9f9f9 !important;
}

h1, h2, h3 {
  font-family: 'Days One', sans-serif;
  color: #076772 !important;
}

h3 {
  background-color: #dfe8ee;
  padding: 10px !important;
}

input {
  width: 50vw !important;
}

.spinner, .intro {
  padding-top: 100px;
  padding-bottom: 100px;
}

.top-box {
  margin-top: 20px;
}

.bottom-box {
  margin-bottom: 20px;
}
</style>


