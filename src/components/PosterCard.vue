<template>
  <div @click="logg()" class="poster-card">

    <span class="poster-card__category"> Category: {{item.category}}</span>
    <img class="poster-card__img" :src="thumbSrc" />
    <span class="poster-card__resolution"> Resolution: <br/> {{item.resolution}} </span>
    <span class="poster-card__views"> Views: {{item.views}} </span>
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
    isHovered: Boolean,
    item: Object,
  },
  emits: {

 
  },
  methods :{
    logg(){
      console.log(this.item)
    }
  }


};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Manrope&display=swap");
.poster-card {
  position:relative;
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  min-width: 340px;
  max-width: 520px;
  background: rgb(255, 255, 255);
  box-shadow: 2px 2px 4px rgb(9, 5, 48);
  box-sizing: border-box;
}
.poster-card__img {
  width: 100%;

}
.poster-card__name {
  margin: 0;
  font-size: 18px;
  color: rgb(4, 0, 240);
}
.poster-card__category{
  position: absolute;
  top: 15px;
  left: 15px;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.9);
  border-radius: 24px ;
  padding: 2px 10px 2px 10px;
  background-color: rgba(255, 255, 255, 0.8);
  display: none;
}


.poster-card__resolution{
  position: absolute;
  bottom: 15px;
  right: 15px;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
   color: #FFFFFF;

  display: none;
}
.poster-card__views{
  position: absolute;
  bottom: 15px;
  left: 15px;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #FFFFFF;
  border-radius: 24px ;
  padding: 2px 10px 2px 10px;
  display: none;
}

.poster-card:hover > .poster-card__category   { display: block;  z-index: 1;}
.poster-card:hover > .poster-card__resolution {  display: block;}
.poster-card:hover > .poster-card__views { display: block;}

.poster-card:hover > .poster-card__img {
  filter: brightness(0.8);
}




</style>
