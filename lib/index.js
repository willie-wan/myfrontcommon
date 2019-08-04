import myDirective from './directive'
import myMixin from './mixin'
import commonMth from './commonMth'
import comments from './component'
const myPlugin = {
  install(Vue, options) {
    // 自定义指令
    myDirective(Vue)

    // 混入
    myMixin(Vue)

    // 公共方法
    commonMth(Vue)

    // 全局组件
    comments(Vue)
  }
}
export default myPlugin