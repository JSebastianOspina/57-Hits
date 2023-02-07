import {ref} from "vue";
import {defineStore} from "pinia";
import SongsProvider from "../providers/SongsProvider";

export const useSongsStore = defineStore("songs", () => {
    const albums = ref([]);
    const favorites = ref([]);
    const pagination = ref({offset: 0, total: 20});
    const selectedAlbum = ref({album: {}, songs: []});

    const songProvider = new SongsProvider(pagination.value.offset, pagination.value.total);

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
            console.log('An error ocurred');
            return;
            await songProvider.authorize();
            const response = await songProvider.getAlbum(albumId);
            selectedAlbum.value = {
                album: response.album,
                songs: response.songs
            };
        }

    }

    return {favorites, albums, pagination, selectedAlbum, getAlbums, getAlbum};

}, {
    persist: {
        paths: ['favorites', 'albums', 'pagination']
    }
});
