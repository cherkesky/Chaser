
![Chaser](https://raw.githubusercontent.com/cherkesky/chaser/master/src/assets/ChaserLogo.png)

### by Guy Cherkesky | [LinkedIn](http://linkedin.com/in/cherkesky) | [Website](http://cherkesky.com)

Chaser is an in-bar drink sending app. It grabs your geolocation and allows you to 'check-in' to a bar in your proximity. Once you're checked-in, you will see all the other users who are checked in as well. You can send a drink request, and you can receive drink requests from others. Approving a drink request will open a limited chat with 3 messages per user (just for basic communication like 'where are you sitting', 'what do you want to drink?') that will self destruct after the chat is over. The users are then placed in a 30 minute time out to allow them to get to know each other and not be distracted by other users.

I built this app after I noticed that conventional dating apps do not answer the need of a real world interaction kindler and allow the users to be dragged into an infinite correspondance that most of the time leads to no real world connection. 

![Screencast 1](https://raw.githubusercontent.com/cherkesky/chaser/master/src/assets/chaser_gif1.gif)
![Screencast 2](https://raw.githubusercontent.com/cherkesky/chaser/master/src/assets/chaser_gif2.gif)
![Screencast 3](https://raw.githubusercontent.com/cherkesky/chaser/master/src/assets/chaser_gif3.gif)

## Details


#### Technology Stack: 
- JS: Vanilla Javascript, React
- Styles: CSS, Material UI
- Textures/Icons: All SVGs created by me in Figma
- API: Google Places, Google Maps, Cloudinary, WebAPI
- DB: JSON Server

## Running Locally

In the project directory, you can run:

first run from the /api directory:
### `json-server -p 5002 -w database.json`

and then from the project root directory:
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Cheers!