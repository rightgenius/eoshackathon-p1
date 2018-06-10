import {Session_Storage_Account, sessionReadOneData} from "./sessionStorage";

export const getAccountName=()=>{
    return sessionReadOneData(Session_Storage_Account)
};
