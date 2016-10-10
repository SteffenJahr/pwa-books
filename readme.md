#PWA Books
This repository contains an example application to show how a progressive web app can work with Angular 2.

## Installation
###Api
To setup the Server Api you have to execute `npm install` in the directory _api_. To use notifications you also have to update the API-Key for [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/). You can update the Key in the file _api/src/controllers/notificationController.js_. Replace `YOUR_API_KEY_HERE` wir you own Firebase Api key.

###Client
To setup the Client Application you have to execute `npm install` in the directory _client_. In the application you also have to update a key to use Notifications. Please modify the `gcm_sender_id` (you get that after setting up your Firebase Cloud Messaging project) in the _manifest.json_ file. It is located in _client/src_.

## How to run the application
Before you start the appliction you have to start the Api. Therefore you only have to execute `npm start` in the directory `api`. Node will start an Api server with the address _http://localhost:8090_. 

To start the application run `npm start` in the directory `client`. The sample application will now be available on _http://localhost:8888_.
