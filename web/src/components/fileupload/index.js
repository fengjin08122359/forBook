import VueFileUpload from 'vue-file-upload'
import fileupload from './fileupload'

/* istanbul ignore next */
fileupload.install = function (Vue) {
  Vue.component('vue-file-upload', VueFileUpload)
  Vue.component(fileupload.name, fileupload)
}

export default fileupload
