import React from "react";

import {ModalCover} from "../../common/PopUp";
import PayMentContainer from "./payment";

export const showPayMentContainer = (payRequest,cb) => {
    // console.log(111)
    ModalCover(<PayMentContainer payMent={payRequest}/>, cb, {background: 'linear-gradient(#1E3958, #151635)'})
};
