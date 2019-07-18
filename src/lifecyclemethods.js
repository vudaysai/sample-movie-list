import React, { Component } from 'react';
import './App.css';
class Lifecyclemethods extends Component {

    constructor(props) {
        super(props);
        console.log("constructor")
    }

    componentWillMount() {

        console.log("componentWillMount ");
    }
    componentDidMount() {

        console.log("componentDidMount")
    }


    shouldComponentUpdate(nextProps, nextState) {
        debugger
        console.log("shouldComponentUpdate");
        return true;
    }
    componentWillUpdate() {
        debugger
        console.log("componentWillUpdate")
    }

    componentDidUpdate() {
        debugger
        console.log("componentDidUpdate")
    }
    componentWillUnmount() {
        debugger
        console.log("componentWillUnmount")
    }

    render() {
        return (
            <div>


            </div>

        )
    }
}
export default Lifecyclemethods;