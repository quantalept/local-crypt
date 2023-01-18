import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core'

export class EditorSmartButton {
    id;
    name;
    text;
    hint;
    deleteMessage;

    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.text = options.text;
        this.hint = options.hint;
        this.deleteMessage = options.deleteMessage;
    }
}


export const SmartButton = Node.create({
    priority: 1000,
    name: 'smartButton',

    addOptions() {
        return {
            HTMLAttributes: {},
            smartButtons: []
        }
    }, 

    group: 'block',

    inline: false,
    selectable: true,
    draggable: true,

    atom: false,
    content: "text*",

    // disallows all marks
    marks: '',
     
    addCommands() {
        return {
            insertSmartButton: (smartButton, options) => ({ commands }) => {
                return commands.insertContent({ type: this.name, attrs: { id: smartButton.id }, content: [{ type: "text", text: smartButton.text }] }, options)
            },
        }
    },

    addInputRules() {
        return this.options.smartButtons.map(s => {
            return nodeInputRule({
                find: new RegExp(`\\{\\{${s.id}\\}\\}$`),
                type: this.type,
                getAttributes: () => { return { id: s.id } }
            })
        })
    },

    addAttributes() {
        return {
            id: {
                default: null,
                parseHTML: element => element.getAttribute('data-id'),
                renderHTML: attributes => {
                    if (!attributes.id) {
                        return {}
                    }

                    return {
                        'data-id': attributes.id,
                    }
                },
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: `div[data-type="${this.name}"]`,
            },
        ]
    },

    renderHTML({ node, HTMLAttributes }) {
        const button = this.options.smartButtons.find(s => s.id === node.attrs.id)
        return [
            // We need the extra div because display: block is required (and button should be display inline block)
            'div',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            mergeAttributes({ 'data-type': this.name }, this.options.HTMLAttributes, HTMLAttributes),
            [
                "span",
                mergeAttributes({ href: "{{"+(button?.id ?? "")+"}}", class: "button primary" }, this.options.HTMLAttributes, HTMLAttributes),
                0
            ],
        ]
    },

    /**
     * Text when copying to the clipboard
     */
    renderText({ node }) {
        return "{{"+node.attrs.id+"}}"
    },
})