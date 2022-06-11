
<template>
  <div>
    <covidscreenoffice v-if="!is_touch_device()" />
    <covidscreenofficeMob v-if="is_touch_device()" />
  </div>
</template>
<script>
import covidscreenoffice from "@/components/document/covidscreenoffice.vue";
import covidscreenofficeMob from "@/components/document/covidscreenofficeMob.vue";

export default {
  components: {
    covidscreenoffice,
    covidscreenofficeMob,
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
    },
  },
  created() {
    var mob = this.is_touch_device();
  },
};
</script>