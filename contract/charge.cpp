
#include "charge.hpp"

using namespace eosio;
namespace payment_one {
    ///@abi_action
    void charge::request_charge(account_name charger, asset quantity, string payment_code) {
        eosio_assert(quantity.is_valid(), "invalid quantity");
        eosio_assert(quantity.amount > 0, "must issue positive quantity");
        charge_infos exist_charge_infos = charge_infos(code_account, code_account);
        exist_charge_infos.emplace(charger, [&](auto &d) {
            d.charger = charger;
            d.quantity = quantity;
            d.payment_code = payment_code;
        });
    }


}
EOSIO_ABI( payment_one::charge, (request_charge) )

