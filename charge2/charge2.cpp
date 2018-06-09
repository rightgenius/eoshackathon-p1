#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/asset.hpp>
#include <string>
using std::string;
using eosio::asset;
class charge : public eosio::contract {
	static const account_name charge_info_account = N(charge.acct);
	static const account_name code_account = N(pay.charge3);
	static const account_name charge_info_scope = N(charge);

	private:
    	//@abi table chargeinfos i64
        struct charge_info {
        	uint64_t paymentcode;
        	account_name payer;
            account_name charger;
            asset quantity;



            uint64_t primary_key() const { return paymentcode; }

        };

        typedef eosio::multi_index <charge_info_account, charge_info> chargeinfos;

    public:
        using eosio::contract::contract;
        void reqcharge(account_name charger, asset quantity, uint64_t payment_code, account_name payer) {
            eosio::print(charger);
            eosio::print(quantity);
            eosio::print(payment_code);
            eosio::print(payer);
            eosio_assert(quantity.is_valid(), "invalid quantity");
        	eosio_assert(quantity.amount > 0, "must issue positive quantity");
        	chargeinfos exist_charge_infos = chargeinfos(code_account, charge_info_scope);
        	exist_charge_infos.emplace(charger, [&](auto &d) {
            	d.charger = charger;
            	d.quantity = quantity;
            	d.paymentcode = payment_code;
        	});
        }


        void printinfo(uint64_t payment_code) {
        	chargeinfos exist_charge_infos = chargeinfos(code_account, code_account);
        	charge_info info = exist_charge_infos.get(payment_code);
			eosio::print(info.paymentcode);
        }

    


};

EOSIO_ABI( charge, (reqcharge)(printinfo) )
