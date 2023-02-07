import {ref} from "vue";
import {defineStore} from "pinia";
import SongsProvider from "../providers/SongsProvider";

export const useSongsStore = defineStore("songs", () => {
    const albums = ref([]);
    const songs = ref([]);
    const favorites = ref([]);
    const songProvider = new SongsProvider();

    const getAlbums = async (offset = 0, total = 20) => {
        await songProvider.authorize();
        albums.value = await songProvider.getAlbums();
    }

    return {songs, favorites, albums, getAlbums};

}, {
    persist: {
        paths: ['favorites','albums']
    }
});
