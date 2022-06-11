
<template>
  <div>
    <covidscreen v-if="!is_touch_device()" />
    <covidscreenMob v-if="is_touch_device()" />
  </div>
</template>
<script>
import covidscreen from "@/components/document/covidscreen.vue";
import covidscreenMob from "@/components/document/covidscreenMob.vue";

export default {
  components: {
    covidscreen,
    covidscreenMob
  },
  methods: {
    is_touch_device() {
      try {
        document.createEvent("TouchEvent");
        this.$store.commit("mobcheck", true);
        return true;
      } catch (e) {
        return false;
      }
    }
  },
  created() {
    var mob = this.is_touch_device();
  }
};
</script>