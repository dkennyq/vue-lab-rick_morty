<template>
    <section>
        <div class="characters">
            <div class="characters__item" v-for="character in characters" :key="character.id">
                <CardCharacters :character="character" />
            </div>
        </div>
    </section>
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import CardCharacters from './CardCharacters.vue';

export default {
    components: {
        CardCharacters,
    },
    setup() {
        const store = useStore();
        const characters = computed(() => {
            return store.state.charactersFilter;
        });

        const isLoading = computed(() => store.state.isLoading);
        
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const visible = window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;
            
            // When the user has scrolled to within 100px of the bottom, fetch more characters.
            if (scrollY + visible >= pageHeight - 100 && !isLoading.value) {
                store.dispatch('fetchNextPage');
            }
        }
        
        onMounted(() => {
            store.dispatch('getCharacters');
            window.addEventListener('scroll', handleScroll);
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        return {
            characters,
        }
    },
};
</script>

<style lang="scss">
.characters {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    margin: 3rem 0;
}
</style>