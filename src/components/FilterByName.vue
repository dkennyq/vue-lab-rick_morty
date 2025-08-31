<template>
    <div class="search">
        <input 
            type="text"
            placeholder="Search by name..."
            @keyup="filter()"
            v-model="name" />
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
    setup () {
        const store = useStore();
        const name = ref('');

        const filter = () => {
            store.dispatch('filterByName', name.value);
        }

        return {
            name,
            filter
        };
    }
}
</script>

<style lang="scss" scoped>
.search {
    width: 400px;
    margin: 3rem auto 0;
    input {
        height: 53px;
        width: 400px;
        border: none;
        border-radius: 10px;
        padding: 0 0.5rem;
    }
}
</style>