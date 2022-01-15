<template>
  <div class="poster-card">
    <img :src="thumbSrc" />

    <p>{{ posterCategory }}</p>
  </div>
</template>

<script>
export default {
  name: "PosterCard",
  data() {
    return {};
  },
  props: {
    thumbSrc: String,
    posterCategory: String,
    thumbSrcLarge: String,
  },
  emits: {

 
  },


};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.poster-card {
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 370px;
  background: rgb(255, 255, 255);
  min-height: 220px;
  padding: 15px;
  box-shadow: 2px 2px 4px rgb(9, 5, 48);
  box-sizing: border-box;
}
.poster-card__img {
  width: 300px;
  height: 400px;
  margin-bottom: 20px;
}
.poster-card__name {
  margin: 0;
  font-size: 18px;
  color: rgb(4, 0, 240);
}
</style>
