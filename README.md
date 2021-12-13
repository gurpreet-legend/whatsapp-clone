# Whatsapp Clone

## Environment set-up

* Fork this repository and clone it on your device using command `git clone <your_repo_url>`
* In the terminal, 
    * `cd server` and run command `npm run start` to start the server
    * `cd client` and run command `npm run start`
* Create a firebase project and in the clients folder create a `.env` file and add the firebaseConfig parameters in your `.env` files just like this : 
```md
REACT_APP_API_KEY=xxxxxxxxxx
REACT_APP_AUTH_DOMAIN=xxxxxxxxxx
REACT_APP_PROJECTID=xxxxxxxxxx
REACT_APP_STORAGE_BUCKET=xxxxxxxxxx
REACT_APP_MESSAGING_SENDER_ID=xxxxxxxxxx
REACT_APP_APP_ID=xxxxxxxxxx
```

* And in the firebase project, go to Firestore DataBase and create a collection named rooms, just like this :
<img src="https://i.ibb.co/xsh3PW4/Screenshot-2021-12-13-223432.png" alt="Screenshot-2021-12-13-223432" border="0">

