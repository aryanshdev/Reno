# Reno Task Submission

## About 
This repository contains the complete source code for the Web Development Internship Task - School Listing Site. THis project is built using NextJS, TailwindCSS and MySQL.
> ***Check Deployed Version : https://reno-task-pi.vercel.app/***
## Getting Started 

### Install Dependencies
First, run the npm install command:
```bash
npm i
# or
yarn install
```
This will install all dependencies required to run the project

### Create .env
Create .env file in root folder to contain these 2 variables required by API.
```
DBURL=<SQL DATABASE URL>
CLOUDINARY_URL=<CLOUDINARY URL>
```

### Run WebApp

Run the development server using:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints

## API Endpoints

This project exposes a simple API under /api/schools using the default NextJS Server.

1) GET /api/schools
- Returns a JSON array of all school records.

2) POST /api/schools
- Create a new school record.