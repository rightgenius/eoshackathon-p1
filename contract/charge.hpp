#pragma once

#include <eosiolib/asset.hpp>
#include <eosiolib/eosio.hpp>

#include <string>


namespace payment_one_charge {

    using std::string;
    using eosio::asset;
    static const account_name charge_info_account = N(charge_info);
    static const account_name code_account = N(payment_one_charge);



    struct charge_info {
        charge_info(){}
        charge_info(account_name charger, asset quantity, string payment_code)
                : charger(charger), quantity(quantity), payment_code(payment_code) {
        }
        account_name charger;
        asset quantity;
        string payment_code;

        auto primary_key() const { return N(payment_code); }

        EOSLIB_SERIALIZE( charge_info, (charger)(quantity)(payment_code) )
    };

    struct charge {
        account_name   charger;
        asset quantity;
        string payment_code;
        EOSLIB_SERIALIZE( charge, (charger)(quantity)(payment_code) )
    };

    struct payment_code_wrapper {
        string payment_code;
        EOSLIB_SERIALIZE( payment_code_wrapper, (payment_code) )
    };



    typedef eosio::multi_index< charge_info_account, charge_info> charge_infos;
}
