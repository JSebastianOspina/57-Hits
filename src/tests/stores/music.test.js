import {createPinia, setActivePinia} from 'pinia'
import {useMusicStore} from "@/stores/music";
import Song from "../../models/song";
import Album from "../../models/album";

describe('Music Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('addFavorite should add a new favorite to the favorites property of the store state', () => {
        const musicStore = useMusicStore();

        const newSong = new Song(1, 'Wrecking Ball', '', 10000, 'Miley Cyrus');
        musicStore.addFavorite(newSong)

        //Should have a length of one (since the store is initially empty) and should only contain the added object
        expect(musicStore.favorites).toHaveLength(1);
        expect(musicStore.favorites).toEqual([newSong]);
    });

    test('removeFavorite should remove the input song from favorites property of the store state', () => {
        const musicStore = useMusicStore();
        const song1 = new Song(1, 'Wrecking Ball', '', 10000, 'Miley Cyrus');
        const song2 = new Song(2, 'Another One Bites the Dust', '', 10000, 'Queen');

        //Populate the store
        musicStore.favorites = [song1, song2]

        //Remove song1
        musicStore.removeFavorite(song1)

        //Now it should be an array containing just song2.
        expect(musicStore.favorites).toEqual([song2]);

    });

    test('getAlbums should set an array of 20 Album objects to the property albums of the store state', async () => {
        const musicStore = useMusicStore();
        //Ensure is empty
        expect(musicStore.albums).toHaveLength(0)

        //Fetch the new albums
        await musicStore.getAlbums();

        //There must be 20 items (since the default pagination is set two 20 for each call)
        const expectedAlbumNumber = 20;
        expect(musicStore.albums).toHaveLength(expectedAlbumNumber);

        //Check if all elements are instance of the Album class
        expect(musicStore.albums.every(album => album instanceof Album)).toBeTruthy();

    });

    test('getAlbum should set a an Array of Songs objects and an Album object to property selectedAlbum of the store state', async () => {
        const musicStore = useMusicStore();
        //Ensure it starts with no album and an empty songs array
        expect(musicStore.selectedAlbum).toEqual({album: {}, songs: []})

        const arbitrarySpotifyAlbumId = '2GROf0WKoP5Er2M9RXVNNs';
        //Fetch the new albums
        await musicStore.getAlbum(arbitrarySpotifyAlbumId);

        //There must be 20 items (since the default pagination is set two 20 for each call)
        expect(musicStore.selectedAlbum.album).toBeInstanceOf(Album);

        //Check if all elements are instance of the Album class
        expect(musicStore.selectedAlbum.songs.every(song => song instanceof Song)).toBeTruthy();

    });


});