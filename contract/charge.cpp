
#include "charge.hpp"

using namespace eosio;
namespace payment_one_charge {
    struct impl {
        void request_charge(const charge& c) {
            eosio_assert( c.quantity.is_valid(), "invalid quantity" );
            eosio_assert( c.quantity.amount > 0, "must issue positive quantity" );
            charge_infos exist_charge_infos = charge_infos(code_account, code_account);
            exist_charge_infos.emplace(c.charger, [&]( auto& d ) {
                d.charger = c.charger;
                d.quantity = c.quantity;
                d.payment_code = c.payment_code;
            });
        }


        charge_info get_charge_info(const payment_code_wrapper & p) {
            charge_infos exist_charge_infos = charge_infos(code_account, code_account);
            return exist_charge_infos.get(N(p.payment_code));
        }



        void apply( uint64_t, uint64_t code, uint64_t action ) {

            if (code == code_account) {
                if (action == N(charge)) {
                    impl::request_charge(eosio::unpack_action_data<payment_one_charge::charge>());
                } else if (action == N(get_charge_info)) {
                    impl::get_charge_info(eosio::unpack_action_data<payment_one_charge::payment_code_wrapper>());
                }
            }
        }

    };
}


extern "C" {

using namespace payment_one_charge;
void apply( uint64_t receiver, uint64_t code, uint64_t action ) {
    impl().apply(receiver, code, action);
}

} // extern "C"
