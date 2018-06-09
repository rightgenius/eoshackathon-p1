# charge 
seller 像合约发起收款请求

- parameter:

```
{
	account_name: charger,
	asset: quantity,
	string: payment_code
}
```

- return: void



# pay one to Polling ---- get\_pay\_info
buyer  轮询接口获取收款方收款信息

- parameter:
- 
```
{
	string: payment_code
}
```

- return

if seller has send the charge request to the smart contract.

```
{
	account_name: charger,
	asset: quantity,
	string: payment_code
}
```

else return nothing.