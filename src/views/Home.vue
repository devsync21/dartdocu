<template>
  <div class="home">
    <h1>D'Art Document Center</h1>
    <h2>Choose Document</h2>
    <div class="menuBox">
      <v-btn
        size="x-large"
        color="blue"
        style="height:100px"
        @click="handleClick1()"
      >
        <span class="white--text"> New Patient Form </span></v-btn
      >
      <div class="sp"></div>
      <v-btn
        size="x-large"
        color="blue"
        style="height:100px"
        @click="handleClick2()"
      >
        <span class="white--text"> Consent Form </span></v-btn
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  methods: {
    handleClick1() {
      this.$router.push("/npform");
    },
    handleClick2() {
      this.$router.push("/consentform");
    }
  }
};
</script>

<style scoped>
.menuBox {
  margin-top: 30px;
  width: 500px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.sp {
  height: 30px;
}
</style>
