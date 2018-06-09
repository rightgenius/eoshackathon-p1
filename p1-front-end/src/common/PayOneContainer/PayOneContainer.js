import React from 'react'
import PayOneHeaderContainer from "./Header/PayOneHeaderContainer";
import PayOneContent from "./Content/PayOneContent";


export default class PayOneContainer extends React.Component {
    constructor(props){
        super(props);

    }

    render() {
        const {className,title,navEnable=true}=this.props;

        return (
            <div className={className} style={{height:'100%',position: 'relative'}}>
                {navEnable&&<PayOneHeaderContainer title={title} navEnable={navEnable}/>}
                <PayOneContent navEnable={navEnable}>
                    {this.props.children}
                </PayOneContent>

            </div>

        )
    }
}
