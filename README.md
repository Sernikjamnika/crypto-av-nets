# crypto-av-nets

It's best to have _nvm_ installed as a node version manager.

# Requirements

- node >= 10.x.x (developed on 14.x.x)

# Installation

```
npm ci
```

# Start server

Listens for file changes (_nodemon_)

```
npm start
```

# API

## Create group (POST /group)

```
curl -kd '{"question":"Lorem ipsum", "n":"4"}' -H "Content-Type: application/json" -X POST https://localhost:3000/group
```

## Get group data (GET /group/:id)
### Request
```
curl https://localhost:3000/group/1
```
### Example response
```
{
   "id":"1",
   "group":{
      "p":789,
      "q":567,
      "g":31,
      "G":[
         1,
         2,
         3
      ]
   },
   "n":"4",
   "question":"Lorem ipsum",
   "publicKeys":[
      234,
      235,
      236,
      237
   ],
   "answers":[
      123,
      124,
      125,
      126
   ]
}
```

## Join group (POST /group/:id/join)

```
curl -kd '{ "pubKey": 234 }' -H "Content-Type: application/json" -X POST https://localhost:3000/group/1/join
```

## Vote in group (POST /group/:id/vote)

```
curl -kd '{ "vote": 127 }' -H "Content-Type: application/json" -X POST https://localhost:3000/group/1/vote
```
