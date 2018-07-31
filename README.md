# auth-manage
Universal auth management based on RBAC

基于RBAC的通用权限管理，可以添加用户、用户组，按照项目添加权限组和权限。

# 使用方法

```
const AuthManage = require('auth-manage');
let authManage = new AuthManage({
	host: '127.0.0.1',
	port: '3306',
	user: 'root',
	password: '123456789',
	database: 'authority',
	project: 'test'
});

// 或者
let connection = mysql.createConnection({
	host: '127.0.0.1',
	port: '3306',
	user: 'root',
	password: '123456789',
	database: 'authority'
});
let authManage = new AuthManage({
	connection: connection,
	project: 'test'
});
```

两种使用方式，一种是传入mysql的host、prot、账号、密码以及数据库名，在每次调用方法时都会先创建`connection`，然后销毁。另一种是先创建好`connection`，然后传给`AuthManage`对象，此时需要用户自己管理`connection`的销毁，多次调用时，此方式效率更高。

不管使用哪种方式，项目名称都是必填的。

# 方法

## 添加


### addUser({user_name: xxx})

添加用户(user_name必填)

例如：

```
authManage.addUser({
	user_name: 'user',
	user_email: 'user@123.com'
});
```

### addUsergroup({ug_name: xxx})

添加用户组(ug_name必填)

例如：

```
authManage.addUsergroup({
	ug_name: 'ug',
	ug_desc: 'ug_desc'
});
```

### addAuth({auth_name: xxx})

添加权限点(auth_name必填)

例如：

```
authManage.addAuth({
	auth_name: 'auth',
	auth_desc: 'auth_desc'
});
```

### addAuthgroup({ag_name: xxx})

添加权限组(ag_name必填)

例如：

```
authManage.addAuthgroup({
	ag_name: 'ag',
	ag_desc: 'ag_desc'
});
```

## 建立关系

包括用户和用户组、用户和权限点、用户和权限组、用户组和权限点、用户组和权限组、权限点和权限组之间的多对多关系。

### linkUserAndUg(user_name, ug_name)

建立用户和用户组的关系。

例如：

```
authManage.linkUserAndUg('user', 'ug');
```

### linkUserAndAuth(user_name, auth_name)

建立用户和权限点的关系。

例如：

```
authManage.linkUserAndAuth('user', 'auth');
```

### linkUserAndAg(user_name, ag_name)

建立用户和权限组的关系。

例如：

```
authManage.linkUserAndAg('user', 'ag');
```

### linkUgAndAuth(ug_name, auth_name)

建立用户组和权限点的关系。

例如：

```
authManage.linkUgAndAuth('ug', 'auth');
```

### linkUgAndAg(user_name, ug_name)

建立用户组和权限组的关系。

例如：

```
authManage.linkUgAndAg('ug', 'ag');
```

### linkAuthAndAg(auth_name, ag_name)

建立权限点和权限组的关系。

例如：

```
authManage.linkAuthAndAg('auth', 'ag');
```

## 查找用户是否有某项权限

### checkUserAuth(user_name, auth_name)

有返回true，没有返回false

```
authManage.checkUserAuth('user', 'auth');
```

查找流程：

1、查看用户是否存在

2、查看权限是否存在

3、查看用户是否直接拥有该权限

4、获取用户所属用户组，然后查找用户组是否直接拥有该权限

5、获取用户所属的权限组、获取用户组所属的权限组

6、查看权限组中是否包含该权限

以上任何一步确认该用户有该权限则返回true，否则执行完所有流程后返回false。