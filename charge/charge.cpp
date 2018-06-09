
#include "charge.hpp"

using namespace eosio;
namespace payment_one {
    ///@abi_action
    void charge::reqcharge(account_name charger, asset quantity, string payment_code, account_name payer) {
        eosio_assert(quantity.is_valid(), "invalid quantity");
        eosio_assert(quantity.amount > 0, "must issue positive quantity");
        chargeinfos exist_charge_infos = chargeinfos(code_account, code_account);
        exist_charge_infos.emplace(payer, [&](auto &d) {
            d.charger = charger;
            d.quantity = quantity;
            d.paymentcode = payment_code;
        });
    }


}
EOSIO_ABI( payment_one::charge, (reqcharge) )

