<template>
  <div v-if="editor" class="v-wysiwyg">
    <template v-if="displayHtml">
      <div class="toolbar">
        <div class="button-group gap"/>
        <div class="button-group">
          <button type="button"
                  class="mdi mdi-code-tags is-active"
                  aria-pressed="true"
                  :title="$vui.i18n().wysiwyg.viewsource"
                  :aria-label="$vui.i18n().wysiwyg.viewsource"
                  @click="commands.viewsource.action"></button>
        </div>
      </div>
      <div class="grow-wrap" :data-replicated-value="model">
        <textarea v-model="model" class="editor"/>
      </div>
    </template>
    <template v-else>
      <div class="toolbar">
        <div v-for="btnGroup in toolbar" class="button-group" :class="{'gap' : btnGroup.length === 0}">
          <button v-for="btn in btnGroup"
                 type="button" :key="btn"
                 :class="[commands[btn].class, {'is-active': commands[btn].active?.(editor)}]"
                 :aria-pressed="commands[btn].active?.(editor)"
                 :disabled="commands[btn].disabled?.(editor)"
                 :aria-disabled="commands[btn].disabled?.(editor)"
                 :title="$vui.i18n().wysiwyg[btn]"
                 :aria-label="$vui.i18n().wysiwyg[btn]"
                 @click="commands[btn].action(editor)"></button>
        </div>
      </div>
      <editor-content :editor="editor" class="editor"></editor-content>
    </template>
  </div>
</template>

<script setup>
  import { watch, ref } from 'vue'

  // import mandatory tiptap components
  import { useEditor, EditorContent } from '@tiptap/vue-3'
  import Document from '@tiptap/extension-document'
  import Paragraph from '@tiptap/extension-paragraph'
  import Text from '@tiptap/extension-text'
  import History from '@tiptap/extension-history'
  import HardBreak from '@tiptap/extension-hard-break'
  import Gapcursor from '@tiptap/extension-gapcursor'
  
  // import extensions
  import Bold from '@tiptap/extension-bold'
  import Italic from '@tiptap/extension-italic'
  import Underline from '@tiptap/extension-underline'
  import Strike from '@tiptap/extension-strike'
  import ListItem from '@tiptap/extension-list-item'
  import BulletList from '@tiptap/extension-bullet-list'
  import OrderedList from '@tiptap/extension-ordered-list'
  import ListKeymap from '@tiptap/extension-list-keymap'
  import Heading from '@tiptap/extension-heading'
  import Blockquote from '@tiptap/extension-blockquote'
  import HorizontalRule from '@tiptap/extension-horizontal-rule'
  import { TextAlign as RawTextAlign } from '@tiptap/extension-text-align'
  import { Link as RawLink }from '@tiptap/extension-link'
  import Subscript from '@tiptap/extension-subscript'
  import Superscript from '@tiptap/extension-superscript'
  
  const TextAlign = RawTextAlign.configure({
    types: ['heading', 'paragraph'],
  })
  
  // Consider exposing additional configuration, for example for domain whitelist https://tiptap.dev/docs/editor/extensions/marks/link#validate
  const Link = RawLink.configure({
    openOnClick: false,
  })
  
  let displayHtml = ref(false);
  
  const model = defineModel();
  
  const props = defineProps({
    toolbar: {
      type: Array,
      default: [['bold', 'italic', 'underline'], ['unordered', 'ordered', 'outdent', 'indent'], [], ['undo', 'redo'], ['viewsource']]
    }
  })


  const commands = {
    'bold' : {
      class: 'mdi mdi-format-bold',
      action: (editor) => editor.chain().focus().toggleBold().run(),
      active: (editor) => editor.isActive('bold'),
      extensions: [Bold]
    },
    'italic' : {
      class: 'mdi mdi-format-italic',
      action: (editor) => editor.chain().focus().toggleItalic().run(),
      active: (editor) => editor.isActive('italic'),
      extensions: [Italic]
    },
    'underline' : {
      class: 'mdi mdi-format-underline',
      action: (editor) => editor.chain().focus().toggleUnderline().run(),
      active: (editor) => editor.isActive('underline'),
      extensions: [Underline]
    },
    'strike' : {
      class: 'mdi mdi-format-strikethrough-variant',
      action: (editor) => editor.chain().focus().toggleStrike().run(),
      active: (editor) => editor.isActive('strike'),
      extensions: [Strike]
    },
    'unordered' : {
      class: 'mdi mdi-format-list-bulleted',
      action: (editor) => editor.chain().focus().toggleBulletList().run(),
      active: (editor) => editor.isActive('bulletList'),
      extensions: [BulletList, ListItem, ListKeymap]
    },
    'ordered' : {
      class: 'mdi mdi-format-list-numbered',
      action: (editor) => editor.chain().focus().toggleOrderedList().run(),
      active: (editor) => editor.isActive('orderedList'),
      extensions: [OrderedList, ListItem, ListKeymap]
    },
    'outdent' : {
      class: 'mdi mdi-format-indent-decrease',
      action: (editor) => editor.chain().focus().liftListItem('listItem').run(),
      disabled: (editor) => !editor.can().liftListItem('listItem'),
      extensions: [ListItem]
    },
    'indent' : {
      class: 'mdi mdi-format-indent-increase',
      action: (editor) => editor.chain().focus().sinkListItem('listItem').run(),
      disabled: (editor) => !editor.can().sinkListItem('listItem'),
      extensions: [ListItem]
    },
    'h1' : {
      class: 'mdi mdi-format-header-1',
      action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: (editor) => editor.isActive('heading', { level: 1 }),
      extensions: [Heading]
    },
    'h2' : {
      class: 'mdi mdi-format-header-2',
      action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: (editor) => editor.isActive('heading', { level: 2 }),
      extensions: [Heading]
    },
    'h3' : {
      class: 'mdi mdi-format-header-3',
      action: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: (editor) => editor.isActive('heading', { level: 3 }),
      extensions: [Heading]
    },
    'h4' : {
      class: 'mdi mdi-format-header-4',
      action: (editor) => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      active: (editor) => editor.isActive('heading', { level: 4 }),
      extensions: [Heading]
    },
    'h5' : {
      class: 'mdi mdi-format-header-5',
      action: (editor) => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      active: (editor) => editor.isActive('heading', { level: 5 }),
      extensions: [Heading]
    },
    'h6' : {
      class: 'mdi mdi-format-header-6',
      action: (editor) => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      active: (editor) => editor.isActive('heading', { level: 6 }),
      extensions: [Heading]
    },
    'quote' : {
      class: 'mdi mdi-format-quote-open',
      action: (editor) => editor.chain().focus().toggleBlockquote().run(),
      active: (editor) => editor.isActive('blockquote'),
      disabled: (editor) => !editor.can().toggleBlockquote(),
      extensions: [Blockquote]
    },
    'hardBreak' : {
      class: 'mdi mdi-keyboard-return',
      action: (editor) => editor.chain().focus().setHardBreak().run(),
    },
    'hr' : {
      class: 'mdi mdi-minus',
      action: (editor) => editor.chain().focus().setHorizontalRule().run(),
      extensions: [HorizontalRule]
    },
    'left' : {
      class: 'mdi mdi-format-align-left',
      action: (editor) => editor.chain().focus().setTextAlign('left').run(),
      active: (editor) => editor.isActive('textAlign', { align: 'left' }),
      extensions: [TextAlign]
    },
    'center' : {
      class: 'mdi mdi-format-align-center',
      action: (editor) => editor.chain().focus().setTextAlign('center').run(),
      active: (editor) => editor.isActive('textAlign', { align: 'center' }),
      extensions: [TextAlign]
    },
    'right' : {
      class: 'mdi mdi-format-align-right',
      action: (editor) => editor.chain().focus().setTextAlign('right').run(),
      active: (editor) => editor.isActive('textAlign', { align: 'right' }),
      extensions: [TextAlign]
    },
    'justify' : {
      class: 'mdi mdi-format-align-justify',
      action: (editor) => editor.chain().focus().setTextAlign('justify').run(),
      active: (editor) => editor.isActive('textAlign', { align: 'justify' }),
      extensions: [TextAlign]
    },
    'link' : {
      class: 'mdi mdi-link',
      action: (editor) => setLink(editor),
      active: (editor) => editor.isActive('link'),
      extensions: [Link]
    },
    'unlink' : {
      class: 'mdi mdi-link-off',
      action: (editor) => editor.chain().focus().unsetLink().run(),
      disabled: (editor) => !editor.isActive('link'),
      extensions: [Link]
    },
    'superscript' : {
      class: 'mdi mdi-format-superscript',
      action: (editor) => {editor.chain().unsetSubscript?.().run(); editor.chain().focus().toggleSuperscript().run()},
      active: (editor) => editor.isActive('superscript'),
      extensions: [Superscript]
    },
    'subscript' : {
      class: 'mdi mdi-format-subscript',
      action: (editor) => {editor.chain().unsetSuperscript?.().run(); editor.chain().focus().toggleSubscript().run()},
      active: (editor) => editor.isActive('subscript'),
      extensions: [Subscript]
    },
    'removeFormat' : {
      class: 'mdi mdi-format-clear',
      action: (editor) => editor.chain().focus().unsetAllMarks().run()
    },
    'undo' : {
      class: 'mdi mdi-undo',
      action: (editor) => editor.chain().focus().undo().run(),
      disabled: (editor) => !editor.can().undo()
    },
    'redo' : {
      class: 'mdi mdi-redo',
      action: (editor) => editor.chain().focus().redo().run(),
      disabled: (editor) => !editor.can().redo()
    },
    'viewsource' : {
      class: 'mdi mdi-code-tags',
      action: () => displayHtml.value = !displayHtml.value
    }
    
  }
  

  const activeExtensions = props.toolbar
                             .flat()
                             .flatMap(btn => commands[btn].extensions)
                             .filter((value, index, self) => self.indexOf(value) === index); // remove duplicates
  
  const editor = useEditor({
    content: model.value,
    extensions: [Document, Paragraph, Text, History, HardBreak, Gapcursor, ...activeExtensions],
    onUpdate: function({editor}) {
        model.value = editor.getHTML();
    }
  })
  
  watch(model, (newValue, oldValue) => {
    if (newValue !== editor?.value?.getHTML()) {
      // outer model change
      editor?.value?.commands.setContent(model.value);
    } else {
      // inner model change, do nothing 
    }
  })
  
  const setLink = function(editor) {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .unsetLink()
        .run()

      return
    }

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url.startsWith('http://') ? url : `http://${url}` })
      .run()
    };
</script>


<style lang="scss">
  .v-wysiwyg {
  
    width: 100%;
  
    .editor {
      display: flex;
    }
    
    .tiptap {
      outline-style: none !important;
      width: 100%;
    }
    
    .toolbar {
      display: flex;
      flex-wrap: nowrap;
      border: 1px solid #ccc;
      padding: 0.3rem;
      font-size: 18px;
      
      .button-group {
        position: relative;
        margin: 0 4px;
      }
      
      .button-group.gap {
        margin-left: auto;
      }
    
      .button-group + .button-group:not(.gap)::before {
        content: "";
        position: absolute;
        left: -4px;
        top: 4px;
        bottom: 4px;
        width: 1px;
        background: rgba(0, 0, 0, 0.12);
      }
      
      button {
        height: 27px;
        width: 27px;
        margin: 0 4px;
        padding: 0;
      }
      
      button.is-active {
        color: blue;
        outline: 1px solid blue;
      }
    }
    
    .editor {
      border: 1px solid #ccc;
      padding: 0.5rem;
    }
    
    // textera autogrow : https://stackoverflow.com/questions/17731083/how-to-autogrow-a-textarea-with-css
    .grow-wrap {
      /* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
      display: grid;
    }
    
    .grow-wrap::after {
      /* Note the weird space! Needed to preventy jumpy behavior */
      content: attr(data-replicated-value) " ";
      /* This is how textarea text behaves */
      white-space: pre-wrap;
      /* Hidden from view, clicks, and screen readers */
      visibility: hidden;
    }
    
    .grow-wrap>textarea {
      /* You could leave this, but after a user resizes, then it ruins the auto sizing */
      resize: none;
      /* Firefox shows scrollbar on growth, you can hide like this. */
      overflow: hidden;
    }
    
    .grow-wrap>textarea,
    .grow-wrap::after {
      /* Identical styling required!! */
      padding: 0.5rem;
      font: inherit;
      /* Place on top of each other */
      grid-area: 1 / 1 / 2 / 2;
      outline: none;
    }
    
  }
</style>