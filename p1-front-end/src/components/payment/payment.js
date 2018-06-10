/**
 * Created by Kael on 2018/6/9.
 */
import React from 'react'
import FlexContainer from "../../common/FlexContainer/index";
import {getAccountName} from "../../util/index";
import {Token_Symbol} from "../../eosjs/conststr";
import {cancelPayRequest, confirmPayRequest} from "../../eosjs";

class PayMentContainer extends React.Component {
    state = {
        pross: 0,
    };

    componentDidMount() {

    }

    _confirm = (e) => {
        e.stopPropagation();
        const {payMent = {}} = this.props;
        const {paymentcode} = payMent;
        confirmPayRequest(paymentcode).then(result => {
            if (result) {
                this.setState({
                    pross: 1
                })
            }
        })
    };

    _decline = (e) => {
        e.stopPropagation();
        const {payMent = {}} = this.props;
        const {paymentcode} = payMent;
        cancelPayRequest(paymentcode).then(result => {
            if (result) {
                this.setState({
                    pross: -1
                })
            }
        })

    };

    render() {
        const {pross} = this.state;
        const {payMent = {}} = this.props;
        const {charger, quantity} = payMent;
        const quantityValue = quantity.split(Token_Symbol)[0];
        if (pross === 0) {
            return <FlexContainer style={{backgroundColor: 'transparent'}}
                                  direction='column'
                                  onClick={(e) => {
                                      e.stopPropagation();
                                  }}>
                <div style={{fontFamily: 'Rubik-Bold', marginTop: 40, fontSize: 18, color: '#B0DAFA'}}>
                    Paying
                </div>
                <FlexContainer direction='column'
                               className='pay-box-container linear-background1'
                               style={{
                                   height: 398, width: '80%',
                                   marginTop: '20', color: '#fff'
                               }}>
                    <div style={{fontSize: 14, marginTop: 30,}}>
                        {charger}
                    </div>
                    <div style={{fontSize: 36, marginTop: 124}}>{quantityValue}</div>
                    <div style={{fontSize: 12, marginTop: 8}}>{Token_Symbol}</div>
                </FlexContainer>
                <div style={{
                    width: '70%',
                    height: '56px',
                    borderRadius: '56px',
                    fontSize: 18,
                    textAlign: 'center',
                    lineHeight: '56px',
                    backgroundColor: '#fff',
                    color: '#558C17',
                    marginTop: '36px'
                }} onClick={this._confirm}>
                    confirm
                </div>
                <div style={{
                    width: '70%',
                    height: '56px',
                    borderRadius: '56px',
                    fontSize: 18, textAlign: 'center',
                    lineHeight: '56px',
                    color: '#FF7600 ', marginTop: '10px'
                }} onClick={this._decline}>
                    decline
                </div>
            </FlexContainer>
        }
        return <FlexContainer style={{backgroundColor: 'transparent'}}
                              direction='column'>
            <div style={{fontFamily: 'Rubik-Bold', marginTop: 40, fontSize: 18, color: '#B0DAFA'}}>
                PayMent
            </div>
            <FlexContainer direction='column'
                           className={`pay-box-container ${pross === -1 ? 'linear-background7' : 'linear-background3'}`}
                           style={{
                               height: 398, width: '80%',
                               marginTop: '20', color: '#fff'
                           }}>
                <div style={{fontSize: 14, marginTop: 30,}}>
                    {getAccountName()}
                </div>
                <div style={{fontSize: 36, marginTop: 124}}>{quantityValue}</div>
                <div style={{fontSize: 12, marginTop: 8}}>{Token_Symbol}</div>
                <div style={{fontSize: 20, color: '#fff', marginTop: 80}}>
                    {
                        pross === 1 ? `confirmed` : `cancelled`
                    }
                </div>
            </FlexContainer>
            <div style={{
                width: '172', height: '56', lineHeight: '56px',
                color: '#fff', textAlign: 'center',
                marginTop: 40,
                fontSize: '18', border: '1px solid #fff', borderRadius: "56"
            }}>
                back to pay
            </div>
        </FlexContainer>
    }
}

export default PayMentContainer
