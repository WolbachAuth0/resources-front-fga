
# Document Manager with FGA and Invitation Flow

This is the front end built with VueJS for a custom demonstration application. The demo app is meant to show how
to use the Okta FGA platform in a simple use case and to show how various user invitation flows can be put into
practice.

## IMPORTANT:

The the back end API of this application is kept in a separate repository. This application will not function without
the dedicated API in that project. The repository for that is here ...

https://github.com/WolbachAuth0/resources-api-fga.git


## Demo

A working example of this application is currently deployed [here](https://cic-external-api.herokuapp.com/).

// TODO: add instructions for using the app.

// TODO: add video of logging in to app, requesting credentials, requesting a token with Postman, demonstrating the cache'd tokens and using the access token to access the API.

// TODO: add diagram of the application architecture

// TODO: add a short description of how the pieces work.


## Environment Variables

To run this project, you will need to create environment files (listed below). The `.env` file will contain variables which are present in every environment, while the `.env.development` file holds the environment values which are specific to your local machine's development enviroment. 

```txt
.env
.env.development
```

The `.env` file contains values which are present in every environment. It must contain the following 

```txt
# Environment vars present in all environments
```

To run the application on your local machine, you'll need a development environment file. 

`.env.development`
```txt
# Environment vars present only when built for <environment> (enviroment = development or production)

```

## Installation

### Setup Okta Customer Identity Cloud (CIC)

// TODO: instructions for configuring Auth0 to use this application.

### Setup REDIS Enterprise Cloud

// TODO: instructions for configuring REDIS

### Download and Run the Project

Make sure that you have [NodeJS](https://nodejs.org/en) (v18 +), `npm` (v8.19.x +) and `git` installed on your machine.

In a terminal, cd to your favorite project directory then clone this repository. 

```bash
cd myProjects
git clone https://github.com/WolbachAuth0/resources-front-fga
```

Install the necessary node modules.

```bash
  cd this-project
  npm install
```

To run this locally you'll need to 

```bash
npm run dev
```

## Authors

- [@aaron.wolbach](https://www.github.com/WolbachAuth0)

## References

The following products form core technologies for this project. Links to them are provided for reference.

- [NodeJS](https://nodejs.org/en)
- [Okta CIC | Auth0](https://auth0.com)
- [REDIS Enterprise Cloud](https://redis.com/try-free/)
- [VueJS](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/en/)
