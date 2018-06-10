/**
 * Created by Kael on 2018/6/9.
 */
import React from 'react'
import PayOneContainer from "../../common/PayOneContainer/PayOneContainer";
import FlexContainer from "../../common/FlexContainer";
import {Toast} from 'antd-mobile'
import {requireCharge} from "../../eosjs";
import {polling4PayMent} from "../../eosjs/seller";


export default class OrderPayContainer extends React.Component {
    state = {
        pross: 0,
        inputValue: '',
        scanerInputValue: '',
        payState:-1,
    };

    componentDidMount() {
        setTimeout(() => {
            document.getElementById('scan-inputer-h').focus()
        }, 1000)
    }

    _confirm = () => {
        this.setState({
            pross: 1
        }, () => {
            document.getElementById('scan-inputer-h').focus()
        })
    };

    _resetScanInput = () => {
        this.setState({
            scanerInputValue: ''
        }, () => {
            document.getElementById('scan-inputer-h').focus()
            Toast.info('Rescan...')
        })
    };

    _requreCharge = (payer, code) => {
        requireCharge(2.5, code, payer).then(result => {
            if (result) {
                Toast.info(`${payer} is Paying`)
                polling4PayMent(payer,code,(success)=>{
                    this.setState({
                        payState:success?1:2
                    })
                })
            }
        })
        // const {inputValue} = this.state;
        // if (Number(inputValue) > 0) {
        //     requireCharge(2.5, code, payer).then(result => {
        //         if (result) {
        //             Toast.info(`${payer} is Paying`)
        //         }
        //     })
        // }
    };

    _submit = () => {
        const {scanerInputValue} = this.state;
        console.log(`scanerInputValue`, scanerInputValue);
        try {
            const payInfo = JSON.parse(scanerInputValue);
            const {n, c} = payInfo;

            console.log(`payInfo`, payInfo);
            console.log(`n,c`, n, c);

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
        const {payState} = this.state;
        const lineClassName=payState===1?'linear-background3':(payState===2?'linear-background7':'linear-background1')
        return (
            <PayOneContainer className={`${lineClassName} container`}
                             title='Charge'>
                <input id='scan-inputer-h'
                       value={this.state.scanerInputValue}
                       style={{opacity: 0, position: 'absolute', left: '-9999px'}}
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
                <FlexContainer style={{backgroundColor: 'transparent'}} direction='column'>
                    <div style={{width: '90%', height: '478',
                        position:'relative',
                        backgroundColor: '#fff', marginTop: 10}}>
                        {
                            payState!==-1
                            &&
                            <FlexContainer justify='center' style={{position:'absolute',width:'100%',height:478,backgroundColor:'rgba(255,255,255,0.8)'}}>
                                {
                                    payState===1?
                                    <div style={{color:'#7ED321',fontSize:'24'}}>
                                        CONFIRMED
                                    </div>
                                        :
                                        <div style={{color:'#BC0011',fontSize:'24'}}>
                                            DECLINE
                                        </div>
                                }
                            </FlexContainer>
                        }
                        <FlexContainer style={{padding: '17px 20px'}}>
                            <img style={{maxHeight: '60px', minWidth: '60px', minHeight: '60px', maxWidth: '60px'}}/>
                            <FlexContainer align='start' direction='column' justify='between'
                                           style={{padding: '0 10px'}}>
                                <div>
                                    The Only Magical Water We Can Find
                                </div>
                                <div style={{color: '#4A90E2', fontSize: '14', marginTop: 6}}>
                                    2.5 SYS
                                </div>
                            </FlexContainer>
                            <div style={{whiteSpace: 'nowrap', color: '#4A90E2', fontSize: '14'}}>
                                {`X 1`}
                            </div>
                        </FlexContainer>
                        <div style={{height: '1px', backgroundColor: '#d1d1d1', width: '80%', marginLeft: '10%'}}/>
                    </div>
                    <FlexContainer justify='end' style={{marginTop: 20, width: '80%'}}>
                        <div style={{color: '#fff', fontSize: '32', marginRight: '20', textAlign: 'right'}}>
                            <div>
                                2.5000
                            </div>
                            <div style={{fontSize: '20'}}>
                                SYS
                            </div>
                        </div>
                        <FlexContainer justify='center' style={{
                            width: '137',
                            height: '79',
                            border: '1px solid #fff',
                            borderRadius: '79'
                        }}>
                            <img src={require('../charge/barscannericon.png')} style={{width: '32px'}}/>
                        </FlexContainer>
                    </FlexContainer>
                </FlexContainer>
            </PayOneContainer>
        )
    }
}

