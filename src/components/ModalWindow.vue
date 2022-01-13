<template>
  <div class="modal-window">
  
        <img  :src="thumbSrcLarge" class="modal-window__img"/>

        <p> {{posterCategory}}</p>

  </div>
</template>

<script>

export default {
  name: "ModalWindow",
  data() {
      return{
      }
  },
  props: {

    thumbSrcLarge: String,
    posterCategory : String, 
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal-window{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgb(0, 68, 255);
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 15px;
    box-shadow: 2px 2px 4px rgb(9, 5, 48);
    box-sizing: border-box;
    display: block;
    overflow-y: scroll;
}
.modal-window__img{
    width: 90%;
    height: auto;
    margin-bottom: 20px;
    

}

</style>
