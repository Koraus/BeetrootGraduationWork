<template>
  <div v-if="isOpen" class="bg-drop" @click="close">
    <div class="popup-window">
  
      <img class="popup-window__img" :src="item.path" alt="" referrerPolicy="no-referrer" />
      <slot> </slot>
<!-- 
      <button @click="close" class="popup-btn-esc">Esc</button> -->

    </div>
  </div>
</template>
<script>
export default {
  name: "PopupWindow",
  data() {
    return {};
  },
  props: {
    // testEvent : String,
    item: Object,
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    ok: null,
    a: null,
    // testEvent: null,
  },
  methods: {
    close() {
      this.$emit("a");
    },
    log() {
      console.log('Лог зпрацював');
      this.$emit("testEvent", { test : 'testEv' });
    },
  },
};
</script>

<style scoped lang="scss">
.bg-drop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.562);
  z-index: 100;
}
.popup-window {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  height: 86%;
  background: #F4F4F4;
  border-radius: 16px;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  z-index: 101;
  padding: 10px;
}





.popup-window::after{
position: absolute;
content: url('../img/popupEsc.svg');
top: 10px;
right: 10px;

}
.popup-window__img {
  object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 16px;
}



</style>

