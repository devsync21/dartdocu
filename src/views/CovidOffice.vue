
<template>
  <div>
    <covidscreen2 v-if="!is_touch_device()" />
    <covidscreenMob2 v-if="is_touch_device()" />
  </div>
</template>
<script>
import covidscreen2 from "@/components/document/covidscreen2.vue";
import covidscreenMob2 from "@/components/document/covidscreenMob2.vue";

export default {
  components: {
    covidscreen2,
    covidscreenMob2
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