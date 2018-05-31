# Dillinger

Postman Collection https://www.getpostman.com/collections/0114d224c9a2ea051c60

### Installation
You should execute each `npm start` in diferents terminal to 
```sh
$ git clone https://github.com/jonysosin/scrapper.git

$ cd ganymede/ 
$ npm start

$ cd themisto/ 
$ npm start
```

### Ganymede endpoints

`POST http://localhost:3131/api/product/search`
```json
{
    "searchQuery": "Mesa amarilla",
    "provider": "easy",
    "options": {
        "user": "",
        "password": ""
    },
    "callbackUrl": "http://localhost:3131/api/product/callback-scrapper"
}
```
`GET http://localhost:3131/api/product/search-order/list`
Returns an array of search orders.

`GET http://localhost:3131/api/product/search-order/{searchOrderID}`
Returns search order details.

`GET http://localhost:3131/api/product/category/{productCategoryID}`
Returns products asociated to productCategoryID.
