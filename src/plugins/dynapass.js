import { mergeAttributes, Node } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import DynapassView from '../components/editor/DynapassView.vue'

export const DynaPass = Node.create({
  name: 'dynapass',

  priority: 1001,
  atom: false,
  group: 'block',
  content: 'text*',


  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },
  addStorage() {
    return {
      encryptedText: "",
    }
  },

  

  parseHTML() {
    return [
      { tag: 'dynapass' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setPassword: (text) => ({ commands }) => {
        var content = [{
          type: "dynapassview",
          content: [
            {
              type: 'text',
              text: '***********',
            }
          ]
        }];
        return commands.insertContent(content);
      },
    }
  },
  addKeyboardShortcuts() {
    return {
      'Alt-p': () => this.editor.commands.setPassword(),
    }
  },
})