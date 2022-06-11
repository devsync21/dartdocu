
<template>
  <div>
    <NPForm v-if="!is_touch_device()" />
    <NPFormMob v-if="is_touch_device()" />
  </div>
</template>
<script>
import NPForm from "@/components/document/NPForm.vue";
import NPFormMob from "@/components/document/NPFormMob.vue";

export default {
  components: {
    NPForm,
    NPFormMob
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