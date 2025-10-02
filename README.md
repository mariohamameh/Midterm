The 525 Presents:
WHITE SPACES EXHIBITION

A Virtual Gallery Template
=========

## Project Overview :

Project Specific Requirements
Option 8: Buy/Sell Listing Website

Web app designed as digital marketplace for art.


## ERD and User Story
Still in Developement: https://app.diagrams.net/#G1ot8x0qzHySC6tR81g4NNrO2CQOLjYqyr

## Project Requirements -> User Story & Functionality
- [] Finish User Story and ERD with full functionality
- [] Main Page: feature items randomized from Favourites
- [] Login Page: Cannot access site without login from registered user
- [] Registration Page: Register for account with username and password
- [] Converstaions: List of all items where buyer has messaged seller
- [] Items: Scroll thru list, filter on price, selecting items opens specific page, mark/unmark favourites, can be edited by admin
- [] Messages: Avaliable once user message buyers
- [] Add Item Page: Create Listing for new items 
  ### Login
[X] Have a profile with username and id # associated with account 
[X] Site remembers user once logged in
  ### Items
- [] Each item will have image, artist name, artist bio, price if avaliable, seller(admin) name
- [] Favourite items while browsing items
- [] If item is SOLD, cannot be favourites and removed from favourites
  ### Nav Bar
- [] Link to favorite items for easy access
[X] Search bar for items ("search by artist in placeholder")
[X] Return to main page
- [] Link to conversatitons
  ### Search and Filter 
[X] Filter search by price 
[X] Search and Filter artist
  ### Messaging & Conversations
- [] For each item, contact seller to inquire about purchasing an item via buil-in messager
- [] For each item, Contact seller to inquire about purchasing an item via email
- [] Messages are removed once an object is DELETED
  ### Roadmap & Stretch
- [] STRECH: Rate sellers to out of 5
- [] STRECH: Provide review for sellers
- [] STRECH: Timestamps for when a listing is posted 
- [] STRECH: Filter by Date listed (timestamps)
- [] STRECH: Like Items
- [] STRECH: Login via Google

## Project Requirements -> Admin(Seller) Story & Added Functionality
- [] Same functationality as User
  ### Items
- [] Post items which can be seen by others
- [] Mark items as SOLD
- [] DELETE items from site
  ### Messaging & Conversations
- [] View all message of all buyers
- [] View all message of on all items
- [] Respond to user messages, seperated by items
    ### Roadmap & Stretch
- [] STRECH: See number of likes on each item
- [] STRECH: Filter items based on number of likes
- [] STRECH: Filter items based on number of favourites



## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  username: `labber` 
  password: `labber` 
  database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Warnings & Tips

## Dependencies

Node.js
Express
EJS
pg
pg-native
chalk
body-parser
cookie-session
dotenv
morgan
node-sass-middleware
