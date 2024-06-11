Task App Technical Assessment

Requirements to run app:
- Node.js installed on your computer
- Docker installed on your computer
- Docker Compose installed on your computer
- psql for database migration and seeding

Steps to run the BE app:
1. cd into the server folder
2. run `npm install` to install all dependencies
3. run `npm run build:db` to migrate and seed the database
4. Postgres should be running on a docker container. If not, run `docker-compose up dev-deb -d` to start the container
5. run `npm run start:dev` to start the server in development mode
6. You should be able to access the server at `http://localhost:3333`

Steps to run the FE app:
1. In another terminal, cd into the client folder
2. run `npm install` to install all dependencies
3. run `npm run start` to start the client
4. You should be able to access the client at `http://localhost:3000`
5. You can login with the following credentials: 
email: `admin@gmail.com`, password: `123`
email: `user@gmail.com`, password: `123`

*Note: The app is not fully responsive. It is best viewed on a desktop or laptop. Some of features may be buggy/ not working as intended. For example you need to click "sign in" twice to login and the drag and drop feature is not working. I am still working on these issues.
