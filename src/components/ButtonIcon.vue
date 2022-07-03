<template>
  <div class="buttonContainer">
    <v-btn
      :class="toggle && toggleBtn ? 'active' : ''"
      small
      min-width="40"
      width="40"
      class="ma-2"
      @click="buttonClick"
    >
      <v-icon centered light>
        {{ iconName }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ["iconName", "toggleBtn"],
  data() {
    return {
      toggle: false,
    };
  },
  methods: {
    buttonClick() {
      this.$emit("click");
      this.toggle = !this.toggle;
    },
  },
};
</script>

<style scoped>
.theme--light.v-btn.v-btn--has-bg.active{
  background-color: darkgray;
}
</style>