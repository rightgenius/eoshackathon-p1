#!/bin/zsh
# 合约中调用其他合约，需要eosio.code权限
cd ~/dev/eos/Docker

alias cleos="docker-compose exec keosd /opt/eosio/bin/cleos -u http://nodeosd:8888"
export account=hello.code
echo "set pay.charge@eosio.code for $account"

cleos set account permission $account active \
'{"threshold": 1,"keys": [{"key": "EOS8NmnkpFhkZMk595adA1P5A9koHQBi8sahbyShYM6XJsFW5xECF","weight": 1}],"accounts": [{"permission":{"actor":"pay.charge","permission":"eosio.code"},"weight":1}]}' \
owner -p $account

cd -