import FormContainer from './form/form.vue'
import InputEditor from './form/input.vue'
import SelectEditor from './form/select.vue'
import RadioEditor from './form/radio.vue'
import DateEditor from './form/date.vue'
import TextEditor from './form/text.vue'
import FileUploadEditor from './form/fileUpload/index.vue'
import RichEditor from './form/richText.vue'
import JsonEditor from './form/jsonText.vue'
import TimelineEditor from './form/timeline.vue'
import TableContainer from './table.vue'
import SearchContainer from './search.vue'
import DialogContainer from './dialog.vue'
import DetailContainer from './detail.vue'



const components = [
    FormContainer,
    InputEditor,
    SelectEditor,
    RadioEditor,
    DateEditor,
    TextEditor,
    FileUploadEditor,
    RichEditor,
    JsonEditor,
    TimelineEditor,
    TableContainer,
    SearchContainer,
    DialogContainer,
    DetailContainer
]

const install = (Vue) => {
    components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}