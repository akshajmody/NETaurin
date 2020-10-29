# NETaurin - ネット雨林

NETaurin - a rainforest of the NET

NETaurin is a React based application that allows users to make an account, access a dashboard that will retrieve the top 10 bestselling books on Amazon, and allow a user to submit reviews for each book.

## Technologies Used

- React
- React-Router
- Bootstrap
- Firebase Authentication
- Cloud Firestore

## Simple, functional UI

> Users are greeted with a login screen with the option to create new accounts - authentication is done via Firebase
> <img src="https://i.ibb.co/Px073J3/Screen-Shot-2020-10-30-at-6-23-26-AM.png" width=800>
> After logging in, users will see the current top 10 bestselling books on Amazon, retrieved via Rainforest API
> <img src="https://i.ibb.co/MpCzM0p/Screen-Shot-2020-10-30-at-6-24-02-AM.png" width=800>
> Upon selecting a book, users can view and add reviews that update in real time via Cloud Firestore
> <img src="https://i.ibb.co/YBQ0TMY/Screen-Shot-2020-10-30-at-6-24-31-AM.png" width=800>

## Application Instructions

1. Fork then clone this repository locally.
2. From within the root directory:

```sh
npm install
```

3. Configure `.env.local` file with Firebase credentials and valid Rainforest API key. Please reach out to me for these credentials if needed.

4. Select from one of the below scripts to run the app in development mode or create a production build

## Available Scripts

### `npm start`

### `npm test`

### `npm run build`
