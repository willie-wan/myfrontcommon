export default function (Vue) {
  Vue.mixin({
    methods: {
      // 防抖
      debounce: (func, wait = 50, immediate = true) => {
        let timer, context, args
        // 延迟执行函数
        const later = () => setTimeout(() => {
          // 延迟函数执行完毕，清空缓存的定时器序号
          timer = null
          // 延迟执行的情况下，函数会在延迟函数中执行
          // 使用到之前缓存的参数和上下文
          if (!immediate) {
            func.apply(context, args)
            context = args = null
          }
        }, wait)

        // 这里返回的函数是每次实际调用的函数
        return function (...params) {
          // 如果没有创建延迟执行函数（later），就创建一个
          if (!timer) {
            timer = later()
            // 如果是立即执行，调用函数
            // 否则缓存参数和调用上下文
            if (immediate) {
              func.apply(this, params)
            } else {
              context = this
              args = params
            }
            // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
            // 这样做延迟函数会重新计时
          } else {
            clearTimeout(timer)
            timer = later()
          }
        }
      },
      // 节流
      throttle: (func, wait, options) => {
        var context, args, result;
        var timeout = null;
        // 之前的时间戳
        var previous = 0;
        // 如果 options 没传则设为空对象
        if (!options) options = {};
        // 定时器回调函数
        var later = function () {
          // 如果设置了 leading，就将 previous 设为 0
          // 用于下面函数的第一个 if 判断
          previous = options.leading === false ? 0 : Date.now();
          // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
          timeout = null;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        };
        return function () {
          // 获得当前时间戳
          var now = Date.now();
          // 首次进入前者肯定为 true
          // 如果需要第一次不执行函数
          // 就将上次时间戳设为当前的
          // 这样在接下来计算 remaining 的值时会大于0
          if (!previous && options.leading === false) previous = now;
          // 计算剩余时间
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          // 如果当前调用已经大于上次调用时间 + wait
          // 或者用户手动调了时间
          // 如果设置了 trailing，只会进入这个条件
          // 如果没有设置 leading，那么第一次会进入这个条件
          // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
          // 其实还是会进入的，因为定时器的延时
          // 并不是准确的时间，很可能你设置了2秒
          // 但是他需要2.2秒才触发，这时候就会进入这个条件
          if (remaining <= 0 || remaining > wait) {
            // 如果存在定时器就清理掉否则会调用二次回调
            if (timeout) {
              clearTimeout(timeout);
              timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
          } else if (!timeout && options.trailing !== false) {
            // 判断是否设置了定时器和 trailing
            // 没有的话就开启一个定时器
            // 并且不能不能同时设置 leading 和 trailing
            timeout = setTimeout(later, remaining);
          }
          return result;
        };
      }
    }
  })
}