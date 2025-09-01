<template>
    <div class="filter">
        <div class="item" 
            :class="{ active: selectedStatus === '' }"
            @click="filter('')">
            All
        </div>
        <div class="item" 
            :class="{ active: selectedStatus === 'Alive' }"
            @click="filter('Alive')">
            Alive
        </div>
        <div class="item"
            :class="{ active: selectedStatus === 'Dead' }"
            @click="filter('Dead')">
            Dead
        </div>
        <div class="item" 
            :class="{ active: selectedStatus === 'unknown' }"
            @click="filter('unknown')">
            Unknown
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
    setup() { 
        const store = useStore();
        const selectedStatus = computed(() => store.state.selectedStatus);

        const filter = ((status) => {
            store.dispatch('filterByStatus', status);
        });
        
        return {
            filter,
            selectedStatus,
        };
    }
};

</script>

<style lang="scss" scoped>
.filter {
    width: 400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-radius: 10px;
    overflow: hidden;
    .item {
        padding: 1rem 0.5rem;
        background-color: var(--background-card);
        text-align: center;
        cursor: pointer;
        &:hover {
            color: var(--text-orange);
        }
    }
    .item.active {
        color: var(--text-orange);
        font-weight: bold;
    }
}
</style>