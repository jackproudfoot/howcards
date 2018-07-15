# Howcards

A platform built to organize and serve how-to information.

### Running

To start the Howcards server simply run the following command in the *backend* directory. This will start the server on the port specified in package.json with the latest production build of the frontend.

```bash
npm start
```

#### Backend
The backend is built using Node.js with the Express framework. The routing is split between mulitple files that can all be found in the *routes* directory in the backend. The majority of the backend serves as an API for the frontend which also allows other frontend interfaces to be developed using this API. The card, deck, and user data is stored in a mongodb database.

#### Frontend
The frontend is built using React and using the Material-UI framework. The backend serves a production build of the frontend which must be re-built if changes are made to the frontend.

Simply run the following command inside the *frontend* directory to create the production build which is then moved to the *backend/build* directory.
```bash
npm run build
```


### Backend API

The API may be accessed at the /api endpoint.
| Request | Route | Response | Authentication Required |
| ----- | --- | --- | ------------------ |
| GET | /board | An array containing all of the approved cards. | No |
| GET | /card/:id | The card with id | No |
| POST | /card/delete/id | Deletes the card | Yes |
| GET | /deck/all | An array containing all decks | No |
| GET | /deck/:id | The deck with id | No |
| POST | /deck/delete/id | Deletes the deck | No |
| GET | /user/:id | The user with id | No |
| POST | /new/card | A new blank card| No |
| POST | /new/deck | A new empty deck | No |
| POST | /save/c/:id | The saved card | Yes |
| POST | /save/d/:id | The saved deck | Yes |
| GET | /auth/user/:email | The user with email | No |
| GET | /moderate/users | An array of all moderators | No |
| POST | /moderate/user/permissions | The user with updated permissions | Yes |
| POST | /moderate/card/ | The approved card | Yes |
| POST | /moderate/deck | The approved deck | Yes |
| GET | /moderate/cards | An array of cards pending approval | No |
| GET | /moderate/settings | The current settings | No |
| POST | moderate/changeSettings | The updated settings | Yes |
| POST | /moderate/deleteBlanks | Deletes the blank cards and decks | Yes |



