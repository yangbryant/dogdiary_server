# dogdiary_server

* mongo数据备份

```
mongodump -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 -c Collection名 -o 文件存在路径  

```

* mongo数据还原

```
mongorestore -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 --drop 文件存在路径  
```