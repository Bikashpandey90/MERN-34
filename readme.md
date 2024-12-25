## Node Project
## Package.json
 -to manage the packages/dependencies
 -BE develop=>Dependency
            -Dev-dependency
            -Global dependency



* Never modify anything inside  node_modules/
* Never modify package-lock.json
* Never upload node_modules to git


### Architecture Define(monolith and microservice)
-  MVC Pattern(model view controller)model=>database view=>present(react) controller=>Business Logic Handler
  - Modular


### Node
-REST API Or SOAP or Graph
-CRUD=>Create ,Read,Update,Delete
-get,post,put/patch,delete

## Flow
-Route --> Controller/Modules/middleware

-index.js->src/config/express.config.js ->/src/router/router.js ->/src/modules/auth/auth.router.js

-slug
-->fb user->https:www.facebook.com/username


## Validation
- Joi,yup,zod,ajv,class_validator

## mongo database
 mongosh =to connect to local database
 use dbname(to create or switch database)
 db  -to check the available databases


 ## create operation
 - 2ways to insert data
 a.one ro/document at a time

 db.users.insertOne({NAME:"bIKASH",email:"bikashpandey@gmail.com",password:"Biash"})
 -response:{acknowledge:true,insertedId:ObjectId('hexcode')}

 b.multiple row/document at a time
 db.users.insertMany([{"name":"Ram Sharma","email":"ram.sharma@example.com","address":"Kathmandu","phone":"9801234567","password":"$2a$10$N9qo8uLOickgx2ZMRZo5e.PAC/FgvL5b/woZBqUvgr8T96mDsD70q","role":"admin"},{"name":"Sita Pandey","email":"sita.pandey@example.com","address":"Pokhara","phone":"9812345678","password":"$2a$10$E6eZcMND3cOycBRVO/FK6uKEQQO59IRRja.PD3pFJ9iSiLZEOZK9e","role":"seller"},{"name":"Hari Magar","email":"hari.magar@example.com","address":"Biratnagar","phone":"9841234567","password":"$2a$10$qwerT9Qdfpo3zMXIhiwuFusxjMn9Zh5QJHcAz1/JRz5MdRPzX.QhO","role":"customer"},{"name":"Gita Thapa","email":"gita.thapa@example.com","address":"Butwal","phone":"9743210987","password":"$2a$10$NolMpq0RS/UOpwnMiK0/L9R8n9AsWo0m93dszax7FT5pMMRU6gZyW","role":"seller"},{"name":"Krishna Rai","email":"krishna.rai@example.com","address":"Lalitpur","phone":"9807654321","password":"$2a$10$rApoP72DWtMWBqN2Xk3OLOwdfx6JNjNQ6oF2pFId2AIf.mfUd5EpK","role":"admin"},{"name":"Bikash Adhikari","email":"bikash.adhikari@example.com","address":"Chitwan","phone":"8787654321","password":"$2a$10$H1VRVRxz9q04wOw5wv/JRI7bsHppcMZI3HtyDhzzYr5XXYy6DGLz.","role":"customer"},{"name":"Mina Tamang","email":"mina.tamang@example.com","address":"Bhaktapur","phone":"9810987654","password":"$2a$10$TfgU8FGNJ79zqCpw74sNiT7jHGApOKPdZb5.BKyRlOlRo2vX/G.Ra","role":"seller"},{"name":"Kamal Gurung","email":"kamal.gurung@example.com","address":"Dharan","phone":"9823456789","password":"$2a$10$aX2uGjB6FkaLR9VZxpCq3OSmu4jSkZerCfoDfwwIjTPz63ZqqD5Ku","role":"customer"},{"name":"Shila Lama","email":"shila.lama@example.com","address":"Birgunj","phone":"8776543210","password":"$2a$10$Mn4VrNyHG8AhmCczCEl0Ze7wtCSU6X5Iz2PyS1EQPZn9X2bJx06MS","role":"seller"},{"name":"Ramesh Karki","email":"ramesh.karki@example.com","address":"Janakpur","phone":"9812341098","password":"$2a$10$V1lZEdI7zUw/Axy7/Yt7uB6oUqUZQ0WwEAL2x5Wg5N.4MfgqGE/kK","role":"admin"}
])

 -response:{acknowledge:true/false,insertedIds:ObjectId('hexcode')}


 ## read operation
-db.<collectionName>.find(filter)
-db.users.find()

## Filter
-filter=>null
eg:db.users.find()  //~ SELECT * FROM users;
-filter is an object data type
-{key:value/expression}or{ expression:key}
-expressions or key can be operators
eg{role:"admin"}=>  //~SELCT * FROM users where role='admin'
eg:{role:"admin',gender:"male"}


-age key number
-users with age>16

-eg:{age:{$gt:16}}

-user:{role:['admin','customer']}
{role:($in['admin','customer'])}

mongodb operators
-$gt,$gte,$lt,$lte,$or,$and,$in,$nin,$ne,$eq,$regex


{
  $and:[
    {role:"admin"},
    {gender:"female"}
  ]
}

db.users.find({$and:[{role:"admin"},{gender:"female"}]})



db.users.find(filter,projection)
db.users.find({role:"admin"},{name:1,email:1,_id:0})


db.users.find(filter,projection,sorting)
db.users.find({role:"admin"},{name:1,email:1,_id:0},{sort:{name/_id:"asc/desc"},limit;3,skip:3})

## Update operation(update)
-single operation
-db.<collectionName>.updateOne(filter,{set:{key:value}},options)
e.g.email

db.users.updateOne({email:"bikash@gmail.com"},{$set:{role:"admin"}})
db.users.updateOne({_id:ObjectId("id")},{$set:{role:"admin"}})


-multiple operation
-db.<collectionName>.updateMany(filter,{$set:{key:"value"}})


db.users.updateOne({email:"bikash@gmail.com"},{$set:{name:"Bikash",role:"admin"}},{{upsert:1}})


### Delete operation(delete)

-db.<collectionName>.deleteOne(filter)
-db.<collectionName>.deleteMany(filter)

## ORM or ODM


## Task:design all the necessary tables/schema for the ecommmerce
-Banner
-Brand
-Category
-user details
-product details
-order details
-payment details


## REST API
- we do not maintain states
-Login 2 key(token)
  -acessyoken
  -refresh token
-jwt token(Json Web Token)
-header+payload+signature
-header=>typ,algo
-payload=>data
-signature=>private key+public key/ jwt sectry
-Bearer type token



## Brand
-name,logo,slug,status,_id,createdBy,updatedBy,createdAt,updatedAt

## Category
-parentId,name,logo,slug,status,_id,createdBy,updatedBy,createdAt,updatedAt

## products
- _id,title,slug,category,brand,description,price,discount,images,seller,status,createdBy,updatedBy,createdAt,updatedAt
