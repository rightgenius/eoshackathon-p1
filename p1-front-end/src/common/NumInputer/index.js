import React from 'react'
import FlexContainer from "../FlexContainer";

export default class NumberInputer extends React.Component {
    render() {
        const {onChange, clear, del, confirm, enable} = this.props;

        return (
            <div style={{
                position: 'fixed',
                bottom: '0',
                width: '100%',
                backgroundColor: enable ? '#1B2C74' : 'transparent',
            }}>
                <FlexContainer style={{backgroundColor: 'transparent', padding: '35px 0'}}>
                    <FlexContainer wrap='wrap' style={{width: '70%'}}>
                        {
                            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '←'].map((inputValue, index) => {
                                return (
                                    <FlexContainer key={index}
                                                   justify='center'
                                                   style={{
                                                       fontSize: 36,
                                                       color: enable ? '#fff' : 'rgb(255,255,255,0.15)',
                                                       width: '33%',
                                                       padding: '10px 0',
                                                       textAlign: 'center'
                                                   }}
                                                   onClick={() => {
                                                       if (!enable) {
                                                           return
                                                       }
                                                       if (inputValue === '←') {
                                                           del()
                                                       }
                                                       else {
                                                           onChange(inputValue)
                                                       }
                                                   }}>
                                        {
                                            inputValue === '←' ?
                                                <img src={require('./backdelete@3x.png')}
                                                     style={{width: 24, opacity: enable ? '1' : '0.15'}}/>
                                                :
                                                <div>
                                                    {
                                                        inputValue
                                                    }
                                                </div>
                                        }


                                    </FlexContainer>
                                )
                            })
                        }
                    </FlexContainer>
                    <FlexContainer style={{width: '30%'}}
                                   direction='column'>
                        <div style={{
                            color: enable ? '#fff' : 'rgb(255,255,255,0.15)',
                            fontSize: 20,
                            width: 76,
                            height: 40,
                            padding: '10px 0',
                            lineHeight: '40px',
                            textAlign: 'center'
                        }} onClick={() => {
                            clear()
                        }}>
                            CLR
                        </div>
                        <div style={{
                            height: 168,
                            width: 76,
                            borderRadius: 76,
                            marginTop: 20,
                            backgroundColor: enable ? 'rgba(255,255,255,0.33)' : 'rgba(255,255,255,0.15)'
                        }} onClick={() => {
                            confirm()
                        }}>

                        </div>
                    </FlexContainer>
                </FlexContainer>
            </div>
        )
    }
}
