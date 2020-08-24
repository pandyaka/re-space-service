# re-space-service

## Running apps locally
1. Start DB service in docker with
 
`docker-compose -f docker-compose.test.yml up -d`

2. Run DB migration with

`npm run migration:run`

3. Start application with 

`npm run start:dev`

Apps will be running on  `http://localhost:3000`

## Testing
### Running test on local machine
1. Start DB service in docker with 

`docker-compose -f docker-compose.test.yml up -d`

2. Run DB migration with 
 
`npm run migration:run`

3. Run test with

`npm run test`

### Running test with test PostgreSQL inside container
1. Run 

`npm run test:dockest`
