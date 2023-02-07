import Album from "../models/album";
import Song from "../models/song";

class SongsProvider {

    constructor(offset = 0, total = 20) {
        this.baseUrl = 'https://api.spotify.com/v1/';
        this.clientId = import.meta.env.VITE_APP_API_CLIENT_ID;
        this.clientSecret = import.meta.env.VITE_APP_API_CLIENT_SECRET;
        this.accessToken = null;
        this.offset = offset;
        this.total = total;
    }

    async getAlbums(offset, total) {
        if (this.accessToken === null) {
            await this.authorize();
        }

        const endpoint = `browse/new-releases?offset=${offset}&total=${total}`;
        const url = this.baseUrl + endpoint;

        try {
            const headers = this.getAuthenticatedRequestHeaders()

            const request = await fetch(url, {
                method: 'GET',
                headers,
            })
            const response = await request.json();
            const albums = response.albums.items;
            const hasMorePages = (offset + total) < response.albums.total;
            return {
                albums: albums.map((album) => new Album(album.id, album.name, album.images[0].url, album.artists[0].name)),
                hasMorePages
            };
        } catch (e) {
            throw new Error('Error fetching album');
        }
    }

    async getAlbum(albumId) {
        if (this.accessToken === null) {
            await this.authorize();
        }

        const endpoint = `albums/${albumId}`;
        const url = this.baseUrl + endpoint;

        try {
            const headers = this.getAuthenticatedRequestHeaders()
            const request = await fetch(url, {
                method: 'GET',
                headers,
            })
            const response = await request.json();
            const songs = response.tracks.items;
            return {
                album: new Album(response.id, response.name, response.images[0].url, response.artists[0].name),
                songs: songs.map((song) => {
                    return new Song(song.id, song.name, song.preview_url, song.duration_ms)
                })
            }
        } catch (e) {
            throw new Error('Error fetching album');
        }

    }

    getAuthenticatedRequestHeaders() {
        return {
            'Authorization': 'Bearer ' + this.accessToken,
            'Content-Type': 'application/json',
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
            this.accessToken = response.access_token;
        } catch (e) {
            console.log('error', e)
        }


    }

}

export default SongsProvider;