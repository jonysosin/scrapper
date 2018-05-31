# Scrapper

Table of contents
=================

<!--ts-->
   * [Installation](#installation)
   * [Table of contents](#table-of-contents)
   * [How to run it](#how-to-run-it)
   * [Postman Collection](#postman-collection)
   * [Ganymede Endpoints](#ganymede-endpoints)
        * [Public Endpoints](#public-endpoints)
        * [Private Endpoints](#private-endpoints)
        * [Authentication between apps](#authentication-between-apps)
   * [Themisto Endpoints](#themisto-endpoints)
<!--te-->

## Installation
```sh
$ git clone https://github.com/jonysosin/scrapper.git

$ cd ganymede/ 
$ npm install 

$ cd themisto/
$ npm install 
```

## How to run it
You should execute each `npm start` in diferents terminal to 
```sh
$ cd ganymede/ 
$ npm start 
```

```sh
$ cd themisto/
$ npm start 
```

## Postman Collection
`Postman Collection https://www.getpostman.com/collections/0114d224c9a2ea051c60`

# Ganymede endpoints
## Public Endpoints

### Product Search
_This endpoint is in charge of generating a "Search Order", which is processed in themisto. This returns an SearchOrderID to check the status_

`POST http://localhost:3131/api/product/search`

_Example of request body_
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
### Search Order List
_This endpoint will return a list of the search orders that exists in the database._

`GET http://localhost:3131/api/product/search-order/list`

_Example of response_
```json
[
    {
        "status": "processed",
        "updated": "2018-05-31T15:09:40.586Z",
        "id": "5b101034ea53cd169620bd02"
    },
    {
        "status": "failed",
        "updated": "2018-05-31T15:11:11.523Z",
        "id": "5b10108fc583d61eb392b0c3"
    },
    {
        "status": "processed",
        "updated": "2018-05-31T16:03:44.082Z",
        "id": "5b101ce014c94232aec14fcd"
    }
]
```
### Search Order By ID
_This endpoint will receive a searchOrderId as a query string, and must return a JSON with the
status of the searchOrder and the results associated to the search order itself._

`GET http://localhost:3131/api/product/search-order/{searchOrderID}`

_Example of request_

`GET http://localhost:3131/api/product/search-order/5b101ce014c94232aec14fcd`

_Example of response_
```json
{
    "searchOrder": {
        "status": "processed",
        "_id": "5b101ce014c94232aec14fcd",
        "updated": "2018-05-31T16:03:44.082Z",
        "__v": 0
    },
    "products": [
        {
            "images": [
                "\"https://easyar.scene7.com/is/image/EasyArg/1156245003_1?fit=constrain,1&wid=56&hei=56&fmt=jpg\"",
                "\"https://easyar.scene7.com/is/image/EasyArg/1156245003_4?fit=constrain,1&wid=56&hei=56&fmt=jpg\""
            ],
            "_id": "5b101d4c14c94232aec14fce",
            "title": "Mesa Con Bandeja 56x35x62 Amarillo",
            "sku": "1156245003",
            "regularPrice": "890",
            "productCategory": "Muebles de Interior | Comedor | Mesas | ",
            "description": "Código de artículo: 1156245003\nMesa Con Bandeja 56x35x62 Amarillo\nTipo:\n \nMesa Auxiliar\nColor:\n \nAmarillo\nMaterial:\n \n-\nMarca:\n \nM+Design\nDimensiones:\n \n56x35x62 Cm\n \n",
            "category": "5b0fe31841c4fc5df8dc9461",
            "searchOrderID": "5b101ce014c94232aec14fcd",
            "__v": 0
        },
        {
            "images": [
                "\"https://easyar.scene7.com/is/image/EasyArg/1021731?fit=constrain,1&wid=56&hei=56&fmt=jpg\""
            ],
            "_id": "5b101d4c14c94232aec14fcf",
            "title": "Plato Postre Clásico Amarillo",
            "sku": "1021731",
            "regularPrice": "179",
            "productCategory": "Bazar Y Hogar | Mesa | Vajilla | ",
            "description": "Código de artículo: 1021731\nPlato Postre Clasico Amarillo\nTipo:\n \nPlato Postre\nColor:\n \nAmarillo\nMaterial:\n \nCerámica\nMarca:\n \nCotidiana\n \n",
            "category": "5b0fe35441c4fc5df8dc9463",
            "searchOrderID": "5b101ce014c94232aec14fcd",
            "__v": 0
        },
        {
            "images": [
                "\"https://easyar.scene7.com/is/image/EasyArg/1139177?fit=constrain,1&wid=56&hei=56&fmt=jpg\""
            ],
            "_id": "5b101d4c14c94232aec14fd0",
            "title": "Plato Postre Cerámica Donna Amarillo",
            "sku": "1139177",
            "regularPrice": "79",
            "productCategory": "Bazar Y Hogar | Mesa | Vajilla | ",
            "description": "Código de artículo: 1139177\nPlato Postre Cerámico Amarillo Donna\nTipo:\n \nPlato Postre\nColor:\n \nAmarillo\nMaterial:\n \nCerámica\nMarca:\n \nCotidiana\n \n",
            "category": "5b0fe35441c4fc5df8dc9463",
            "searchOrderID": "5b101ce014c94232aec14fcd",
            "__v": 0
        }
    ]
}
```
### Get Products by CategoryID
_This endpoint will receive a categoryId as a query string, and must return an array with all the
products associated to the given category._

`GET http://localhost:3131/api/product/category/{productCategoryID}`

_Example of request_

`GET http://localhost:3131/api/product/category/5b0fe35441c4fc5df8dc9463`

_Example of response_
```json
[
    {
        "images": [
            "\"https://easyar.scene7.com/is/image/EasyArg/1139177?fit=constrain,1&wid=56&hei=56&fmt=jpg\""
        ],
        "_id": "5b0fe36041c4fc5df8dc9465",
        "title": "Plato Postre Cerámica Donna Amarillo",
        "sku": "1139177",
        "regularPrice": "79",
        "productCategory": "Bazar Y Hogar | Mesa | Vajilla | ",
        "description": "Código de artículo: 1139177\nPlato Postre Cerámico Amarillo Donna\nTipo:\n \nPlato Postre\nColor:\n \nAmarillo\nMaterial:\n \nCerámica\nMarca:\n \nCotidiana\n \n",
        "category": "5b0fe35441c4fc5df8dc9463",
        "searchOrderID": "5b0fe2d341c4fc5df8dc9460",
        "__v": 0
    },
    {
        "images": [
            "\"https://easyar.scene7.com/is/image/EasyArg/1021731?fit=constrain,1&wid=56&hei=56&fmt=jpg\""
        ],
        "_id": "5b101d4c14c94232aec14fcf",
        "title": "Plato Postre Clásico Amarillo",
        "sku": "1021731",
        "regularPrice": "179",
        "productCategory": "Bazar Y Hogar | Mesa | Vajilla | ",
        "description": "Código de artículo: 1021731\nPlato Postre Clasico Amarillo\nTipo:\n \nPlato Postre\nColor:\n \nAmarillo\nMaterial:\n \nCerámica\nMarca:\n \nCotidiana\n \n",
        "category": "5b0fe35441c4fc5df8dc9463",
        "searchOrderID": "5b101ce014c94232aec14fcd",
        "__v": 0
    }
]
```

## Private Endpoints
### Callback Create Products (private)
_This endpoint will receive a searchOrderID and an array of products, this is called when themisto finish crawl process, endpoint is private and `Basic Auth` is required, the credentials are in `config/default.json`._ 

`POST /api/product/callback-scrapper` 

### Authentication between apps
When crawl process is finished, themisto calls to ganymede and send the products using `Basic Auth` stored in `config/`, these credentials can be edited changing `config/default.json` file in both apps.

## Themisto Endpoints
_This endpoint will receive a searchOrder, queryString and callbackURL. It will start to crawl the site, after that, the application will call to callbackURL endpoint using `Basic Auth` with the credentials in `config/default.json`._ 

`POST /api/scrap` 