import React from 'react'

import {NavBar} from 'antd-mobile'



export default class PayOneContent extends React.Component {
    render() {
        const {navEnable}=this.props;
        const paddingTop=navEnable?45:0;
        const height=window.screen.height-paddingTop;


        return (
            <div className='scorll-container' style={{position:'absolute',height:height,top:paddingTop}}>
                {this.props.children}
            </div>

        )
    }
}
