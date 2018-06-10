import {getAPayMentRequest} from "./index";
import {showPayMentContainer} from "../components/payment";



export const polling4Pay = () => {
    this.timerr=setInterval(()=>{
        getAPayMentRequest().then(payRequest => {
            // console.log(payRequest)
            // payRequest.charger='user.b';
            // payRequest.payer='user.a';
            // payRequest.quantity='1 SYS'

            const {charger} = payRequest;
            if (charger) {
                clearInterval(this.timerr)
                showPayMentContainer(payRequest,()=>{
                    polling4Pay()
                })
            }
        })
    },1000)
};
