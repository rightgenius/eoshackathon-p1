#!/bin/zsh
#default wallet
#PW5HqAELrAinmEk6caZ25SqAikTmqNi83L9uqDvzeRvWFQX3Eikut
cd ~/dev/eos/Docker
alias cleos="docker-compose exec keosd /opt/eosio/bin/cleos -u http://nodeosd:8888"

cleos wallet unlock --password PW5HqAELrAinmEk6caZ25SqAikTmqNi83L9uqDvzeRvWFQX3Eikut

cleos wallet import 5HqnoZq9DXGjL3dx3vkqMR9fvqxavBtJM4kadbT3xXwLf4ECKKH
cleos wallet import 5JTTgZhoHPtVYhYDzytMNijm2HguchVb563oaGaY2z2ZxQsdxC3



# 第一个key EOS8NmnkpFhkZMk595adA1P5A9koHQBi8sahbyShYM6XJsFW5xECF
# 私 5HqnoZq9DXGjL3dx3vkqMR9fvqxavBtJM4kadbT3xXwLf4ECKKH

# 第二个key EOS7WDz1XBR8jPNC6WvHpVxvkAYDQ6LtLAdJprga1ytVxh7mfSFuU,
# 私 5JTTgZhoHPtVYhYDzytMNijm2HguchVb563oaGaY2z2ZxQsdxC3

#eosio.token create
cleos create account eosio eosio.token EOS8NmnkpFhkZMk595adA1P5A9koHQBi8sahbyShYM6XJsFW5xECF EOS7WDz1XBR8jPNC6WvHpVxvkAYDQ6LtLAdJprga1ytVxh7mfSFuU
cleos set contract eosio.token ../contracts/eosio.token -p eosio.token
cleos push action eosio.token create '[ "eosio", "1000000000.0000 SYS"]' -p eosio.token

# bob
cleos create account eosio bob EOS8NmnkpFhkZMk595adA1P5A9koHQBi8sahbyShYM6XJsFW5xECF EOS7WDz1XBR8jPNC6WvHpVxvkAYDQ6LtLAdJprga1ytVxh7mfSFuU

# alice
cleos create account eosio alice EOS8NmnkpFhkZMk595adA1P5A9koHQBi8sahbyShYM6XJsFW5xECF EOS7WDz1XBR8jPNC6WvHpVxvkAYDQ6LtLAdJprga1ytVxh7mfSFuU

# issue to bob and Alice
cleos push action eosio.token issue '["bob", "100.0000 SYS", "memo"]' -p eosio
cleos push action eosio.token issue '["alice", "100.0000 SYS", "memo"]' -p eosio

# pay.charge
cleos create account eosio pay.charge EOS8NmnkpFhkZMk595adA1P5A9koHQBi8sahbyShYM6XJsFW5xECF EOS7WDz1XBR8jPNC6WvHpVxvkAYDQ6LtLAdJprga1ytVxh7mfSFuU

# pay.charge contract
cleos set contract pay.charge /eosdev/eoshackathon-p1/charge2 -p pay.charge

# contract account permission
cleos set account permission bob active \
'{"threshold": 1,"keys": [{"key": "EOS8NmnkpFhkZMk595adA1P5A9koHQBi8sahbyShYM6XJsFW5xECF","weight": 1}],"accounts": [{"permission":{"actor":"pay.charge","permission":"eosio.code"},"weight":1}]}' \
owner -p bob

cleos set account permission alice active \
'{"threshold": 1,"keys": [{"key": "EOS8NmnkpFhkZMk595adA1P5A9koHQBi8sahbyShYM6XJsFW5xECF","weight": 1}],"accounts": [{"permission":{"actor":"pay.charge","permission":"eosio.code"},"weight":1}]}' \
owner -p alice





cd -