import { mergeAttributes, Node } from '@tiptap/core';

export interface DynaPassOptions {
  HTMLAttributes: Record<string, any>,
}

export interface DynaPassStorage {
  encryptedText: string,
}



declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    paragraph: {
      /**
       * Toggle a paragraph
       */
      setPassword: () => ReturnType,
    }
  }
}

export const DynaPass = Node.create<DynaPassOptions, DynaPassStorage>({
  name: 'dynapass',

  priority: 1001,

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

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [
      { tag: 'dynapass' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['dynapass', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setPassword: () => ({ commands }) => {
        return commands.setNode(this.name)
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Alt-p': () => this.editor.commands.setPassword(),
    }
  },
})