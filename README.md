# POKEAPP FULL STACK MEAN
---
## Demo App: https://clissmancamacho.github.io/pokeApp/
### Admin Credentials:
```text
email: admin@example.com
pass: password
```
---
# BASIC STEPS
## 1) Clone Project
---

# SETUP BACKEND

## 1) Go to backend folder

## 2) Install dependencies

```bash
npm install
```

### 3) Make in the root the .env file and paste this code with your own config:

```js
PORT=YOUR_PORT
DB_HOST='mongodb://localhost:YOUR_PORT/YOUR_DATABASE'
SECRET_TOKEN=YOUR_SECRET_KEY
DEFAULT_ROL=5d8d932f7ce3c41c4971476e
TOKEN_HOURS_EXPIRE=HOURS_YOU_DESIRE_TO_EXPIRE_JWT
```
### For example:

```js
PORT=8105
DB_HOST=mongodb://localhost:27017/db_pokeApp
SECRET_TOKEN=pokeAppForcast
DEFAULT_ROL=5d8d932f7ce3c41c4971476e
TOKEN_HOURS_EXPIRE=24
```
---

# SETUP FRONTEND

## 1) Go to frontend folder

## 2) Install dependencies

```bash
npm install
```
### 3) Go to src/environments and config your environments vars:

```js
apiUrl: YOUR_API_NODE_URL,
pokeApiUrl: 'https://pokeapi.co/api/v2/',
pokedexLimit: YOUR_POKEDEX_POKEMON_LIMIT
```
### For example:

```js
apiUrl: 'http://localhost:8105/api/v1/',
pokeApiUrl: 'https://pokeapi.co/api/v2/',
pokedexLimit: 25
```
---

# RUN PROJECT:

## 1) Go to root folder (You must see backend and frontend folders)

## 2) Run and wait a seconds for angular and node building and angular open a navigator tab with the frontend
```bash
npm start
```
### 3) Admin Credentials:
```text
email: admin@example.com
pass: password
```

### 4) Enjoy!
