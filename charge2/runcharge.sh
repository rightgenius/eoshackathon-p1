#!/bin/zsh
# seller, amount, pay_code, payer
cd ~/dev/eos/Docker
alias cleos="docker-compose exec keosd /opt/eosio/bin/cleos -u http://nodeosd:8888"




cleos wallet unlock --password PW5HqAELrAinmEk6caZ25SqAikTmqNi83L9uqDvzeRvWFQX3Eikut

RANDOM_CODE=12345

# bob charge alice
cleos push action pay.charge reqcharge '["bob", "1.0000 SYS", "'$RANDOM_CODE'", "alice"]' -p bob 

cleos push action pay.charge printinfo '["'$RANDOM_CODE'", "alice"]' -p alice

# alice confirm
cleos push action pay.charge confirm '["'$RANDOM_CODE'", "alice"]' -p alice

echo "should fail after this"
cleos push action pay.charge confirm '["'$RANDOM_CODE'", "alice"]' -p alice
cleos push action pay.charge cancel '["'$RANDOM_CODE'", "alice"]' -p alice

# check table data
cleos get table pay.charge alice chargeinfos





cd -

