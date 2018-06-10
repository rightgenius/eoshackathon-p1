import {getAccountName} from "../util";
import Eos from 'eosjs'
import {Token_Symbol} from "./conststr";

const EOS_CONFIG = {
    contractToken: 'eosio.token',
    contractName: 'pay.charge',
    // contractSender: "user.a", // User executing the contract (should be paired with private key)
    clientConfig: {
        keyProvider: ['5HqnoZq9DXGjL3dx3vkqMR9fvqxavBtJM4kadbT3xXwLf4ECKKH','5JTTgZhoHPtVYhYDzytMNijm2HguchVb563oaGaY2z2ZxQsdxC3'], // Your private key
        httpEndpoint: 'http://10.101.1.58:8888' // EOS http endpoint
    }
};


const eosClient = Eos(EOS_CONFIG.clientConfig);
// eosClient.getTableRows();

// eosClient.contract(EOS_CONFIG.contractName).then(result => {
//     console.log(result)
// })
// eosClient.getTableRows({
//     json: true, code: EOS_CONFIG.contractName,
//     scope:'user.a', table: 'chargeinfos'
// }).then(result => {
//     console.log(result)
// });

export const getAPayMentRequest = async () => {
    const result = await eosClient.getTableRows({
        json: true, code: EOS_CONFIG.contractName,
        scope: getAccountName(), table: 'chargeinfos'
    });
    console.log(`getAPayMentRequest`,result);
    const {rows} = result;
    for (const row of rows) {
        const {state = 0} = row;
        if (state === 0) {
            return row;
        }
    }
    return {};
};

export const getWaitingPayMent= async (target,code) => {
    const result = await eosClient.getTableRows({
        json: true, code: EOS_CONFIG.contractName,
        scope: target, table: 'chargeinfos'
    });
    console.log(`getWaitingPayMent`,target,code,result);
    const {rows} = result;
    for (const row of rows) {
        const {paymentcode = ''} = row;
        if (String(paymentcode) === code) {
            return row;
        }
    }
    return null;
};

//
export const confirmPayRequest = async (payment_code) => {
    const chargeContract = await getChargeContract();
    const payer=getAccountName();
    console.log(chargeContract);
    chargeContract.confirm();
    console.log(`confirmPayRequest`,payment_code,payer);
    const trans = await chargeContract.confirm(payment_code,payer, {authorization: payer});
    console.log(trans);
    return !!trans;
};

export const cancelPayRequest = async (payment_code) => {
    const chargeContract = await getChargeContract();
    const payer=getAccountName();
    console.log(chargeContract);
    chargeContract.cancel();
    console.log(`cancelPayRequest`,payment_code,payer);
    const trans = await chargeContract.cancel(payment_code,payer, {authorization: payer});
    console.log(trans);
    return !!trans;
};

export const getBalance = async () => {
    const result = await eosClient.getCurrencyBalance(EOS_CONFIG.contractToken, getAccountName(), Token_Symbol);
    console.log(`getCurrencyBalance`, result);
    if (result.length === 1) {
        return result[0].split(Token_Symbol)[0];
    }
    return [`0.0000`];
};


export const getChargeContract = async () => {
    return await eosClient.contract(EOS_CONFIG.contractName)
};

export const requireCharge = async (quantity, payment_code, payer) => {
    const charger = getAccountName();
    // return getChargeContract().then(chargeContract=>{
    //     return chargeContract.reqcharge(charger,`${quantity} ${Token_Symbol}`,payment_code,payer).then(result=>{
    //         console.log(result)
    //     }).then(()=>{
    //         return false
    //     })
    // })

    const chargeContract = await getChargeContract();

    console.log(chargeContract);
    console.log(`requireCharge:`,charger, `${Number(quantity).toFixed(4)} ${Token_Symbol}`, payment_code, payer);
    const trans = await chargeContract.reqcharge(charger,`${Number(quantity).toFixed(4)} ${Token_Symbol}`,
        `${payment_code}`, payer, {authorization: charger});
    console.log(trans);
    return !!trans;
};
