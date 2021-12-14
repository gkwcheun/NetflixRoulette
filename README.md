# Netflix roulette app

## Setup

In this project directory you will have the backend and frontend directories which need to be run separately

### `npm install`

This repository includes the backend and frontend of this app. After cloning the repository, cd into backend and frontend and run npm install to install all dependencies

## Backend Scripts

To run the backend after installing depenencies, run the following:

### `npm start`

Runs the backend on http://localhost:4000

## Frontend Scripts

Please make sure the backend is running before starting the frontend. This app was developed to be server side rendered, to do so you must use webpack to bundle both the server rendering script as well as the react client code. Please execute the following npm commands in the same order to get the front end up and running.

### `npm run webpack:client`

used webpack to bundle the client for ssr

### `npm run webpack:server`

used webpack to bundle the server for ssr

### `npm run ssr`

starts the front end in server side rendering mode on http://localhost:8080
