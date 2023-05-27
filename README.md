# Campr

Helping connect campers with private landowners for outdoor experiences off the beeten track.

## Stack

A next.JS typescript web application using JWT token authentication, with a CouchDB and nodejs backend.

## Set up backend

1. Clone master repository 
2. Install CouchDb
3. Add values to env.local
```
COUCHDB_URL="http://admin:camper111@localhost:5985"
COUCHDB_NAME=camperpro
JWT_SECRET="xxxx"
CLOUDANT_URL=https://[apikey]:[password]bluemix.cloudantnosqldb.appdomain.cloud
```
4. run the following command to set up local database views
```bash
node generate-views.js
```

5. run the following command to generate some local users
```bash
node generate-users.js
```

6. run the following command to generate some test campsites
```bash
node generate-campsites.js
```

## Run dev server

- yarn install
- yarn run dev to load local server

# Components

## `<ReadMore />`

This component does require some controls. Because a max-height has
to be set, you can only use when you know more or less how much
text you want to put in. Throughout the app, we must provide limits
to text inputs, so we can predict a max height and use this component
accordingly. For instance, when using for the `description` field in
the campsite profile, you know that we force a max character length of
500, so we can guess the height that the box needs to be. It doesn't
matter if it's a lot over, but if the max height is set too high, 
it affects the pacing of the animation and the delay of the collapse.

Anyway, try to be mindful of max heights which need to be set because the
default is only about 500px.

Aside from that, here the parameters to note. 
- `text` is the content
- `maxLines` is the starting number of lines to show
- `maxHeight` is where you need to set how high you think it will be
- `speed` is how fast it will contract and expand. Long text needs longer animation
- `withButton` is if you want it to show a button for the expand and contract instead of text
- `expandText` is like "Read more", or whatever you want the expand button to say
- `collapseText` is for the contract button

Only the `text` field is required, all others are optional, and here are the defaults:
- `expandText = 'Read More »'`
- `collapseText = '« Read Less »'`
- `maxLines = 3`
- `maxHeight = 23`
- `speed = 0.5`
- `withButton = false`

```
interface ReadMoreProps {
	text: string;
	maxLines?: number;
	maxHeight?: number; // Speed of transition in seconds
	speed?: number;
	withButton?: boolean;
	expandText?: string;
	collapseText?: string;
}
```

