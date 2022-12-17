import axios from 'axios';
// import {uniqBy, map, flatMap, sumBy} from 'lodash';
/* eslint-disable */

export const state = () => ({
  user: null,
  books: [],
  // isLoadingData: {
  //   employees: true,
  //   activities: false,
  //   previewPdf: true,
  // },
});

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload.user;
    localStorage.setItem('token', payload.token);
  },

  SET_LOGGED_IN_USER(state, payload) {
    state.user = payload.user;
  },

  SET_IS_LOADING_DATA(state, loading) {
    state.isLoadingData[loading.key] = loading.value;
  },
  //==================================== Books Mutations
  SET_BOOKS_LIST(state, books) {
    state.books = books;
  },

  UPDATE_BOOK(state, book) {
    const allbooks = state.books.filter((p) => p.id !== book.id);
    state.books = [book, ...allbooks];
  },

  // SET_IS_CREATING_BOOK(state, isCreatingProject) {
  //   state.isCreatingProject = isCreatingProject;
  // },

  // GET_BOOK_ID(state, book) {
  //   project.tasks.forEach(task => {
  //     task.labourCost = sumBy(task.descriptions, 'laborCost');
  //   });
  //   state.project = project;
  // },
};

export const actions = {
  async login({commit}, payload) {
    const response = await axios.post('/login', payload);
    commit('SET_USER', response.data.data);
  },

  async fetchLoggedInUser({commit}, forceRefresh = false) {
    if (!forceRefresh && state.user) {
      return;
    }
    const response = await axios.get('/me');
    commit('SET_LOGGED_IN_USER', response.data);
    return response.data;
  },
  //==================================== Books Actions
  async fetchAllBooks({commit, state}, forceRefresh = false) {
    if (!forceRefresh && state.books.length) {
      return;
    }
    const response = await axios.get('/books');
    commit('SET_BOOKS_LIST', response.dataItems);
  },

  async updateBook({commit}, book) {
    const response = await axios.put(`/admin/books/${book.id}`, book);
    commit('UPDATE_BOOK', response.data);
  },

  async getBook({}, id) {
    const response = await axios.get(`/admin/books/${id}`);
    return response.data;
  },

  async createBook({commit, state}, book) {
    // commit('SET_IS_CREATING_PROJECT', true);
    const response = await axios.post('/admin/books', book);

    commit('SET_BOOKS_LIST', [response.data, ...state.books]);
    // commit('SET_IS_CREATING_PROJECT', false);
  },

  // async fetchAllTasksAndDescriptions({commit, state}, project) {
  //   const response = await axios.get('/admin/task', project);

  //   commit('SET_TASKS_LIST', response.data);
  // },

  // async fetchPreviewPDF (_, projectId) {
  //   const loading = {};
  //   const response = await axios.get(`/admin/project/${projectId}/preview`, {
  //     responseType: 'arraybuffer',
  //   });

  //   var file = new Blob([response], {type: 'application/pdf'});
  //   var fileURL = window.URL.createObjectURL(file);
  //   return fileURL;
  // },

  // async sendForReview (_, project) {
  //   const response = await axios.post(`/admin/project/${project.id}/send-invoice`, project);
  //   return response;
  // },

  // async startProject(_, project) {
  //   const response = await axios.post(`/admin/project/${project.id}/start`, project);
  //   return response;
  // },

  // async completeProject(_, project) {
  //   const response = await axios.post(`/admin/project/${project.id}/complete`, project);
  //   return response;
  // },
};

// export const getters = {
//   descriptions(state) {
//     return uniqBy(
//       flatMap(map(state.tasks, ({descriptions}) => descriptions)),
//       'description'
//     );
//   }
// };
export default {
  state,
  mutations,
  actions,
  // getters,
};
