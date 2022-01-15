<template>
  <div v-if="isOpen" class="bg-drop" @click="close">
    <div class="popup-window">
      <h1>{{ item.category }} {{ item.resolution }}</h1>
      <img class="popup-window__img" :src="item.path" alt="" />
      <slot> </slot>
      <button @click="close" class="popup-btn-esc">Esc</button>
      <button @click="log" class="popup-btn-ok">Ok</button>
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  height: 90%;
  background: rgb(2, 7, 77);
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  z-index: 101;
}
.popup-window__img {
    max-width: 90%;
    max-width: 90%;

  height: auto;
  width: auto;
  border: green 2px solid;
}
</style>

