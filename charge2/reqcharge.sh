#!/bin/zsh
# seller, amount, pay_code, payer
cd ~/dev/eos/Docker
alias cleos="docker-compose exec keosd /opt/eosio/bin/cleos -u http://nodeosd:8888"
cleos wallet unlock --password PW5HqAELrAinmEk6caZ25SqAikTmqNi83L9uqDvzeRvWFQX3Eikut
cleos push action pay.charge reqcharge '["nius", "1.0000 SYS", "31346", "hello.code"]' -p nius 

cleos push action pay.charge printinfo '["31346", "hello.code", "nius"]' -p hello.code

cleos push action pay.charge confirm '["31346", "hello.code", "nius"]' -p hello.code

#cleos push action pay.charge create '["21239", "nius"]' -p nius
cleos get table pay.charge hello.code chargeinfos
cd -

