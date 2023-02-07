import Album from "../models/album";

class SongsProvider {

    constructor() {
        this.baseUrl = 'https://api.spotify.com/v1/';
        this.clientId = import.meta.env.VITE_APP_API_CLIENT_ID;
        this.clientSecret = import.meta.env.VITE_APP_API_CLIENT_SECRET;
        this.accessToken = null;
    }

    async getAlbums() {
        const endpoint = 'browse/new-releases';
        const url = this.baseUrl + endpoint;

        try {
            const headers = {
                'Authorization': 'Bearer ' + this.accessToken,
                'Content-Type': 'application/json',
            }

            const request = await fetch(url, {
                method: 'GET',
                headers,
            })
            const response = await request.json();
            const albums = response.albums.items;

            return albums.map((album) => new Album(album.id, album.name, album.images[0].url, album.artists[0].name));
        } catch (e) {
            console.log('error', e)
        }

    }

    async authorize() {
        const url = 'https://accounts.spotify.com/api/token';
        const headers = {
            'Authorization': 'Basic ' + (btoa(this.clientId + ':' + this.clientSecret)),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        const body = {
            grant_type: 'client_credentials',
        }

        try {
            const request = await fetch(url, {
                method: 'POST',
                headers,
                body: new URLSearchParams(body)
            })
            const response = await request.json();
            console.log(response);
            this.accessToken = response.access_token;
        } catch (e) {
            console.log('error', e)
        }


    }

}

export default SongsProvider;