<template>
  <div class="pfilter"></div>
</template>

<script>
export default {
  name: "PosterCard",
  
  data() {
    return {
      posterName: "NameCard",
      year: "1930",
      price: "30",
      currency: "UAH",
    };
  },
  props: {
    msg: String,
  },
};
</script>


<style scoped lang="scss">
</style>