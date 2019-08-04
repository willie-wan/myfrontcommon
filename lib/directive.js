export default function (Vue) {
  // 滚动区域内容发生变化保持滚动到最底部
  Vue.directive('scroll-fix-bottom', {
    update(el, binding, vnode, oldVnode) {
      if (el.childNodes && el.childNodes.length === 1) {
        Vue.nextTick()
          .then(() => {
            // DOM 更新了
            el.scrollTop = el.childNodes[0].offsetHeight
          })
      }
    }
  })
}