<template>
  <div>
    <v-app-bar height="48" color="deep-purple accent-4">
      <button-icon iconName="mdi-note-plus" @click="openFile" />
      <button-icon iconName="mdi-content-save" @click="saveFile" />
      <button-icon iconName="mdi-reload" @click="test"/>
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
import { open } from "@tauri-apps/api/dialog";
import { save } from "@tauri-apps/api/dialog";
//import { BaseDirectory, writeTextFile} from '@tauri-apps/api/fs';
import { documentDir } from '@tauri-apps/api/path';
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
        console.log("selected file", selected);
      });
    },
    saveFile() {
      invoke('save_file', { path: '/home/andy/Documents/tauri-test/app.txt', 
                            content: this.activeEditor.getHTML()}).
          then(stat=> console.log(stat))
      
      var a = 1;
      if(a ==1){
        return
      }


      save({ multiple: false }).then((savePath) => {
        console.log("save path", savePath);
        if(savePath){
          var indexOFlastSlash = savePath.lastIndexOf("/");
          var  fileName = savePath.substring(indexOFlastSlash+1);
          var directory = savePath.substring(0, indexOFlastSlash);
          console.log('file name', fileName, directory);
          invoke('save_file', { path: savePath, content: JSON.stringify(this.activeEditor.getJSON())}).
          then(stat=> console.log(stat))
          //writeTextFile(fileName, this.activeEditor.getJSON(), { dir: BaseDirectory.Document });
        }
        
      });
    },
    test(){
      documentDir().then(path=> console.log('doc dir ', path));
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