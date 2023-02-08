# 57-hits

In this repository I will share the result of 57Hits, the 57Blocks's technical test 🚀.
For this project I chose the music API option. I decided to implement the Spotify Web API throw Client Credentials authentication. 

## If a picture is worth a thousand words, imagine a video:
The features shown in this video are the following:

- 0:12 - 0:19 Email and password validation .
- 0:20 - 0:21 The user session is persisted over page reloads, also previous api calls to the albums endpoint.
- 0:22 - 0:35 Details page (show the album songs, listen to the song preview and add them to favorites).
- 0:47 - 0:50 API pagination (request another 20 music albums).
- 0:53 - 1:00 Favorites page.
- 1:00 - 1:05 App state persisted over page reloads (favorites pages). 

https://user-images.githubusercontent.com/55632072/217556438-bd71e4f5-224f-4d2b-aceb-6f7f5e301ee6.mp4


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
