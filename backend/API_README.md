#Vyng Backend Test API

### Request > Route > Data > Response

API expects data of type `JSON`.


| Method > endpoint | SEND | RECEIVE |
| -------------- |:--------------:| -----:|
| 'POST' > '/user' | `body: { name }` | `{ name }` |
| 'POST' > '/channel' | `body: { name, owner }` | `{ channel }` |
| 'GET' > '/channels' | `query = owner` | `[channels]` |
| 'POST' > '/video' | `body: { url, channel }` | `{ video }` |
| 'GET' > '/users' | `N/A` | `{ users }` |
| 'GET' > '/hashtag' | `query=tag` | `{ videos }` |