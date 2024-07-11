
<template>
  <div>
    <!-- <ConsentForm v-if="!is_touch_device()" />
    <ConsentFormMob v-if="is_touch_device()" /> -->
    
    <ConsentForm/>

  </div>
</template>
<script>
import ConsentForm from "@/components/document/ConsentForm.vue";
// import ConsentFormMob from "@/components/document/ConsentFormMob.vue";

export default {
  components: {
    ConsentForm,
    // ConsentFormMob
  },
  methods: {
    // is_touch_device() {
    //   try {
    //     document.createEvent("TouchEvent");
    //     this.$store.commit("mobcheck", true);
    //     return true;
    //   } catch (e) {
    //     return false;
    //   }
    // }
  },
  // created() {
  //   var mob = this.is_touch_device();
  // }
};
</script>