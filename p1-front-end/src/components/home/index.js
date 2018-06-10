/**
 * Created by Kael on 2018/6/9.
 */
import React from 'react'
import PayOneContainer from "../../common/PayOneContainer/PayOneContainer";
import FlexContainer from "../../common/FlexContainer";
import {hashHistory} from 'react-router';
import {getAccountName} from "../../util";
import {Token_Symbol} from "../../eosjs/conststr";
import {getBalance} from "../../eosjs";


export default class HomeContainer extends React.Component {
    state={
        balance:'',
    }

    componentDidMount(){
        getBalance().then(balance=>{
            this.setState({
                balance:balance
            })
        })
    }


    render() {
        const {balance}=this.state;

        return (
            <PayOneContainer className='linear-background4 container' navEnable={false}>
                <FlexContainer style={{backgroundColor: 'transparent'}} direction='column'>
                    <img src={require('./logo.png')} style={{width: 200, marginTop: 30}}/>
                    <FlexContainer direction='column'
                                   className='pay-box-container'
                                   style={{
                                       width: '80%',
                                       marginTop: '20', color: '#fff',
                                       backgroundColor: '#5E5BB2', height: 313,
                                       marginBottom: 20
                                   }}>
                        <div style={{fontSize: 14, marginTop: 30,}}>
                            {getAccountName()}
                        </div>
                        <div style={{fontSize: 36, marginTop: 93}}>{balance}</div>
                        <div style={{fontSize: 12, marginTop: 8}}>{Token_Symbol}</div>
                    </FlexContainer>
                    {
                        [{
                            t: 'pay', click: () => {
                                hashHistory.push('/pay')
                            }
                        }, {
                            t: 'charge', click: () => {
                                hashHistory.push('/charge')
                            }
                        }, {
                            t: 'history', click: () => {

                            }
                        }].map((dataItem) => {
                            const {t, click} = dataItem;
                            return <div className='pay-box-container'
                                        style={{
                                            fontFamily: 'Rubik-Medium',
                                            fontSize: 16,
                                            width: '80%', height: 54,
                                            lineHeight: '54px', backgroundColor: '#5E5BB2',
                                            color: '#fff', margin: '4px 0',
                                            textAlign: 'center'
                                        }}
                                        onClick={click}>
                                {t}
                            </div>
                        })

                    }
                </FlexContainer>
            </PayOneContainer>
        )
    }
}

