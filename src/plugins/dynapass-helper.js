import { mergeAttributes, Node, Mark } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import DynapassView from '../components/editor/DynapassView.vue'

export const DynaPassNode = Node.create({
  name: 'dynapassview',

  priority: 1001,
  atom: false,
  inline: false,
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
      { tag: 'dynapassview' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['dynapassview', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setPasswordView: () => ({ commands }) => {
        return commands.setNode(this.name)
      },
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(DynapassView);
  },

  addKeyboardShortcuts() {
    return {
      'Alt-p': () => this.editor.commands.setPassword(),
    }
  },
})