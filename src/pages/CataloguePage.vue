<template>
  <div class="catalog-page">
    <header class="header">
      <img src="../img/logo.svg" alt="" />

      <div class="header-right">
        <img
          v-on:click.stop="randomSearch()"
          src="../img/header-ellipse.svg"
          alt=""
        />
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
          v-on:click.stop="serarchRequest()"
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
            v-on:click.stop="serarchRequest()"
          />
          <label for="general"> general </label>
        </li>

        <li class="categorie" :class="{ activeTag: categories.anime }">
          <input
            type="checkbox"
            id="anime"
            value="1"
            v-model="categories.anime"
            v-on:click.stop="serarchRequest()"
          />
          <label for="anime">anime</label>
        </li>
        <li class="categorie" :class="{ activeTag: categories.people }">
          <input
            type="checkbox"
            id="people"
            value="1"
            v-model="categories.people"
            v-on:click.stop="serarchRequest()"
          />
          <label for="people">people</label>
        </li>
      </ul>
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
            <span class="filter-panel__text-selected">{{ sortByTitle() }}</span>
          </span>

          <div class="filter-panel__drop-list" v-show="isDrListSortByOpen">
            <label for="Choice1" @click.stop="isDrListSortByOpen = false">
              <input
                type="radio"
                id="Choice1"
                name="filter"
                value="relevance"
                v-model="sortBy"
                v-on:click.stop="serarchRequest()"
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
                v-on:click.stop="serarchRequest()"
              />Random</label
            >

            <label @click.stop="isDrListSortByOpen = false" for="Choice3">
              <input
                type="radio"
                id="Choice3"
                name="filter"
                value="views"
                v-model="sortBy"
                v-on:click.stop="serarchRequest()"
              />Views
            </label>
          </div>
        </form>

        <form
          class="filter-panel filter-panel__color"
          @click.stop="
            isColorBarOpen ? (isColorBarOpen = false) : (isColorBarOpen = true)
          "
        >
          <span class="filter-panel__text">
            Color:
            <span
              class="filter-panel__selected-color"
              :style="{ backgroundColor: '#' + colorFilter }"
            >
            </span>
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
                  @click.stop="(colorFilter = item), (isColorBarOpen = false)"
                  v-on:click.stop="serarchRequest()"
                >
                  {{ item }}
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
            :item="item"
          />

          <PopupWindow
            :isOpen="selectedItem !== undefined"
            @a="selectedItem = undefined"
            :item="selectedItem"
          />
        </div>

        <div class="pagination-bar">
          <button
            class="
              pagination-bar__btn
              pagination-bar__btn-prev
              pagination-bar__btn--bg
            "
            :class="{ paginationBarBtnDisabled: !hasPrevPage }"
            @click="goToPage(searchResponse.meta.current_page - 1)"
          ></button>

          <button
            class="pagination-bar__btn"
            @click="goToPage(1)"
            :class="{ activCrtPg: searchResponse.meta.current_page == 1 }"
          >
            1
          </button>

          <button
            v-if="
              searchResponse.meta.current_page != 1 &&
              searchResponse.meta.current_page != searchResponse.meta.last_page
            "
            class="pagination-bar__btn activCrtPg"
          >
            {{ searchResponse.meta.current_page }}
          </button>

          <span
            v-if="
              searchResponse.meta.current_page ===
                searchResponse.meta.last_page &&
              searchResponse.meta.last_page > 3
            "
            class="pagination-bar__btn-for-last-page"
          >
            <button
              class="pagination-bar__btn"
              @click="goToPage(searchResponse.meta.last_page - 2)"
            >
              {{ searchResponse.meta.last_page - 2 }}
            </button>
            <button
              class="pagination-bar__btn"
              @click="goToPage(searchResponse.meta.last_page - 1)"
            >
              {{ searchResponse.meta.last_page - 1 }}
            </button>
          </span>
          <span v-if="searchResponse.meta.last_page > 1" class="nav-btn">
            <button
              v-if="
                searchResponse.meta.current_page != 1 &&
                !searchResponse.meta.last_page
              "
              class="pagination-bar__btn"
              @click="goToPage(searchResponse.meta.current_page)"
            >
              {{ searchResponse.meta.current_page }}
            </button>
            <button
              v-if="
                searchResponse.meta.current_page + 1 <
                searchResponse.meta.last_page
              "
              class="pagination-bar__btn"
              @click="goToPage(searchResponse.meta.current_page + 1)"
            >
              {{ searchResponse.meta.current_page + 1 }}
            </button>
            <button
              v-if="
                searchResponse.meta.current_page + 2 <
                searchResponse.meta.last_page
              "
              class="pagination-bar__btn"
              @click="goToPage(searchResponse.meta.current_page + 2)"
            >
              {{ searchResponse.meta.current_page + 2 }}
            </button>
            <button
              v-if="
                searchResponse.meta.last_page >= 6 &&
                searchResponse.meta.current_page <
                  searchResponse.meta.last_page - 3
              "
              class="pagination-bar__btn"
            >
              ....
            </button>

            <button
              class="pagination-bar__btn"
              @click="goToPage(searchResponse.meta.last_page)"
              :class="{
                activCrtPg:
                  searchResponse.meta.current_page ==
                  searchResponse.meta.last_page,
              }"
            >
              {{ searchResponse.meta.last_page }}
            </button>
          </span>

          <button
            class="
              pagination-bar__btn
              pagination-bar__btn-next
              pagination-bar__btn--bg
            "
            @click="goToPage(searchResponse.meta.current_page + 1)"
            :class="{ paginationBarBtnDisabled: !hasNextPage }"
            :disabled="!hasNextPage"
          ></button>
        </div>
        <div class="search-info">
          <span>Got {{ searchResponse.meta.total }} results </span> <br />
          <span
            >Current page {{ searchResponse.meta.current_page }} /
            {{ searchResponse.meta.last_page }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import PosterCard from "@/components/PosterCard.vue";
import PopupWindow from "@/components/PopupWindow.vue";

const proxyUrl = "https://cors-proxy-ce3b.ndry.workers.dev/?";
// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
// const proxyUrl = "https://thingproxy.freeboard.io/fetch/";

const apiUrl = "https://wallhaven.cc/api/v1";

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
    hasPrevPage() {
      return this.searchResponse.meta.current_page - 1 >= 1;
    },
  },

  methods: {
    async serarchRequest() {
      await this.goToPage(1);
    },
    async goToPage(page) {
      const searchParams = new URLSearchParams({
        q: this.searchInput,
        categories:
          String(Number(this.categories.general)) +
          String(Number(this.categories.anime)) +
          String(Number(this.categories.people)),
        colors: this.colorFilter,
        sorting: this.sortBy,
        page,
      });
      this.searchResponse = await (
        await fetch(`${proxyUrl}${apiUrl}/search?${searchParams}`)
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
    async randomSearch() {
      this.searchResponse = await (
        await fetch(`${proxyUrl}${apiUrl}/search?random`)
      ).json();
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
  width: 60%;
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
.color-li-style:hover {
  transform: scale(1.2);
}
.filter-panel__selected-color {
  display: inline-block;
  width: 50%;
  height: 20px;
  border-radius: 10px;
  margin-bottom: -4px;
  margin-right: 20px;
  margin-left: 6px;
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
.filter-panels-area {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* justify-content: center; */
}

.pagination-bar__btn {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: #ffffff;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  margin-right: 16px;
  margin-left: 16px;
  margin-bottom: 20px;
}
.pagination-bar__btn:hover {
  border: 2px solid rgba(0, 0, 0, 1);
}
.activCrtPg {
  border: 1px solid black;
}
.pagination-bar__btn-prev::after {
  content: url(../img/btn-prev.svg);
}
.pagination-bar__btn-next::after {
  content: url(../img/btn-next.svg);
}
.pagination-bar__btn--bg {
  background: #f4f4f4;
}

.paginationBarBtnDisabled {
  opacity: 10%;
}
.paginationBarBtnDisabled:hover {
  border: none;
}
.search-info {
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
}

@media (max-width: 800px) {
  .search-settings-panel__input {
    width: 80%;
  }

}
@media (max-width: 500px) {
  .catalog-page {
    padding: 5px;
  }
  .card {
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  margin-bottom: 16px;
}
  .search-settings-panel__input {
    width: 90%;
  }
  .search-settings-panel {
    padding-top: 20px;
    padding-bottom: 23px;
    margin-top: 10px;
    margin-bottom: 20px;
;
  }
  .search-settings-panel__title {
    margin-top: 10px;
    font-size: 50px;
  }
  .title-sorting {
    text-align: center;
    margin: 10px 0 20px 0;
  }
  .filter-panels-area {
    align-items: center;
    justify-content: center;
  }
  .search-settings-panel__search-btn {
    padding: 1px;
    width: 65px;
  }
  .categories {
    padding-inline-start: 0;
  }
  .filter-panel {
    margin-bottom: 16px;
    margin-right: 0px;
    width: 100%;
    
  }
  .filter-panel__drop-list{
        margin-bottom: 16px;
    margin-right: 0px;
    width: 100%;
  }
  .filter-panel__drop-list_for-color{
           margin-bottom: 16px;
    margin-right: 0px;
    width: 100%;
  }
  .color-ul-style{
    width: 100%;
  }
  .color-li-style{
    width: 58px;
  }
  
   
}
@media (max-width: 321px) {
  .search-settings-panel__title {
    font-size: 40px;
  }
  .search-settings-panel__input {
    font-size: 14px;
    padding-right: 110px;
  }

  .search-settings-panel__input:placeholder-shown {
    text-overflow: ellipsis;
  }
}
</style>

