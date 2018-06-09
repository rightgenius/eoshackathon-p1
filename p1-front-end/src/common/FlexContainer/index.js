import React from 'react'
import './flexcontainer.less'

export  default  class FlexContainer extends React.Component{
    render(){

        const {justify='',align='center',direction='',wrap='',style={},onClick=null,className=''}=this.props;
        //start,end,center,between,around
        const justifyClassName=justify?`flexbox-justify-${justify}`:'';
        //start,center,end,baseline,stretch
        const alignClassName=align?`flexbox-align-${align}`:'';
        //row,row-reverse,column,column-reverse
        const directionClassName=direction?`flexbox-direction-${direction}`:'';
        //nowrap,wrap,wrap-reverse
        const wrapClassName=wrap?`flexbox-wrap-${wrap}`:'';
        return (
            <div className={`flexbox-container ${justifyClassName} ${alignClassName} ${directionClassName} ${wrapClassName} ${className}`}
                 style={style} onClick={onClick}>
                {this.props.children}
            </div>
        )
    }
}

