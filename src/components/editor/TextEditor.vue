<template>
  <div id="app">
    <editor-content :editor="editor" />
  </div>
</template>

 <script>
import { Editor, EditorContent, Extension } from "@tiptap/vue-2";
import { DynaPass } from '../../plugins/dynapass'
import { DynaPassNode } from '../../plugins/dynapass-helper.js'
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
    let self = this;

    //Will be changed in future. Will override Regular Enter.
    let CustomHardBreak = Extension.create({
          priority: 10001,
          name: 'NewLine',
          addKeyboardShortcuts() {
            return {
              'Alt-Enter': () => {
                self.editor.commands.setHardBreak();
              },
            };
          },
        });

    this.editor = new Editor({
      content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
      extensions: [
        StarterKit,
        CustomHardBreak,
        DynaPass,
        DynaPassNode,
      ]
        
    });
    this.$emit("editorMounted", this.editor);
  },
};
</script>

<style >
.ProseMirror {
  min-height: calc(100vh - 50px);
  width: 100vw;
  overflow: auto;
}
</style>