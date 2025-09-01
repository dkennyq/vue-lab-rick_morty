import { createStore } from "vuex";

const API_URL_RICK_AND_MORTY = "https://rickandmortyapi.com/api/character";

export default createStore({
  state: {
    characters: [],
    charactersFilter: [],
    totalPages: 1,
    currentPage: 1,
    isLoading : false,
    selectedStatus: '',
    characterName: '',
  },
  getters: {},
  mutations: {
    setCharacters(state, payload) {
      state.characters = payload;
    },
    setCharactersFilter(state, payload) {
      state.charactersFilter = payload;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
    setIsLoading(state, value) {
      state.isLoading = value;
    },
    setSelectedStatus(state, status) {
      state.selectedStatus = status;
    },
    setCharacterName(state, name) {
      state.characterName = name;
    },
  },
  actions: {
    async getCharacters({ commit }) {
      try {
        const url = new URL(API_URL_RICK_AND_MORTY);         
        const response = await fetch(url);
        const data = await response.json();

        commit("setCharacters", data.results);
        commit("setCharactersFilter", data.results);
        commit("setTotalPages", data.info.pages);
        commit("setCurrentPage", 1);
      } catch (error) {
        console.error(error);
      }
    },

    async filterByStatus({ commit, state }, status) {
      try {
        const url = new URL(API_URL_RICK_AND_MORTY);
        url.searchParams.set("page", 1);
        commit("setCurrentPage", 1);
        if(status) url.searchParams.set("status", status.toLowerCase());
        if(state.characterName) url.searchParams.set("name", state.characterName);

        const response = await fetch(url);
        const data = await response.json();

        commit("setCharacters", data.results);
        commit("setCharactersFilter", data.results);
        commit("setTotalPages", data.info.pages);

        commit("setSelectedStatus", status);

      } catch (error) {
        console.error('filterByStatus_error: ', error);
      }
    },

    async filterByName({ commit, state }, name) {
      try {
        const url = new URL(API_URL_RICK_AND_MORTY);
        url.searchParams.set("page", 1);
        commit("setCurrentPage", 1);
        if (state.selectedStatus) url.searchParams.set("status", state.selectedStatus.toLowerCase());
        if (name) url.searchParams.set("name", name);

        const response = await fetch(url);
        const data = await response.json();

        commit("setCharacters", data.results);
        commit("setCharactersFilter", data.results);
        commit("setTotalPages", data.info.pages);
        commit("setCharacterName", name);
      } catch (error) {
        console.error('filterByName_error: ', error);
      }
    },

    async fetchNextPage({ commit, state }) {
      const nextPage = state.currentPage + 1;
      if (nextPage > state.totalPages) return; // No more pages to fetch.
      commit("setIsLoading", true); // Activate loading.
      try {
        const url = new URL(API_URL_RICK_AND_MORTY);
        url.searchParams.set("page", nextPage);
        if(state.selectedStatus) url.searchParams.set("status", state.selectedStatus.toLowerCase());
        if(state.characterName) url.searchParams.set("name", state.characterName);
        const response = await fetch(url);
        
        const data = await response.json();
        const newCharacters = [...state.characters, ...data.results];
        commit("setCharacters", newCharacters);
        commit("setCharactersFilter", newCharacters);
        commit("setCurrentPage", nextPage);
      } catch (error) {
        console.error("fetchNextPage error:", error);
      } finally {
        commit("setIsLoading", false); // Deactivate loading.
      }
    }
  },
  modules: {},
});
