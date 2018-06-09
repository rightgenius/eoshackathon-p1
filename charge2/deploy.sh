#!/bin/zsh
cd ~/dev/eos/Docker
alias cleos="docker-compose exec keosd /opt/eosio/bin/cleos -u http://nodeosd:8888"
cleos wallet unlock --password PW5HqAELrAinmEk6caZ25SqAikTmqNi83L9uqDvzeRvWFQX3Eikut
cleos set contract pay.charge /eosdev/eoshackathon-p1/charge2 -p pay.charge


#run
#cleos push action pay.charge transfer '["hello.code", "nius", "1.0000 SYS", "memo"]' -p hello.code


cd -