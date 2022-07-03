<template>
  <div id="app">
    <editor-content :editor="editor" />
  </div>
</template>

 <script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";

export default {
  name: "app",
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor({
      content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
      extensions: [
          StarterKit
      ],

    });
    this.$emit("editorMounted", this.editor);
  },
};
</script>

<style >
.ProseMirror {        
  min-height: 500px;
  overflow: auto;
}
  
</style>