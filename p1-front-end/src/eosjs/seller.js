import {getAPayMentRequest, getWaitingPayMent} from "./index";


export const polling4PayMent = (target,code,cb) => {

    this.timer=setInterval(()=>{
        getWaitingPayMent(target,code).then(payMent=>{
            console.log(payMent);
            if(payMent)
            {
                const {state}=payMent;
                if(state!==0){
                    clearInterval(this.timer);
                    cb(state===1)
                }
            }
        })
        // getAPayMentRequest().then(payRequest => {
        //     // console.log(payRequest)
        //     // payRequest.charger='user.b';
        //     // payRequest.payer='user.a';
        //     // payRequest.quantity='1 SYS'
        //
        //     const {charger} = payRequest;
        //     if (charger) {
        //         showPayMentContainer(payRequest)
        //     }
        // })
    },1000)
};
