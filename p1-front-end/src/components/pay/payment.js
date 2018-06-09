/**
 * Created by Kael on 2018/6/9.
 */
import React from 'react'
import FlexContainer from "../../common/FlexContainer";
import {getAccountName} from "../../util";
import {Token_Symbol} from "../../util/conststr";

class PayMentContainer extends React.Component {
    state = {
        pross: 0,
    };

    _confirm = (e) => {
        e.stopPropagation();
        this.setState({
            pross: 1
        })
    };

    _decline = (e) => {
        e.stopPropagation();
        this.setState({
            pross: -1
        })
    };

    render() {
        const {pross} = this.state;
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
                        {getAccountName()}
                    </div>
                    <div style={{fontSize: 36, marginTop: 124}}>10000</div>
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
                           className='pay-box-container linear-background3'
                           style={{
                               height: 398, width: '80%',
                               marginTop: '20', color: '#fff'
                           }}>
                <div style={{fontSize: 14, marginTop: 30,}}>
                    {getAccountName()}
                </div>
                <div style={{fontSize: 36, marginTop: 124}}>10000</div>
                <div style={{fontSize: 12, marginTop: 8}}>{Token_Symbol}</div>
            </FlexContainer>
        </FlexContainer>
    }
}

export default PayMentContainer
