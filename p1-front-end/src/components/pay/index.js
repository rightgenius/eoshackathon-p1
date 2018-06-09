/**
 * Created by Kael on 2018/6/9.
 */
import React from 'react'
import PayOneContainer from "../../common/PayOneContainer/PayOneContainer";
import FlexContainer from "../../common/FlexContainer";
import {Token_Symbol} from "../../util/conststr";
import {ModalCover} from "../../common/PopUp";
import PayMentContainer from "./payment";
import QRCode from 'qrcode.react'

import './pay.less'
import {getAccountName} from "../../util";


const guid = () => {
    const s4 = () => Math.floor(Math.random() * 10);
    return `${s4()}${s4()}${s4()}${s4()}${s4()}`;
};

// console.log(guid())

export default class PayContainer extends React.Component {
    _modalPayMent = () => {
        ModalCover(
            <PayMentContainer/>, null, {background: 'linear-gradient(#1E3958, #151635)'}
        )
    };

    render() {
        return (
            <PayOneContainer className='linear-background1 container'
                             title='Pay'>
                <div style={{padding: '20px'}}>
                    <FlexContainer className='pay-box-container' direction='column' style={{padding: '28px 0'}}>
                        <div className='empty-fill' style={{width: '80%', height: 80,}}>

                        </div>
                        <div className='empty-fill' style={{width: 200, height: 200, marginTop: 20}}>
                            <QRCode value={
                                JSON.stringify({
                                    n: `${getAccountName()}`,
                                    c: `${guid()}`
                                })} size={200}/>
                        </div>
                    </FlexContainer>
                    <div className='pay-box-container'
                         style={{padding: '10px 20px 20px 20px', marginTop: '20'}}>
                        <div style={{color: '#a0a0a0', fontSize: 12}}>
                            account
                        </div>
                        <FlexContainer justify='between' style={{marginTop: 4}}>
                            <div>
                                thepizzabyer
                            </div>
                            <div>
                                <span style={{fontFamily: 'Rubik-Medium', fontSize: 14, color: '#31639C'}}>
                                    2029.1212
                                </span>
                                <span style={{fontSize: 12, color: '#31639C', marginLeft: 4}}>
                                    {Token_Symbol}
                                </span>
                            </div>
                        </FlexContainer>
                    </div>
                    <div onClick={this._modalPayMent}
                         style={{marginTop: 30, marginLeft: 30, color: '#fff'}}>
                        Modal PayMent
                    </div>
                </div>
            </PayOneContainer>
        )
    }
}

