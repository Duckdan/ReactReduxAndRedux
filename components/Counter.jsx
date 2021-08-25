import React, { Component } from 'react'
import { increment, decrement } from '../redux/actions'
import { connect } from '../lib/react-redux';

class Counter extends Component {


    increment = () => {
        const { value } = this.selectOptions;
        this.props.increment(value * 1)
    }
    decrement = () => {
        const { value } = this.selectOptions;
        this.props.decrement(value * 1)
    }
    oddIncrement = () => {
        const count = this.props.count
        const { value } = this.selectOptions;
        if (count % 2 === 1) {
            this.props.increment(value * 1)
        }
    }
    incrementAsync = () => {
        setTimeout(() => {
            const { value } = this.selectOptions;
            this.props.increment(value * 1)
        }, 1000)
    }
    render() {
        console.log('counter-render-state', this.props)
        return (
            <div>
                <h2>当前值是：{this.props.count}</h2>
                <select ref={c => this.selectOptions = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
                <button onClick={this.oddIncrement}>奇数时相加</button>&nbsp;&nbsp;
                <button onClick={this.incrementAsync}>异步相加</button>
            </div>
        )
    }
}

// 函数式传递dispatch以及action
// export default connect((state) => ({
//     count: state.count
// }), (dispatch) => ({
//     increment: (number) => dispatch(increment(number)),
//     decrement: (number) => dispatch(decrement(number))
// }))(Counter)

// 对象方式传递dispatch以及action
export default connect((state) => ({
    count: state.count
}), { increment, decrement })(Counter)