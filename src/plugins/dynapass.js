import { Node } from '@tiptap/core'

export const CustomNode = Node.create({
    parseHTML() {
        return [
            { tag: 'input' },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['input', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    },
})