<template>
  <div>
    <v-app-bar height="48" color="deep-purple accent-4">
      <button-icon iconName="mdi-note-plus" />
      <button-icon iconName="mdi-content-save" />
      <button-icon iconName="mdi-reload" />
      <button-icon iconName="mdi-content-cut" />
      <button-icon iconName="mdi-content-copy" />
      <button-icon iconName="mdi-content-paste" />
      <button-icon iconName="mdi-lock" />
      <v-divider vertical class="spacer"></v-divider>
      <button-icon iconName="mdi-format-bold" toggleBtn="true" @click="toggleBold" />
    </v-app-bar>
    <v-main>
      <tiny-mce @editorMounted="editorMounted" />
    </v-main>
  </div>
</template>

<script>
import ButtonIcon from "./ButtonIcon";
import TinyMce from "./editor/TextEditor.vue";
export default {
  components: {
    ButtonIcon,
    TinyMce,
  },
  data() {
    return {
      activeEditor: null,
    };
  },
  methods: {
    toggleBold() {
      this.activeEditor.chain().focus().toggleBold().run();
    },
    editorMounted(editor){
      this.activeEditor = editor;
    },
  }
  
};
</script>

<style>
.spacer {
  padding-left: 10px;
  margin-right: 10px!important;
}
</style>