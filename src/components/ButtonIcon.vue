<template>
  <div class="text-center d-flex align-center justify-space-around">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :class="toggle && toggleBtn ? 'active' : ''"
          small
          min-width="40"
          width="40"
          class="ma-2"
          @click="buttonClick"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon centered light>
            {{ iconName }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{title}}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  props: ["iconName", "toggleBtn", "title"],
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
.theme--light.v-btn.v-btn--has-bg.active {
  background-color: darkgray;
}
</style>