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
buyer 查询数据库
table charge_infos
scope charge_infos
主键 string_to_account_name(payment_code)
使用get(string_to_account_name(payment_code))查找