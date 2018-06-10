/**
 * Created by Kael on 2018/6/9.
 */
import React from 'react'
import {getAccountName} from "../../util";
import {Token_Symbol} from "../../eosjs/conststr";
import FlexContainer from "../FlexContainer";

class AmountInfo extends React.Component {

    render() {
        const {className,style}=this.props;

        return (
            <FlexContainer direction='column'
                           className={`pay-box-container ${className}`}
                           style={{
                               height: 398, width: '80%',
                               marginTop: '20', color: '#fff',
                               ...style
                           }}>
                <div style={{fontSize: 14, marginTop: 30,}}>
                    {getAccountName()}
                </div>
                <div style={{fontSize: 36, marginTop: 124}}>10000</div>
                <div style={{fontSize: 12, marginTop: 8}}>{Token_Symbol}</div>
            </FlexContainer>
        )
    }
}


export default AmountInfo
