# crypto-av-nets

It's best to have _nvm_ installed as a node version manager.

# Requirements
* node >= 10.x.x (developed on 14.x.x)

# Installation
```
npm ci
```

# Start server
Listens for file changes (_nodemon_)
```
npm start
```

# Example request
```
curl -kd '{"question":"Lorem ipsum", "n":"4"}' -H "Content-Type: application/json" -X POST https://localhost:3000/group
```