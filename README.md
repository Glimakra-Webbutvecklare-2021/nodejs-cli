# About
This is a collection repo of several small CLI apps
1. Logger (oldFiles/logging.js)
2. Quote of the day (oldFiles/qod.js)
3. Quote of the day with file writing (oldFiles/quote.js)
4. Todo app (app.js)

## Run todo app
1. `npm install`
2. `node app.js [command]`

## Architecture of Todo app
The responsibilitys of the Todo app is follow the Model-View-Controller Design Pattern.

|file     | description |
|---------|-------------|
| `app.js` | The entry of the app. The home of the router that directs commands to methods of the controller. |
| `controllers/main.js` | The main controller of the app. Responsible of what happens, which view and what to update in the DB via model. |
| `models/main.js` | The main model of the app. Responsible of updating the state of the app. Keep data up to date. |
| `view/main.js` | The main collection of views for the app. Responsible of keeping all viewable content to the user. |
