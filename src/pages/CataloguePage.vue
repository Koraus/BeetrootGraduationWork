<template>
  <div class="catalog-page">
    <header class="header">
      <img src="../img/logo.svg" alt="" />

      <ul class="quick-tags">
        <li class="quick-tag">Latest</li>
        <li class="quick-tag">Hot</li>
        <li class="quick-tag">Toplist</li>
      </ul>
      <div class="footer-right">
        <span>Random</span>
        <img src="../img/header-ellipse.svg" alt="" />
      </div>
    </header>
    <section class="search-settings-panel">
      <h1 class="search-settings-panel__title">Explore the world</h1>
      <p class="search-settings-panel__paragraph">
        Platform gives you the best wallpaper
      </p>

      <label class="search-settings-panel__search-lable">
        <input
          @keydown.enter="serarchRequest()"
          type="text"
          v-model="searchInput"
          class="search-settings-panel__input"
          placeholder="Enter your request"
        />
        <button
          v-on:click="serarchRequest()"
          class="search-settings-panel__search-btn"
        >
          Search
        </button>
      </label>
      <ul class="categories">
        <li class="categorie" :class="{ activeTag: categories.general }">
          <input
            type="checkbox"
            id="general"
            value="1"
            v-model="categories.general"
          />
          <label for="general"> general </label>
        </li>
        <li class="categorie" :class="{ activeTag: categories.anime }">
          <input
            type="checkbox"
            id="anime"
            value="1"
            v-model="categories.anime"
          />
          <label for="anime">anime</label>
        </li>
        <li class="categorie" :class="{ activeTag: categories.people }">
          <input
            type="checkbox"
            id="people"
            value="1"
            v-model="categories.people"
          />
          <label for="people">people</label>
        </li>
      </ul>

      <h1>
        {{ searchInput }}
      </h1>
    </section>

    <div class="cards-area__wrap">
      <h2 class="title-sorting">{{ sortByTitle() }}</h2>

      <div class="filter-panels-area">

        <form
          class="filter-panel"
          @click.stop="
            isDrListSortByOpen
              ? (isDrListSortByOpen = false)
              : (isDrListSortByOpen = true)
          "
        >
          <span class="filter-panel__text">
            Sorting by:
            <span class="filter-panel__text-selected">{{
              sortByTitle()
            }}</span>
          </span>

          <div
            class="filter-panel__drop-list"
            v-show="isDrListSortByOpen"
          >
            <label
              for="Choice1"
              @click.stop="
                (isDrListSortByOpen = false)"
            >
              <input
                type="radio"
                id="Choice1"
                name="filter"
                value="relevance"
                v-model="sortBy"
              />
              Relevance
            </label>

            <label @click.stop="isDrListSortByOpen = false" for="Choice2">
              <input
                type="radio"
                id="Choice2"
                name="filter"
                value="random"
                v-model="sortBy"
              />Random</label
            >

            <label @click.stop="isDrListSortByOpen = false" for="Choice3">
              <input
                type="radio"
                id="Choice3"
                name="filter"
                value="views"
                v-model="sortBy"
              />Views
            </label>
          </div>
        </form>

        <form
          class="filter-panel filter-panel__color"
          @click.stop="
            isColorBarOpen
              ? (isColorBarOpen = false)
              : (isColorBarOpen = true)
          "
        >
          <span class="filter-panel__text">
            Color:
            <span class="filter-panel__selected-color" :style="{ backgroundColor: '#' + colorFilter } ">    </span>

          </span>

          <div
            class="filter-panel__drop-list_for-color"
            v-show="isColorBarOpen"
          >
           
              <div @click.stop="isColorBarOpen = true" class="color-style-div">

                <ul :v-show="isColorBarOpen" class="color-ul-style">
                  <li
                    class="color-li-style"
                    v-for="item in colorForChoose"
                    :key="colorForChoose.indexOf(item)"
                    :style="{ backgroundColor: '#' + item }"
                    @click.stop="
                      (colorFilter = item),
                        (isColorBarOpen = false),
                        log(isColorBarOpen)
                    "
                  >
                    {{item}}
                  </li>
                </ul>
            
              </div>
            
          </div>
        </form>
      </div>

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
      isColorBarOpen: false,

      colorFilter: "",
      categories: {
        general: "",
        anime: "",
        people: "",
      },
      isDrListSortByOpen: false,
      classActiv: {
        activeTag: "active-tag",
      },
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
          `https://cors-anywhere.herokuapp.com/https://wallhaven.cc/api/v1/search?q=${
            this.searchInput
          }&categories=${
            String(Number(this.categories.general)) +
            String(Number(this.categories.anime)) +
            String(Number(this.categories.people))
          }&sorting=${this.sortBy}&colors=${this.colorFilter}`
        )
      ).json();
    },
    async nextPage() {
      this.searchResponse = await (
        await fetch(
          `https://cors-anywhere.herokuapp.com/https://wallhaven.cc/api/v1/search?q=${
            this.searchInput
          }&categories=${
            String(Number(this.categories.general)) +
            String(Number(this.categories.anime)) +
            String(Number(this.categories.people))
          }&sorting=${this.sortBy}}&colors=${this.colorFilter}&page=${
            this.searchResponse.meta.current_page + 1
          }`
        )
      ).json();
    },
    async lastPage() {
      this.searchResponse = await (
        await fetch(
          `https://cors-anywhere.herokuapp.com/https://wallhaven.cc/api/v1/search?q=${
            this.searchInput
          }&categories=${
            String(Number(this.categories.general)) +
            String(Number(this.categories.anime)) +
            String(Number(this.categories.people))
          }&sorting=${this.sortBy}}&colors=${this.colorFilter}&page=${
            this.searchResponse.meta.last_page
          }`
        )
      ).json();
    },
    openPopup() {
      this.isPopupOpen = true;
    },
    log(item) {
      console.log(item);
    },
    sortByTitle() {
      return this.sortBy[0].toUpperCase() + this.sortBy.slice(1);
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Manrope&display=swap");

.catalog-page {
  padding: 40px;
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
.search-settings-panel__input {
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  width: 40%;
  height: 56px;
  box-sizing: border-box;
  padding-right: 20px;
  padding-left: 24px;
  border-radius: 12px;
  border: none;
}
.search-settings-panel__search-btn {
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  position: absolute;
  right: 7px;
  bottom: -7px;
  box-sizing: border-box;
  color: #ffffff;
  background: #000;
  width: 100px;
  height: 40px;
  border-radius: 10px;
}

.search-settings-panel__search-lable {
  position: relative;
}

.label-color {
  width: 20px;
  height: 20px;
}
.color-ul-style {
  display: flex;
  flex-wrap: wrap;

  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  margin-right: 0;


  width: 224px;
  height: auto;
}

.color-li-style {
  display: block;
  box-sizing: border-box;
  padding: 4px;
  width: 52px;
  min-height: 20px;
  border-radius: 6px;
  height: auto;
  margin: 2px;
  font-size: 12px;
  text-align: center;
  color: white;
}
.color-li-style:hover{
transform: scale(1.2);
}
.filter-panel__selected-color{
  display: inline-block;
  width: 50%;
  height: 20px;
  border-radius: 10px;
  margin-bottom: -4px;
  margin-right: 20px ;
  margin-left: 20px ;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.quick-tags {
  display: flex;
}
.quick-tag {
  list-style: none;

  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: #000000;
}
.search-settings-panel {
  box-sizing: border-box;
  padding-top: 64px;
  padding-bottom: 53px;
  margin: 0 auto;
  max-width: 100%;
  background: #f9e7da;
  border-radius: 24px;
  margin-bottom: 64px;
}
.search-settings-panel__title {
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 64px;
  line-height: 108%;
  color: #000000;
  margin-bottom: 16px;
}
.search-settings-panel__paragraph {
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.4);
  margin-bottom: 32px;
}
.categories {
  display: flex;
  list-style: none;
  justify-content: center;
}
.categorie > input {
  /* visibility: hidden; */
  display: none;
}

.categorie {
  border: 2px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.7);
  border-radius: 24px;
  padding: 2px 10px 2px 10px;
  margin-right: 12px;
}
.activeTag {
  border: 2px solid rgba(0, 0, 0, 0.8);
  color: rgba(0, 0, 0, 1);
}
.title-sorting {
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 100%;
  color: #000000;
  text-align: left;
}
.filter-panel {
  text-align: left;
  position: relative;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  background: #f4f4f4;
  border-radius: 16px;
  padding: 20px;
  width: 262px;
  min-width: 262px;
  box-sizing: border-box;
  margin-right: 16px;
  margin-bottom: 40px;
}
.filter-panel:after {
  position: absolute;
  z-index: 0;
  top: 21px;
  right: 21px;
  content: url("../img/drop-down-ar.svg");
}
.filter-panel::before {
  position: absolute;
  z-index: 2;
  top: 21px;
  right: 21px;
  content: url("../img/drop-down-up-ar.svg");
}
.filter-panel__drop-list {
  position: absolute;
  top: 50px;
  left: 0;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  background: #f4f4f4;
  border-radius: 16px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  padding: 10px 20px 0 20px;
  width: 262px;
  /* height: 120px; */
  box-sizing: border-box;
  z-index: 1;
  display: flex;
  flex-direction: column;
}
.filter-panel__drop-list_for-color {
  position: absolute;
  top: 50px;
  left: 0;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  background: #f4f4f4;
  border-radius: 16px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  padding: 10px 20px 0 20px;
  width: 262px;
  /* height: 120px; */
  box-sizing: border-box;
  z-index: 1;
  display: flex;
  flex-direction: column;
}
.filter-panel__drop-list > label {
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  padding: 20px 20px 20px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.filter-panel__drop-list > label > input {
  display: none;
}
.filter-panel__drop-list > label:first-child {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.filter-panel__sort-by-drop-list > label:last-child {
  border-bottom: none;
}
.filter-panel__text {
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);
}
.filter-panel__text-selected {
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
}
.filter-panels-area{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* justify-content: center; */
  
}

/* visibility: hidden;*/
</style>

