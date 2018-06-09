import React from 'react'

import {NavBar,Icon} from 'antd-mobile'

export default class PayOneHeaderContainer extends React.Component {
    render() {
        const {title='payment.one'}=this.props;

        return (
           <div style={{position:'absolute',width:'100%',top:0,left:0,right:0,}}>
               <NavBar
                   style={{backgroundColor:'transparent'}}
                   mode="drak"
                   icon={<Icon type="left" />}
                   onLeftClick={() =>history.back()}
                   // rightContent={[
                   //     <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                   //     <Icon key="1" type="ellipsis" />,
                   // ]}
               ><div style={{fontFamily:'Rubik-Bold'}}>
                   {title}
               </div></NavBar>
           </div>

        )
    }
}
