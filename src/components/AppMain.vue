<template>
  <div>
    <v-app-bar height="48" color="deep-purple accent-4">
      <button-icon iconName="mdi-note-plus" @click="openFile" />
      <button-icon iconName="mdi-content-save" @click="saveFile" />
      <button-icon iconName="mdi-reload" />
      <button-icon iconName="mdi-content-cut" />
      <button-icon iconName="mdi-content-copy" />
      <button-icon iconName="mdi-content-paste" />
      <button-icon iconName="mdi-lock" />
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
  </div>
</template>

<script>
import ButtonIcon from "./ButtonIcon";
import TinyMce from "./editor/TextEditor.vue";
import { open, save } from "@tauri-apps/api/dialog";
import { invoke } from '@tauri-apps/api/tauri'

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
            name: "text",
            extensions: ["txt"],
          },
        ],
      }).then((selected) => {
        
        console.log("Selected file", selected);
        invoke('read_file', { path: selected}).
           then(content=> {
             this.activeEditor.commands.setContent(content);
             });
        this.activeEditor.file = selected;
      });
    },
    saveFile() {
      var path = this.activeEditor.file;
      if (path){
        this.saveToDisk(path);
        return
      }

      save({
        filters: [
          {
            name: "text",
            extensions: ["txt"]
          },
        ]
      }).then((selected) => {
        this.saveToDisk(selected)
      });
      
      
    },
    saveToDisk(path){
      invoke('save_file', { path: path, 
                            content: this.activeEditor.getHTML()}).
          then(stat=> console.log(stat))
    }
  },
};
</script>

<style>
.spacer {
  padding-left: 10px;
  margin-right: 10px !important;
}
</style>