import {ref} from "vue";
import {defineStore} from "pinia";
import SongsProvider from "../providers/SongsProvider";
import UnauthenticatedException from "../Exceptions/UnauthenticatedException";
import UnexpectedErrorException from "../Exceptions/UnexpectedErrorException";

export const useMusicStore = defineStore('music', () => {
            const albums = ref([]);
            const favorites = ref([]);
            const pagination = ref({offset: 0, total: 20});
            const selectedAlbum = ref({album: {}, songs: []});
            const errorFetching = ref(false);

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
                } catch (e) {
                    if (e instanceof UnauthenticatedException) {
                        await songProvider.authorize(); //Re-auth in order to get another token
                        try {
                            response = await songProvider.getAlbums(offset, total);
                        } catch (e) {
                            //Couldn't complete the request successfully even after re-auth
                            albums.value = []; //clear state
                            errorFetching.value = true; //Send error to the views
                            return;
                        }
                    }
                    if (e instanceof UnexpectedErrorException) {
                        albums.value = []; //clear state
                        errorFetching.value = true; //Send error to the views
                        return;
                    }
                }
                errorFetching.value = false;
                albums.value = response.albums;

                if (response.hasMorePages) {
                    pagination.value = {...pagination.value, offset: offset + total}
                } else {
                    //Reset the counter
                    pagination.value = {...pagination.value, offset: 0}
                }
            }

            const getAlbum = async (albumId) => {
                let response;
                try {
                    response = await songProvider.getAlbum(albumId);
                } catch (e) {
                    if (e instanceof UnauthenticatedException) {
                        await songProvider.authorize();
                        try {
                            response = await songProvider.getAlbum(albumId);
                        } catch (e) {
                            errorFetching.value = true; //Send error to the views
                            return;
                        }
                    }
                    if (e instanceof UnexpectedErrorException) {
                        errorFetching.value = true; //Send error to the views
                        return;
                    }
                }
                //Assign the value to the store.
                selectedAlbum.value = {
                    album: response.album,
                    songs: response.songs
                };

            }

            return {
                favorites,
                albums,
                pagination,
                selectedAlbum,
                errorFetching,
                getAlbums,
                getAlbum,
                addFavorite,
                removeFavorite
            };

        },
        {
            persist: {
                paths: ['favorites', 'albums', 'pagination']
            }
        }
    )
;
