# charge 
seller 像合约发起收款请求

- parameter:

```
{
	account_name: charger,
	asset: quantity,
	string: payment_code,
	account_name: payer_account
}
```

- return: void



# payer Polling ---- 
payer 查询数据库
table charge_infos
scope charge_infos
主键 string_to_account_name(payment_code)
使用get(string_to_account_name(payment_code))查找


# payer confirm
payer 确认付款

- parameter:
```
{
	payment_code: code
}
```

- return: void