Chaser 

![Logo](https://raw.githubusercontent.com/cherkesky/chaser/master/src/assets/ChaserLogo.png)

### by Guy Cherkesky | [LinkedIn](http://linkedin.com/cherkesky) | [Website](http://cherkesky.com)

Chaser is an in-bar drinks sending app. It grabs you geolocation and allows you to 'check-in' to a bar in your proximity. Once your'e checked-in you will see all the other user from the gender of your choice that been checked in as well. You can send them a drink request and you can recieve drink request from others. Approving a drink request will open a limited chat with 3 messages per user (just for basic communicaiton like 'where are you sitting', 'what do you want to drink?') that will destruct itself after the chat is over. The users will be placed in a 30 minutes time out to allow them to get to know each other and not be destracted by other users.

I built this app after I noticed that conventional dating apps does not answer the need of a real world interaction kindler, and allow the users to dragged into an infinite corresponding that in most of the time leads to no real world connection. 

![Screencast 1](https://raw.githubusercontent.com/cherkesky/chaser/master/src/assets/chaser_gif1.gif)
![Screencast 2](https://raw.githubusercontent.com/cherkesky/chaser/master/src/assets/chaser_gif2.gif)
![Screencast 3](https://raw.githubusercontent.com/cherkesky/chaser/master/src/assets/chaser_gif3.gif)

## Details


#### Technology Stack: 
- JS: Vanilla Javascript, React
- Styles: Styled Components, Framer Motion (for some of the animations)
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