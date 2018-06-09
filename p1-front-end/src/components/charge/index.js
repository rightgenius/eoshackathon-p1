/**
 * Created by Kael on 2018/6/9.
 */
import React from 'react'
import PayOneContainer from "../../common/PayOneContainer/PayOneContainer";
import FlexContainer from "../../common/FlexContainer";
import NumberInputer from "../../common/NumInputer";
import {getAccountName} from "../../util";

import './charge.less'

export default class PayContainer extends React.Component {
    state = {
        pross: 0,
        inputValue: ''
    }

    componentDidMount() {
        // console.log(this.inputRef)
    }

    render() {
        const {inputValue, pross} = this.state;

        return (
            <PayOneContainer className='linear-background1 container'
                             title='Charge'>

                <FlexContainer direction='column' style={{marginTop: 87, width: '100%', color: '#fff'}}>
                    <FlexContainer justify='center' style={{width: '70%', height: 43}}>
                        {
                            inputValue
                            &&
                            <div style={{color: '#fff', fontSize: 36}}>
                                {inputValue}
                            </div>
                        }
                        {
                            pross === 0
                            &&
                            <div style={{
                                marginLeft: 2,
                                width: '1px',
                                height: 43,
                                backgroundColor: '#fff',
                                animation: 'cursor-flash 2s ease-in-out infinite'
                            }}/>
                        }
                    </FlexContainer>
                    {
                        pross === 0
                        &&
                        <div style={{width: '72%', height: 2, backgroundColor: '#fff', marginTop: 10}}/>
                    }
                    {
                        pross === 1
                        &&
                        <img src={require('./barscannericon@3x.png')}
                             style={{width: 32, marginTop: 20}}/>
                    }
                    {
                        pross === 0
                        &&
                        <div style={{marginTop: 10}}>
                            <span>to:</span>
                            <span style={{
                                fontSize: 12,
                                fontFamily: 'Rubik-Bold',
                                textDecoration: 'underline'
                            }}>{getAccountName()}</span>
                        </div>
                    }
                    {
                        pross === 1
                        &&
                        <div style={{
                            width: 100, height: 32,
                            marginTop: 24,
                            fontSize: 14,
                            backgroundColor: '#ff7600',
                            fontFamily: 'Rubik-Medium',
                            textAlign: 'center', borderRadius: 32,
                            lineHeight: '32px'
                        }} onClick={() => {
                            this.setState({
                                pross: 0
                            })
                        }
                        }>
                            CANCEL

                        </div>
                    }
                </FlexContainer>
                <NumberInputer
                    enable={pross === 0}
                    confirm={() => {
                        this.setState({
                            pross: 1
                        })
                    }}
                    del={() => {
                        if (inputValue.length > 0) {
                            this.setState({
                                inputValue: inputValue.substring(0, inputValue.length - 1)
                            })
                        }
                    }}
                    clear={() => {
                        this.setState({
                            inputValue: ''
                        })
                    }}
                    onChange={(num) => {
                        if (num === '.' && inputValue.indexOf('.') > -1) {
                            return
                        }
                        this.setState({
                            inputValue: `${inputValue}${num}`
                        })
                    }}/>
            </PayOneContainer>
        )
    }
}

