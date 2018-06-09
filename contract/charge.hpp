#pragma once

#include <eosiolib/asset.hpp>
#include <eosiolib/eosio.hpp>

#include <string>


namespace payment_one {


    using std::string;
    using eosio::asset;
    using eosio::contract;

class charge : public contract {
        static const account_name charge_info_account = N(charge_infos);
        static const account_name code_account = N(payment_one_charge);

    public:
        charge(account_name self) : contract(self){};
        void request_charge(account_name charger, asset quantity, string payment_code);
    private:
        //define of table
        struct charge_info {
            charge_info() {}

            charge_info(account_name charger, asset quantity, string payment_code)
                    : charger(charger), quantity(quantity), payment_code(payment_code) {
            }

            account_name charger;
            asset quantity;
            string payment_code;

            auto primary_key() const { return N(payment_code); }

        };

        typedef eosio::multi_index <charge_info_account, charge_info> charge_infos;


    };
}
