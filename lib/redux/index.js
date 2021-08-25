/**
 * 自定义Store,返回一个对象
 */
export function createStore(reducer) {
    let state = reducer(undefined, { type: "redux/init@@" })
    //添加获取获取state方法
    function getState() {
        return state
    }

    //定义分发action方法
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    let listeners = []
    //定义数据更新时的回调
    function subscribe(listener) {
        listeners.push(listener)
    }

    return { getState, dispatch, subscribe }
}

/**
 * 自定义联合combineReducers
 * {
 *  count:count相关的reducer,
 *  user:user相关的reducer
 * }。
 * 因为reducers是一个对象的形式，那么通过遍历reducers的属性
 */
export function combineReducers(reducers) {
    //如果state接受到的参数是undefined，那么state参数将会使用默认值
    return (state = {}, action) => {
        return Object.keys(reducers).reduce((pre, key) => {
            //将各个reducer的运行结果封装到对象中
            pre[key] = reducers[key](state[key], action)
            return pre
        }, {})
    }
}