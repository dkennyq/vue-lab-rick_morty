<template>
    <div class="search">
        <input 
            type="text"
            placeholder="Search by name..."
            v-model="name" />
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, watch } from 'vue';

export default {
    setup () {
        const store = useStore();
        const name = ref('');
        let timeOut= null;

        watch(name, (newValue) => {
            if (timeOut) clearTimeout(timeOut);
            if (newValue.length < 3 && newValue.length !== 0) return; // Only search if 3 or more characters or empty for all.
            timeOut = setTimeout(() => {
                store.dispatch('filterByName', newValue);
            }, 300);
        });

        return {
            name,
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