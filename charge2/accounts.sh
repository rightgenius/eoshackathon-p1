#!/bin/zsh
default wallet
PW5HqAELrAinmEk6caZ25SqAikTmqNi83L9uqDvzeRvWFQX3Eikut

cleos wallet unlock --password PW5HqAELrAinmEk6caZ25SqAikTmqNi83L9uqDvzeRvWFQX3Eikut



第一个key
公
EOS8NmnkpFhkZMk595adA1P5A9koHQBi8sahbyShYM6XJsFW5xECF
私
5HqnoZq9DXGjL3dx3vkqMR9fvqxavBtJM4kadbT3xXwLf4ECKKH

第二个key
 公
EOS7WDz1XBR8jPNC6WvHpVxvkAYDQ6LtLAdJprga1ytVxh7mfSFuU,
私
5JTTgZhoHPtVYhYDzytMNijm2HguchVb563oaGaY2z2ZxQsdxC3


#hello
cleos create account eosio hello.code EOS8NmnkpFhkZMk595adA1P5A9koHQBi8sahbyShYM6XJsFW5xECF EOS7WDz1XBR8jPNC6WvHpVxvkAYDQ6LtLAdJprga1ytVxh7mfSFuU


cleos set contract hello.code /eosdev/eos/contracts/hello -p hello.code
cleos push action hello.code hi '["eosio"]' -p eosio


#eosio.token create
cleos create account eosio eosio.token EOS8NmnkpFhkZMk595adA1P5A9koHQBi8sahbyShYM6XJsFW5xECF EOS7WDz1XBR8jPNC6WvHpVxvkAYDQ6LtLAdJprga1ytVxh7mfSFuU

cleos set contract eosio.token ../contracts/eosio.token -p eosio.token

cleos push action eosio.token create '[ "eosio", "1000000000.0000 SYS"]' -p eosio.token

#issue to hello.code
cleos push action eosio.token issue '["hello.code", "100.0000 SYS", "memo"]' -p eosio


# nius
cleos create account eosio nius EOS8NmnkpFhkZMk595adA1P5A9koHQBi8sahbyShYM6XJsFW5xECF EOS7WDz1XBR8jPNC6WvHpVxvkAYDQ6LtLAdJprga1ytVxh7mfSFuU

#issue to nius
cleos push action eosio.token issue '["nius", "100.0000 SYS", "memo"]' -p eosio

# check nius 
cleos get currency balance eosio.token nius

# check hello.code
cleos get currency balance eosio.token hello.code


#pay.charge
cleos create account eosio pay.charge EOS8NmnkpFhkZMk595adA1P5A9koHQBi8sahbyShYM6XJsFW5xECF EOS7WDz1XBR8jPNC6WvHpVxvkAYDQ6LtLAdJprga1ytVxh7mfSFuU

# bob
cleos create account eosio bob EOS8NmnkpFhkZMk595adA1P5A9koHQBi8sahbyShYM6XJsFW5xECF EOS7WDz1XBR8jPNC6WvHpVxvkAYDQ6LtLAdJprga1ytVxh7mfSFuU

# alice
cleos create account eosio alice EOS8NmnkpFhkZMk595adA1P5A9koHQBi8sahbyShYM6XJsFW5xECF EOS7WDz1XBR8jPNC6WvHpVxvkAYDQ6LtLAdJprga1ytVxh7mfSFuU

# issue to bob and Alice
cleos push action eosio.token issue '["bob", "100.0000 SYS", "memo"]' -p eosio
cleos push action eosio.token issue '["alice", "100.0000 SYS", "memo"]' -p eosio



