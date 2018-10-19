#Vyng Video Viewer (backend challenge)

### Instructions
- .env file needed to connect to MLab (emailed to you)
- mongod needs to be running locally to run tests

### Feature Set

On a basic level, it's an app to relate users, channels, and videos to one another & then to correspondingly view those videos.

##### Create
- Create a user using a username (must be unique in the system)
- Create a channel (using a channel name) related to that user
- Create a video with a related user and channel using a YouTube link
- Add hashtags to videos

##### View Videos
- Select a user --> corresponding channel
- View tags created in that channel and select one
- View videos related to that tag and upon click, view that video

### Future

There's so much I could do with this, but here are a few:
- need to add more error alerts to the user, like if the username they try to create is not unique.
- while doing the frontend, I added more endpoints, which I would need to add tests for
- since I didn't design the backend for the current frontend, I would need to look at the backend to see if I can refactor to make it work more efficiently (but while working on it, the thought I had was that such a refactor would be highly dependent on future feature sets)
- obviously, improve the UX; I tried to complete this without spending too much time trying to fine-tune the UX
- for the UX, have some kind of preview for the YouTube embed box
- add tests for the frontend
- consider adding Redux...more if this were to be a bigger project
- create a hashtag controller (instead of sticking it in video)
- make a mobile design
- get youtube video titles
