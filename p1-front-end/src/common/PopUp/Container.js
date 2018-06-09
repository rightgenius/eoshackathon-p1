import React from 'react'

export default class Container extends React.Component {
    render() {
        const {content,onClose,style}=this.props;
        return (
            <div  style={{
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                zIndex: 1,
                overflow:'hidden',
                ...style
            }} onClick={(e)=>{
                if(onClose){
                    onClose(e)
                }
            }}>
                {content}
            </div>
        )
    }
}
