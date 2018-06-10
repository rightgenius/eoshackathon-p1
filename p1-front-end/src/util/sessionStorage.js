
export const Session_Storage_Account='Session_Storage_Account';


export const sessionSaveOneData=(key,value)=>{
    sessionStorage[key]=value;
};


export const sessionReadOneData=(key)=>{
    return sessionStorage[key]
};
