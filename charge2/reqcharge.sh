#!/bin/zsh
# seller, amount, pay_code, payer
cd ~/dev/eos/Docker
alias cleos="docker-compose exec keosd /opt/eosio/bin/cleos -u http://nodeosd:8888"
cleos wallet unlock --password PW5HqAELrAinmEk6caZ25SqAikTmqNi83L9uqDvzeRvWFQX3Eikut
cleos push action pay.charge reqcharge '["bob", "1.0000 SYS", "12348", "alice"]' -p bob 

cleos push action pay.charge printinfo '["12348", "alice", "bob"]' -p alice

#cleos push action pay.charge confirm '["12348", "alice", "bob"]' -p alice
cleos push action pay.charge cancel '["12348", "alice"]' -p alice

echo "should fail after this"

cleos push action pay.charge confirm '["12348", "alice"]' -p alice
cleos push action pay.charge cancel '["12348", "alice", "bob"]' -p alice

#cleos push action pay.charge create '["12348", "bob"]' -p bob
cleos get table pay.charge alice chargeinfos
cd -

