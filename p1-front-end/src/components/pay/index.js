/**
 * Created by Kael on 2018/6/9.
 */
import React from 'react'
import PayOneContainer from "../../common/PayOneContainer/PayOneContainer";
import FlexContainer from "../../common/FlexContainer";
import {Token_Symbol} from "../../eosjs/conststr";
import QRCode from 'qrcode.react'
import {getAccountName} from "../../util";
import BalanceContainer from "../home/balance";
import {polling4Pay} from "../../eosjs/buyer";

import './pay.less'
//
const guid = () => {
    const s4 = () => Math.floor(Math.random() * 10);
    return `${s4()+1}${s4()}${s4()}${s4()}${s4()}`;
};

// console.log(guid())

export default class PayContainer extends React.Component {

    componentDidMount=()=>{
        // console.log(222)
      polling4Pay()
    };

    render() {
        return (
            <PayOneContainer className='linear-background1 container'
                             title='Pay'>
                <div style={{padding: '20px'}}>
                    <FlexContainer className='pay-box-container' direction='column' style={{padding: '28px 0'}}>
                        {/*<div className='empty-fill' style={{width: '80%', height: 80,}}>*/}

                        {/*</div>*/}
                        <div className='empty-fill' style={{width: 300, height: 300, marginTop: 20,backgroundColor:'#fff'}}>
                            <QRCode style={{margin:'20px 0 0 20px'}} value={
                                JSON.stringify({
                                    n: `${getAccountName()}`,
                                    c: `${guid()}`
                                })} size={260}/>
                        </div>
                    </FlexContainer>
                    <div className='pay-box-container'
                         style={{padding: '10px 20px 20px 20px', marginTop: '20'}}>
                        <div style={{color: '#a0a0a0', fontSize: 12}}>
                            account
                        </div>
                        <FlexContainer justify='between' style={{marginTop: 4}}>
                            <div>
                                {getAccountName()}
                            </div>
                            <div>
                                <span style={{fontFamily: 'Rubik-Medium', fontSize: 14, color: '#31639C'}}>
                                    <BalanceContainer/>
                                </span>
                                <span style={{fontSize: 12, color: '#31639C', marginLeft: 4}}>
                                    {Token_Symbol}
                                </span>
                            </div>
                        </FlexContainer>
                    </div>
                </div>
            </PayOneContainer>
        )
    }
}

