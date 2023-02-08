import {mount} from '@vue/test-utils'
import {createTestingPinia} from '@pinia/testing'
import TheFavoritesView from "../../components/TheFavoritesView.vue";
// import any store you want to interact with in tests
import Song from "@/components/Song.vue"

describe('TheFavoritesView', () => {

    test('Render the Song component when the store has been seeded', () => {
        const favoritesSeeder = [
            {
                id: "2CGhzWArXQZG86V1Ztv4Q2",
                name: "Mañana",
                previewUrl: "https://p.scdn.co/mp3-preview/b7f8983d8aef8fc9fae321c34bbfca60db2f7aea?cid=9b0b50626d744eaf8b2da24029c7a92c",
                duration: 192320,
                artist: "Ozuna"
            },
            {
                id: "4j6kId9QIqhoXvqHKgSKa0",
                name: "Grapejuice",
                previewUrl: "https://p.scdn.co/mp3-preview/71e626d72bda1f0fd57e5405105d1db313b0c495?cid=9b0b50626d744eaf8b2da24029c7a92c",
                duration: 191958,
                artist: "Harry Styles"
            }
        ]

        const wrapper = mount(TheFavoritesView, {
            shallow: true,
            global: {
                plugins: [
                    createTestingPinia({
                        initialState: {
                            music: {favorites: favoritesSeeder}, // start the counter at 20 instead of 0
                        },
                    }),
                ],
            },
        })

        //Get all song components.
        const songs = wrapper.findAllComponents(Song);
        //Must have two song components
        expect(songs).toHaveLength(2);
    });
});
