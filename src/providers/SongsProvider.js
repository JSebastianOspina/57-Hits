import Album from "../models/album";
import Song from "../models/song";
import UnauthenticatedException from "../Exceptions/UnauthenticatedException";
import UnexpectedErrorException from "../Exceptions/UnexpectedErrorException";

class SongsProvider {

    constructor(offset = 0, total = 20) {
        this.baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
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
        const headers = this.getAuthenticatedRequestHeaders()

        const request = await fetch(url, {
            method: 'GET',
            headers,
        })
        if (request.status === 401) {
            throw new UnauthenticatedException('The request did not have a valid Bearer token');
        }
        try {
            const response = await request.json();
            const albums = response.albums.items;
            const hasMorePages = (offset + total) < response.albums.total;

            const albumObjects = albums.map((album) => new Album(album.id, album.name, album.images[0].url, album.artists[0].name));
            return {
                albums: albumObjects,
                hasMorePages
            };
        } catch (e) {
            throw new UnexpectedErrorException('There was an unexpected error');
        }

    }


    async getAlbum(albumId) {
        if (this.accessToken === null) {
            await this.authorize();
        }

        const endpoint = `albums/${albumId}`;
        const url = this.baseUrl + endpoint;

        const headers = this.getAuthenticatedRequestHeaders();
        const request = await fetch(url, {
            method: 'GET',
            headers,
        })
        if (request.status === 401) {
            throw new UnauthenticatedException('The request did not have a valid Bearer token');
        }
        try {
            const response = await request.json();
            const songs = response.tracks.items;

            const songsAsObjects = songs.map((song) => {
                return new Song(song.id, song.name, song.preview_url, song.duration_ms, response.artists[0].name)
            });
            const album = new Album(response.id, response.name, response.images[0].url, response.artists[0].name);
            return {
                album,
                songs: songsAsObjects
            }
        } catch (e) {
            throw new UnexpectedErrorException('There was an unexpected error');
        }

    }

    getAuthenticatedRequestHeaders() {
        return {
            'Authorization': 'Bearer ' + this.accessToken,
            'Content-Type': 'application/json',
        }
    }

    async authorize() {
        const url = import.meta.env.VITE_APP_API_AUTH_URL;
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
            throw new UnexpectedErrorException('There was an unexpected error');
        }


    }

}

export default SongsProvider;