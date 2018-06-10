import {getAPayMentRequest} from "./index";
import {showPayMentContainer} from "../components/payment";
export const polling4Pay = () => {
    getAPayMentRequest().then(payRequest => {
        // console.log(payRequest)
        // payRequest.charger='user.b';
        // payRequest.payer='user.a';
        // payRequest.quantity='1 SYS'

        const {charger} = payRequest;
        if (charger) {
            showPayMentContainer(payRequest)
        }

    })
};

//
// export const confirm=()=>{
//
// }
