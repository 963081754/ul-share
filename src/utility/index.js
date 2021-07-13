function throttle (func, wait) {
    let lastTime = null
    let timeout
    let newestArguments
    return function () {
        // console.log(1)
        newestArguments = arguments // 始终使用最新的 arguments
        let context = this
        let now = new Date()
        // 如果上次执行的时间和这次触发的时间大于一个执行周期，则执行
        if (now - lastTime - wait > 0) {        
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            } // 如果之前有了定时任务则清除
            func.apply(context, newestArguments)
            lastTime = now
            // console.log(2)
        } else if (!timeout) {
            timeout = setTimeout(() => {          
                // console.log(3)
                func.apply(context, newestArguments) // 改变执行上下文环境
            }, wait)
        }
    }
}

export {
    throttle
}