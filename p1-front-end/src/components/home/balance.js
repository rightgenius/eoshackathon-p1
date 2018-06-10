/**
 * Created by Kael on 2018/6/9.
 */
import React from 'react'
import {getBalance} from "../../eosjs";


export default class BalanceContainer extends React.Component {
    state={
        balance:'0.0000',
    };

    componentDidMount(){
        getBalance().then(balance=>{
            this.setState({
                balance:balance
            })
        })
    }


    render() {


        return (
            <span>{
                this.state.balance
            }</span>
        )
    }
}

