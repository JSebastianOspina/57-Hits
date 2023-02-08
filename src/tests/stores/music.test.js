import {setActivePinia, createPinia} from 'pinia'
import {useMusicStore} from "@/stores/music";
import Song from "../../models/song";

describe('Music Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('addFavorite should add a new favorite to the favorites property', () => {
        const musicStore = useMusicStore();

        const newSong = new Song(1, 'Wrecking Ball', '', 10000, 'Miley Cyrus');
        musicStore.addFavorite(newSong)

        //Should have a length of one (since the store is initially empty) and should only contain the added object
        expect(musicStore.favorites).toHaveLength(1);
        expect(musicStore.favorites).toEqual([newSong]);
    });

    test('removeFavorite should remove from favorites the input song', () => {
        const musicStore = useMusicStore();
        const song1 = new Song(1, 'Wrecking Ball', '', 10000, 'Miley Cyrus');
        const song2 = new Song(2, 'Another One Bites the Dust', '', 10000, 'Queen');

        //Populate the store
        musicStore.favorites = [song1,song2]

        //Remove  song1
        musicStore.removeFavorite(song1)

        expect(musicStore.favorites).toEqual([song2]);

    });

    test('removeFavorite should remove from favorites the input song', () => {
        const musicStore = useMusicStore();
        const song1 = new Song(1, 'Wrecking Ball', '', 10000, 'Miley Cyrus');
        const song2 = new Song(2, 'Another One Bites the Dust', '', 10000, 'Queen');

        //Populate the store
        musicStore.favorites = [song1,song2]

        //Remove  song1
        musicStore.removeFavorite(song1)

        expect(musicStore.favorites).toEqual([song2]);

    });

});