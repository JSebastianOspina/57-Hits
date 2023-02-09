# 57-hits

In this repository I will share the result of the 57Blocks's technical test that I decided to call 57Hits 🚀. For this
project I chose the music API option. The Spotify Web API throw Client Credentials authentication was implemented in
order to get the App content.

## If a picture is worth a thousand words, imagine a video:

The features shown in this video are the following:

- 0:12 - 0:19 Email and password validation.
- 0:20 - 0:21 The user session is persisted over page reloads, also previous api calls to the albums endpoint.
- 0:22 - 0:35 Details page: show the album songs, add them to favorites and **listen to the song preview** (this was an extra detail that I decided to add 🤓). Please note that this feature is not available for all Songs (this is a Spotify API restriction).
- 0:47 - 0:50 API pagination (request another 20 music albums).
- 0:53 - 1:00 Favorites page.
- 1:00 - 1:05 App state persisted over page reloads (favorites pages).

https://user-images.githubusercontent.com/55632072/217556438-bd71e4f5-224f-4d2b-aceb-6f7f5e301ee6.mp4

### Want to see it by yourself ?

Feel free to visit the following URL 👉🏼 https://57-hits.vercel.app/

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run tests
```sh
npm test
```

