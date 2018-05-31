<script>
const INIT = 0
const INPUT = 1
const CHANGED = 2

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    setup: {
      type: Function,
      default () {}
    },
    setting: {
      type: Object,
      default () {
        return {
        }
      }
    },
    cur: {
      type: Number,
      default: CHANGED
    }
  },
  render (createElement) {
    return createElement('div', {
      attrs: {
        id: this.id
      }
    })
  },
  data () {
    return {
      id: 'vue-tinymce-' + Date.now(),
      editor: null,
      status: INIT,
      backup: ''
    }
  },
  watch: {
    value (val) {
      // console.log('value change', val, this.status)
      console.log('value' + val)
      console.log('status' + this.status)
      if (this.status === CHANGED) {
        this.status = INPUT
        return this.status
      }
      if (!this.editor || !this.editor.initialized) return // fix editor plugin is loading and set content will throw error.
      this.editor.setContent(val)
    },
    cur (val) {
      console.log('curstatus' + this.status)
      this.status = val
    }
  },
  created () {
    if (typeof tinymce === 'undefined') throw new Error('tinymce undefined')
  },
  mounted () {
    const setting = Object.assign({},
      this.setting,
      {
        selector: '#' + this.id,
        setup: (editor) => {
          this.setup(editor)
          this.editor = editor
          // console.log('setup')
          editor.on('init', () => {
            // console.log('init', this.value)
            editor.setContent(this.value)
            editor.on('input change undo redo execCommand KeyUp', () => {
              if (this.status === INPUT || this.status === INIT) {
                this.status = CHANGED
                return this.status
              }
              this.$emit('input', editor.getContent())
              console.log('editor change', editor.getContent())
            })
            editor.on('NodeChange', () => {
              this.$emit('input', editor.getContent())
            })
            editor.on('blur', () => {
              this.status = INPUT
            })
          })
        }
      }
    )
    window.tinymce.init(setting)
  },
  beforeDestroy () {
    this.editor.remove()
  }
}
</script>
