
<template>
  <div v-if="isOpen" class="back-drop" @click.stop="clsoe">
    <div class="popup-window">
      <h1>Popup!</h1>
      <p>
        Info
        <slot > </slot>
      </p>
      <div class="popup-window__footer">
           <button @click="close">Отмена</button>
          &nbsp; &nbsp; &nbsp;
          <button @click="confirm">Ok</button>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "PopupWindow",
    props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    ok: null,
    close: null,
  },

  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },

  methods: {
    handleKeydown(e) {
      if (this.isOpen && e.key === "Escape") {
        this.close();
      }
    },

    close() {
      this.$emit("close");
    },
    confirm() {
      this.$emit("ok");
    },
  },
};

</script>
<style>
.back-drop{  
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;}

.popup-window{
  position: fixed;
  top: 50px;
  padding: 20px;
  left: 50%;
  transform: translateX(-50%); 
  z-index: 101;
  background-color: rgb(227, 249, 255);
  border-radius: 5px;
}
</style>
