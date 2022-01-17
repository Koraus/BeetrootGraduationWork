<template>
  <div class="catalog-page">
    <h1>Catalog</h1>
    <label>
      <p>Search:</p>
      <input type="text" v-model="searchInput" class="catalog-page__input" />
      <button
        v-on:click="serarchRequest()"
        class="catalog-page__button"
      >
        search
      </button>
      <!-- <button v-on:click="testLog(serarchRequest())">testLog</button> -->
    </label>
    <h1>
      {{ searchInput }}
    </h1>
    <div class="cards-area__wrap">
      <ModalWindow
        v-show="srcLarge !== undefined"
        v-on:click.native="srcLarge = undefined"
        :thumbSrcLarge="srcLarge"
      />

      <div v-if="searchResponse !== undefined">
        <div class="cards-area">
          <PosterCard
            v-for="item in searchResponse.data"
            :key="item.id"
            :thumbSrc="item.thumbs.small"
            :thumbSrcLarge="item.thumbs.large"
            :posterCategory="item.category"
            v-on:click.native="srcLarge = item.path"
            class="card"
          />
        </div>
        <div class="search-info">
          <span>Got {{ searchResponse.meta.total }} results </span>
          <span>Current page {{ searchResponse.meta.current_page }} / {{ searchResponse.meta.last_page }} </span>
          <button v-if="hasNextPage" v-on:click="nextPage()" class="cards-area__btn-next"> next </button>
          <button v-if="hasNextPage" v-on:click="lastPage()" class="cards-area__btn-next"> last </button>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>




<script>
// @ is an alias to /src
import PosterCard from "@/components/PosterCard.vue";
import ModalWindow from "@/components/ModalWindow.vue";

export default {
  name: "CataloguePage",
  components: {
    PosterCard,
    ModalWindow,
  },

  data() {
    return {
      searchInput: "",
      searchResponse: undefined,
      srcLarge: undefined,
    };
  },
  computed: {
    forReturn() {
      return "SomeText";
    },
    hasNextPage() {
      return this.searchResponse.meta.current_page < this.searchResponse.meta.last_page;
    }
  },

  methods: {
    async serarchRequest() {
      this.searchResponse = await (
        await fetch(
          `https://cors-anywhere.herokuapp.com/https://wallhaven.cc/api/v1/search?q=${this.searchInput}`
        )
      ).json();
    },
    async nextPage() {
      this.searchResponse = await (
        await fetch(
          `https://cors-anywhere.herokuapp.com/https://wallhaven.cc/api/v1/search?q=${this.searchInput}&page=${
            this.searchResponse.meta.current_page + 1
          }`
        )
      ).json();
    },
    async lastPage() {
      this.searchResponse = await (
        await fetch(
          `https://cors-anywhere.herokuapp.com/https://wallhaven.cc/api/v1/search?q=${this.searchInput}&page=${
            this.searchResponse.meta.last_page
          }`
        )
      ).json();
    },
  },
};
</script>
<style scoped>
.wrap {
  display: flex;
}
.card {
  margin: 20px;
}
.cards-area__wrap {
  display: flex;
  flex-direction: column;
}
.cards-area {
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.catalog-page__input {
  width: 60%;
  height: 40px;
  box-sizing: border-box;
  padding-right: 20px;
  padding-left: 10px;
}
.catalog-page__button {
  box-sizing: border-box;
  color: #3106ee;

  height: 40px;
  padding-right: 10px;
  padding-left: 10px;
  border-left: none;
}
.search-info > span {
  display: block;
}
.modal-window {
  /* display: none; */
}
</style>