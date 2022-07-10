<template>
  <v-app>
    <v-app-bar height="48" color="grey lighten-5" app>
      <button-icon title="New" iconName="mdi-note-plus" />
      <button-icon title="Open" iconName="mdi-folder-open" @click="openFile" />
      <button-icon title="Import" iconName="mdi-file-import" @click="importFile"/>
      <button-icon title="Save" iconName="mdi-content-save" @click="saveFile" />
      <button-icon title="Cut" iconName="mdi-content-cut" />
      <button-icon title="Copy" iconName="mdi-content-copy" />
      <button-icon title="Paste" iconName="mdi-content-paste" />
      <button-icon title="Secure" iconName="mdi-lock" />
      <v-divider vertical class="spacer"></v-divider>
      <button-icon
        iconName="mdi-format-bold" 
        toggleBtn="true"
        @click="toggleBold"
      />
    </v-app-bar>
    <v-main>
      <tiny-mce @editorMounted="editorMounted" />
    </v-main>
  </v-app>
</template>

<script>
import ButtonIcon from "./ButtonIcon";
import TinyMce from "./editor/TextEditor.vue";
import { open, save } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
import { parseTextAsHtml } from "../js/util";

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
    editorMounted(editor) {
      this.activeEditor = editor;
    },
    openFile() {
      open({
        multiple: false,
        filters: [
          {
            name: "Secure Text",
            extensions: ["stxt"],
          },
        ],
      }).then((selected) => {
        invoke("read_file", { path: selected }).then((content) => {
          this.activeEditor.commands.setContent(content);
        });
        this.activeEditor.file = selected;
      });
    },
    importFile() {
      open({
        multiple: false,
        filters: [
          {
            name: "Text",
            extensions: ["txt"],
          },
        ],
      }).then((selected) => {
        invoke("read_file", { path: selected }).then((content) => {
          console.log('text ', content);
          console.log('parsed html ', parseTextAsHtml(content));
          this.activeEditor.commands.setContent(parseTextAsHtml(content));
        });
        this.activeEditor.file = selected;
      });
    },
    saveFile() {
      var path = this.activeEditor.file;
      if (path) {
        this.saveToDisk(path);
        return;
      }

      save({
        filters: [
          {
            name: "Secure Text",
            extensions: ["stxt"],
          },
        ],
      }).then((selected) => {
        this.saveToDisk(selected);
      });
    },
    saveToDisk(path) {
      invoke("save_file", {
        path: path,
        content: this.activeEditor.getHTML(),
      }).then((stat) => console.log(stat));
    },
  },
};
</script>

<style>
.spacer {
  padding-left: 10px;
  margin-right: 10px !important;
}
</style>