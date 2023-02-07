import {ref} from "vue";
import {defineStore} from "pinia";
import SongsProvider from "../providers/SongsProvider";

export const useSongsStore = defineStore("songs", () => {
    const albums = ref([]);
    const favorites = ref([]);
    const pagination = ref({offset: 0, total: 20});

    const songProvider = new SongsProvider(pagination.value.offset, pagination.value.total);

    const getAlbums = async () => {
        const offset = pagination.value.offset;
        const total = pagination.value.total;
        let response;
        try {
            response = await songProvider.getAlbums(offset, total);
            albums.value = response.albums;
        } catch (e) {
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

    return {favorites, albums, pagination, getAlbums};

}, {
    persist: {
        paths: ['favorites', 'albums', 'pagination']
    }
});
