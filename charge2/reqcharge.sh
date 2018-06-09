#!/bin/zsh
# seller, amount, pay_code, payer
cd ~/dev/eos/Docker
alias cleos="docker-compose exec keosd /opt/eosio/bin/cleos -u http://nodeosd:8888"
cleos wallet unlock --password PW5HqAELrAinmEk6caZ25SqAikTmqNi83L9uqDvzeRvWFQX3Eikut
cleos push action pay.charge reqcharge '["nius", "1.0000 SYS", "12346", "hello.code"]' -p nius 

cleos push action pay.charge printinfo '["12346", "hello.code"]' -p nius

cleos push action pay.charge confirm '["12346", "hello.code"]' -p hello.code
cd -