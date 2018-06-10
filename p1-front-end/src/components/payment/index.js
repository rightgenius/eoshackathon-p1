import React from "react";

import {ModalCover} from "../../common/PopUp";
import PayMentContainer from "./payment";

export const showPayMentContainer = (payRequest) => {
    // console.log(111)
    ModalCover(<PayMentContainer payMent={payRequest}/>, null, {background: 'linear-gradient(#1E3958, #151635)'})
};
