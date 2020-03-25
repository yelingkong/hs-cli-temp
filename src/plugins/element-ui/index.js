import 'element-ui/lib/theme-chalk/index.css'

import Vue from 'vue'

import {
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Button,
  ButtonGroup,
  Select,
  Option,
  OptionGroup,
  Tree,
  Table,
  TableColumn,
  Form,
  FormItem,
  TabPane,
  Tabs,
  Row,
  Col,
  Upload,
  Collapse,
  CollapseItem,
  Transfer,
  MessageBox,
  Message,
  Notification
} from 'element-ui'

Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Tree)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Transfer)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
