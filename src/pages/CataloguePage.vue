<template>
  <div class="catalog-page">
    <!-- <p>
      Вимоги: Створи додаток пошуку шпалер для екранів.
      <samp class="color-green">
        Користувач повинен могти шукати шпалери за наданим запитом.
      </samp>
      <samp class="color-red">
        Потрібно створити можливість встановлювати фільтри перед новим пошуком.
        Серед фільтрів повинні бути: сортування, порядок, дозволи.
      </samp>
      Показуй мініатюрні зображення у списку результатів. За натискання на
      зображення, показуй оригінальне зображення у модальному вікні.
    </p> -->
    <h1>Search picture:</h1>
    <div class="filter">

        <div @click="isColorBarOpen=true"  class="filter-by-color">

        <ul :v-show="isColorBarOpen" class="color-ul-style">

        <li class="color-li-style" v-for="item in colorForChoose" :key="colorForChoose.indexOf(item)" :style=" { backgroundColor : '#' + item, } "  @click="colorFilter=item , isColorBarOpen=false , log(isColorBarOpen)"> Color </li>
         </ul> 
          <span>тест перевірка що обрано: {{ colorFilter }} </span>
        </div>

      <form>
        <div>
          Filter сортувати по :
          <input
            type="radio"
            id="Choice1"
            name="filter"
            value="relevance"
            v-model="sortBy"
          />
          <label for="Choice1">Relevance</label>

          <input
            type="radio"
            id="Choice2"
            name="filter"
            value="random"
            v-model="sortBy"
          />
          <label for="Choice2">Random</label>

          <input
            type="radio"
            id="Choice3"
            name="filter"
            value="views"
            v-model="sortBy"
          />
          <label for="Choice3">Views</label>
        </div>
        <span>тест перевірка що обрано: {{ sortBy }} </span>
      </form>

      <label>
        <p>Search:</p>
        <input type="text" v-model="searchInput" class="catalog-page__input" />

        <button v-on:click="serarchRequest()" class="catalog-page__button">
          search
        </button>
      </label>
      <h1>
        {{ searchInput }}
      </h1>
      <div class="cards-area__wrap">
        <div v-if="searchResponse !== undefined">
          <div class="cards-area">
            <PosterCard
              v-for="item in searchResponse.data"
              :key="item.id"
              :thumbSrc="item.thumbs.small"
              :posterCategory="item.category"
              v-on:click.native="selectedItem = item"
              class="card"
            />

            <PopupWindow
              :isOpen="selectedItem !== undefined"
              @a="selectedItem = undefined"
              :item="selectedItem"
              @testEvent="changeColor"
            />
          </div>
          <div class="search-info">
            <span>Got {{ searchResponse.meta.total }} results </span>
            <span
              >Current page {{ searchResponse.meta.current_page }} /
              {{ searchResponse.meta.last_page }}
            </span>
            <button
              v-if="hasNextPage"
              v-on:click="nextPage()"
              class="cards-area__btn-next"
            >
              next
            </button>
            <button
              v-if="hasNextPage"
              v-on:click="lastPage()"
              class="cards-area__btn-next"
            >
              last
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import PosterCard from "@/components/PosterCard.vue";
import PopupWindow from "@/components/PopupWindow.vue";

export default {
  name: "CataloguePage",
  components: {
    PosterCard,
    PopupWindow,
  },

  data() {
    return {
      searchInput: "",
      searchResponse: undefined,
      confirmation: "",
      selectedItem: undefined,
      sortBy: "relevance",
      colorForChoose: [
        "660000",
        "990000",
        "cc0000",
        "cc3333",
        "ea4c88",
        "993399",
        "663399",
        "333399",
        "0066cc",
        "0099cc",
        "66cccc",
        "77cc33",
        "669900",
        "336600",
        "666600",
        "999900",
        "cccc33",
        "ffff00",
        "ffcc33",
        "ff9900",
        "ff6600",
        "cc6633",
        "996633",
        "663300",
        "000000",
        "999999",
        "cccccc",
        "ffffff",
        "424153",
      ],
      isColorBarOpen : false,

      colorFilter: "",

    };
  },
  computed: {
    forReturn() {
      return "SomeText";
    },
    hasNextPage() {
      return (
        this.searchResponse.meta.current_page <
        this.searchResponse.meta.last_page
      );
    },
  },

  methods: {
    async serarchRequest() {
      this.searchResponse = await (
        await fetch(
          `https://cors-anywhere.herokuapp.com/https://wallhaven.cc/api/v1/search?q=${this.searchInput}&sorting=${this.sortBy}&colors=${this.colorFilter}`
        )
      ).json();
    },
    async nextPage() {
      this.searchResponse = await (
        await fetch(
          `https://cors-anywhere.herokuapp.com/https://wallhaven.cc/api/v1/search?q=${
            this.searchInput
          }&sorting=${this.sortBy}}&colors=${this.colorFilter}&page=${
            this.searchResponse.meta.current_page + 1
          }`
        )
      ).json();
    },
    async lastPage() {
      this.searchResponse = await (
        await fetch(
          `https://cors-anywhere.herokuapp.com/https://wallhaven.cc/api/v1/search?q=${this.searchInput}&sorting=${this.sortBy}}&colors=${this.colorFilter}&page=${this.searchResponse.meta.last_page}`
        )
      ).json();
    },
    changeColor(text) {
      console.log(text);
      document.querySelector(".catalog-page").style.color = "red";
    },
    openPopup() {
      this.isPopupOpen = true;
    },
    log(item){
      console.log(item)
    }
  },

};
</script>
<style scoped>
.filter-by-color{
  width: 150px;
  height: 150px;
  background: red;
}
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
.color-red {
  color: red;
}
.color-green {
  color: green;
}
.label-color{
  width: 20px;
  height: 20px;
}
.color-ul-style{
 display: flex;
 flex-wrap: wrap;
 width: 400px;
 height: auto;

}

.color-li-style{
  display: block;
  width: 100px;
  height: auto;
  list-style: none;

}

</style>