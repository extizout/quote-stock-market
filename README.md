## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

### Node run time

```bash
# copy env example 
cp .env.example .env

# Generate Swagger required if env MODE is not "production" 
$ npx nestia swagger

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Docker

```bash
# copy env example 
cp .env.example .env

# Docker Compose up d option for detached mode
$ docker-compose up -d 
$ docker compose up -d 

```

## API Documentation

### Swagger if env MODE is not "production"
``````
http://localhost:${API_PORT}/api/doc
``````

### Postman Collection
``````
import quote_stock_market.postman_collection.json into Postman Application 
``````

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Dependencies
- pdf2pic - [require graphicsmagick and ghostscript](https://www.npmjs.com/package/pdf2pic#)
