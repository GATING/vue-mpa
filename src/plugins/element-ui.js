import {
  Input,
  Button,
  Form,
  FormItem,
  Avatar,
  Container,
  Header,
  Footer,
  Main,
  Menu,
  MenuItem,
  Submenu,
  Card,
  Table,
  TableColumn,
  Pagination,
  Row,
  Col,
  Result,
  Loading,
  MessageBox,
  Message,
} from 'element-ui'

const components = [
  Input,
  Button,
  Form,
  FormItem,
  Avatar,
  Container,
  Header,
  Footer,
  Main,
  Menu,
  MenuItem,
  Submenu,
  Card,
  Table,
  TableColumn,
  Pagination,
  Row,
  Col,
  Result,
]
export default {
  install(Vue, options) {
    Vue.use(Loading.directive)

    components.forEach(comp => {
      Vue.use(comp)
    })

    Vue.prototype.$loading = Loading.service
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$message = Message
    Vue.prototype.$ELEMENT = options
  },
}
