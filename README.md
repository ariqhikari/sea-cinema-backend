## About SEA CINEMA Backend

SEA CINEMA Backend is a Restful API integrated with the [SEA CINEMA](https://github.com/ariqhikari/sea-cinema-frontend)

## Table of contents

- [Demo](#demo)
- [Features](#features)
- [Technology](#technology)
- [Installation](#installation)
- [License](#license)

## Demo

Checkout the API Demo [here](https://api-sea-cinema.auroraweb.id/api).

## Features

- Auth
- Now Playing Movies
- Select Showtimes
- E-Wallet (for ticket transaction)

## Technology

- [NodeJS](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)

## Installation

Clone the repo:

```shell
git clone https://github.com/ariqhikari/sea-cinema-backend.git
cd sea-cinema-backend
```

Create file .env and insert

```shell
PORT=8000
DB_URL=sea_cinema
JWT_SECRET=af?>!@D12%*!__4+_+_fak123
```

You can install the dummy SQL database [here](https://github.com/ariqhikari/sea-cinema-backend/blob/main/sea_cinema.sql).

After that, run your application:

```shell
npm install
npm run start
```

## License

The project is under the [MIT license](https://github.com/ariqhikari/sea-cinema-frontend/blob/main/LICENSE).
