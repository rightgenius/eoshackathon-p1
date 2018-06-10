/**
 * Created by Kael on 2018/6/9.
 */
import React from 'react'
import PayOneContainer from "../../common/PayOneContainer/PayOneContainer";
import FlexContainer from "../../common/FlexContainer";
import NumberInputer from "../../common/NumInputer";
import {getAccountName} from "../../util";
import {Toast} from 'antd-mobile'
import './charge.less'
import {requireCharge} from "../../eosjs";


export default class PayContainer extends React.Component {
    state = {
        pross: 0,
        inputValue: '',
        scanerInputValue: ''
    };

    componentDidMount() {
       // this.setState({
       //     inputValue:1,
       // },()=>{
       //     this._requreCharge('user.a','77845')
       // })
    }

    _confirm = () => {
        this.setState({
            pross: 1
        }, () => {
            document.getElementById('scan-inputer').focus()
        })
    };

    _resetScanInput = () => {
        this.setState({
            scanerInputValue: ''
        }, () => {
            Toast.info('Rescan...')
        })
    };

    _requreCharge = (payer, code) => {
        const {inputValue}=this.state;
        if(Number(inputValue)>0){
            requireCharge(inputValue,code,payer).then(result => {
                if (result) {
                    Toast.loading(`${payer} is Paying`)
                }
            })
        }
    };

    _submit = () => {
        const {scanerInputValue} = this.state;
        try {
            const payInfo = JSON.parse(scanerInputValue);
            const {n, c} = payInfo;

            console.log(`payInfo`,payInfo);
            console.log(`n,c`,n,c);

            if (n && c) {
                this._requreCharge(n, c);
            }
            else {
                this._resetScanInput();
            }
        }
        catch (err) {
            this._resetScanInput();
        }
    };

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
                    {
                        pross === 1
                        &&
                        <input id='scan-inputer' value={this.state.scanerInputValue}
                               style={{opacity: 0}}
                               onKeyPress={e => {
                                   if (e.key === 'Enter') {
                                       this._submit()
                                   }
                               }}
                               onChange={(e) => {
                                   const {target} = e;
                                   // console.log(target.value);
                                   this.setState({
                                       scanerInputValue: target.value
                                   })
                               }}
                        />
                    }
                </FlexContainer>
                <NumberInputer
                    enable={pross === 0}
                    confirm={this._confirm}
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

