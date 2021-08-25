import React, { Component } from "react"
import PropTypes from 'prop-types'


//定义Context用于祖组件与后代组件通信
const StoreContext = React.createContext()
/**
 * Provider必须要接受一个store的属性
 */
export class Provider extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    }

    render() {
        return (
            // 将外部接受到的store提供给后代组件
            <StoreContext.Provider value={this.props.store}>
                {this.props.children}
            </StoreContext.Provider>
        )
    }
}

/**
 * connect是一个高阶组件函数
 * @param {*} mapStateToProps 将state属性转化为Props 
 * @param {*} mapDispatchToProps 将dispatch转化为Props
 * @returns 
 */
export function connect(mapStateToProps, mapDispatchToProps) {
    return (UIComponent) => {
        return class ContainerComponent extends Component {
            static contextType = StoreContext;

            constructor(props, context) {
                super(props)
                const { getState, dispatch, subscribe } = context
                const stateProps = mapStateToProps(getState())
                /**
                 * 对象解构赋值给state属性值
                 */
                this.state = { ...stateProps }
                /**
                 * 将封装好的分发action的方法传递给UI组件做属性.
                 * 因为其不用更新，所以直接添加给ContainerComponent实例
                 */
                if (typeof mapDispatchToProps === 'function') {
                    this.dispatchProps = mapDispatchToProps(dispatch)
                } else {
                    this.dispatchProps = Object.keys(mapDispatchToProps).reduce((pre, key) => {
                        //第一个...args用来接收参数，第二个...args用来传递参数，从而实现参数后传
                        pre[key] = (...args) => dispatch(mapDispatchToProps[key](...args))
                        return pre
                    }, {})
                }

                /**
                 * 添加redux中state变化的监听
                 */
                subscribe(() => {
                    const stateProps = mapStateToProps(getState())
                    this.setState({ ...stateProps })
                })
            }

            render() {
                return <UIComponent {...this.state} {...this.dispatchProps} />
            }
        }
    }
}