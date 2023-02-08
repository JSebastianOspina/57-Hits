import {ref} from "vue";
import {defineStore} from "pinia";
import SongsProvider from "../providers/SongsProvider";

export const useMusicStore = defineStore('music', () => {
    const albums = ref([]);
    const favorites = ref([]);
    const pagination = ref({offset: 0, total: 20});
    const selectedAlbum = ref({album: {}, songs: []});

    const songProvider = new SongsProvider(pagination.value.offset, pagination.value.total);

    const addFavorite = (song) => {
        favorites.value = [...favorites.value, song];
    }

    const removeFavorite = (song) => {
        favorites.value = favorites.value.filter((favorite) => {
            return favorite.id !== song.id
        });
    }
    const getAlbums = async () => {
        const offset = pagination.value.offset;
        const total = pagination.value.total;
        let response;
        try {
            response = await songProvider.getAlbums(offset, total);
            albums.value = response.albums;
        } catch (e) {
            await songProvider.authorize();
            response = await songProvider.getAlbums(offset, total);
            albums.value = response.albums;
        }
        if (response.hasMorePages) {
            pagination.value = {...pagination.value, offset: offset + total}
        } else {
            //Reset the counter
            pagination.value = {...pagination.value, offset: 0}
        }
    }

    const getAlbum = async (albumId) => {
        try {
            const response = await songProvider.getAlbum(albumId);
            selectedAlbum.value = {
                album: response.album,
                songs: response.songs
            };
        } catch (e) {
            selectedAlbum.value = {
                album: {},
                songs: []
            };
        }

    }

    return {favorites, albums, pagination, selectedAlbum, getAlbums, getAlbum, addFavorite, removeFavorite};

}, {
    persist: {
        paths: ['favorites', 'albums', 'pagination']
    }
});
