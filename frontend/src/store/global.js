import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import UsersGraph from './Graph';
// import {uniqBy, map, flatMap, sumBy} from 'lodash';
/* eslint-disable */

const AuthToken = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = AuthToken;
axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.common['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export const state = () => ({
	user: null,
	books: [],
	searchQuery: '',
	bookReading: [],
	userBooks: [],
	friends: [],
	community: [],
	allUsers: [],
});

export const mutations = {
	SET_ME(state, payload) {
		state.user = payload;
	},

	SET_USER(state, payload) {
		state.user = payload.user;
		localStorage.setItem('token', payload.token);
		localStorage.setItem('user', JSON.stringify(payload.user));
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

	SET_BOOK_READING(state, book) {
		state.bookReading = book;
	},

	SET_ALL_USER_BOOKS(state, userBooks) {
		state.userBooks = userBooks;
	},

	SET_ALL_FRIENDS(state, friends) {
		state.friends = friends;
	},

	SET_COMMUNITY(state, community) {
		state.community = community;
	},

	//------------------------------------- User Graph Mutations
	SET_NEW_USER_IN_GRAPH(state, user) {
		UsersGraph.addNewUser(user);
	},

	SET_ALL_USERS(state, users) {
		state.allUsers = users;
	},
};

export const actions = {
	async getMe({ commit }) {
		// const user = localStorage.getItem('user');
		// if (user) {
		//     commit('SET_ME', JSON.parse(user));
		// } else if (localStorage.getItem('token')) {
		const response = await axios.get('/me');
		commit('SET_ME', response.data.data.user);
		return response.data.data.user;
		// }
	},

	async login({ commit, state }, payload) {
		const user = UsersGraph.userLogin(payload);
		const response = await axios.post('/login', payload);
		commit('SET_USER', response.data.data);
	},

	async signUp({ commit }, payload) {
		const response = await axios.post('/signup', payload);
		commit('SET_NEW_USER_IN_GRAPH', response.data.data.user);
		return response;
	},

	async fetchUsersList({ commit, state }) {
		const response = await axios.get(`/all-users`);
		let users = response.data.dataItems;
		users = users
			.map((user) => {
				const id = '' + user.id;
				if (+user.id === +state.user.id || state.user.friends?.includes(id)) {
					return undefined;
				}
				const initials =
					`${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
				const fullName = convertFullName(user.firstName, user.lastName);
				return {
					...user,
					initials,
					fullName,
				};
			})
			.filter((u) => !!u);
		commit('SET_ALL_USERS', users);
	},

	async fetchUsersData({ commit }) {
		const response = await axios.get(`/all-users`);
		const users = response.data.dataItems;
		commit('SET_ALL_USERS', users);
		users.forEach((user) => {
			commit('SET_NEW_USER_IN_GRAPH', user);
			if (user.friendsList.length) {
				user.friendsList.forEach((friend) => {
					UsersGraph.addFriends(user, friend);
				});
			}
		});
		return users;
	},

	async fetchLoggedInUser({ commit }, forceRefresh = false) {
		if (!forceRefresh && state.user) {
			return;
		}
		const response = await axios.get('/me');
		commit('SET_LOGGED_IN_USER', response.data);
		return response.data;
	},
	//==================================== Books Actions
	async fetchAllBooks({ commit, state }, forceRefresh = false) {
		if (!forceRefresh && state.books.length) {
			return;
		}
		const response = await axios.get('/all-books');
		commit('SET_BOOKS_LIST', response.data.dataItems);
		return response.data.dataItems;
	},

	//==================================== Admin Calls
	async updateBook({ commit }, book) {
		const response = await axios.put(`/admin/books/${book.id}`, book);
		commit('UPDATE_BOOK', response.data);
	},

	async getBook({}, id) {
		const response = await axios.get(`/admin/books/${id}`);
		return response.data;
	},

	async createBook({ commit, state }, book) {
		// commit('SET_IS_CREATING_PROJECT', true);
		const response = await axios.post('/admin/books', book);

		commit('SET_BOOKS_LIST', [response.data, ...state.books]);
		// commit('SET_IS_CREATING_PROJECT', false);
	},

	//==================================== Friends Calls
	async getAllFriends({ commit }, userId) {
		const response = await axios.get(`/all-friends/${userId}`);
		let allFriends = response.data.dataItems;
		if (response.data.count) {
			allFriends = allFriends.map((friend) => {
				const user = friend.User ? friend.User : friend;
				user.fullName = convertFullName(user.firstName, user.lastName);
				return {
					...user,
					book: { ...friend.book, status: friend.status } || {},
					id: friend.id,
					userId: friend.userId || friend.id,
					bookId: friend.bookId,
				};
			});
			commit('SET_ALL_FRIENDS', allFriends);
			return allFriends;
		}
		commit('SET_ALL_FRIENDS', []);
		return response.data;
	},

	async addNewFriend({ commit, state }, data) {
		const isAdded = UsersGraph.addFriends(data.user, data.friend);
		UsersGraph.printGraph();
		if (!isAdded) {
			return isAdded;
		}
		state.friends.push(data.friend);
		const response = await axios.put(`/add-friend/${data.user.id}`, {
			userId: data.user.id,
			friendId: data.friend.id,
		});
		return isAdded;
		// return response.data.data;
	},

	async removeFriend({ commit, state }, data) {
		UsersGraph.removeFriend(data.user, data.friend);
		UsersGraph.printGraph();
		const response = await axios.put(`/remove-friend/${data.user.id}`, {
			userId: data.user.id,
			friendId: data.friend.id,
		});
		// return response.data.data;
	},

	async fetchCommunity({ commit }) {
		const response = await axios.get('/community');
		commit('SET_COMMUNITY', response.data.dataItems);
		return response.data.dataItems;
	},

	//==================================== User Books Calls
	async addUserBook({}, data) {
		const response = await axios.post('/add-book', data);
		return response.data;
	},

	async getBookReading({ commit, state }, userId) {
		const response = await axios.get(`/book-reading/${userId}`);
		commit('SET_BOOK_READING', response.data.dataItems);
		return response.data.dataItems;
	},

	async getAllUserBooks({ commit }, userId) {
		const response = await axios.get(`/user-books/${userId}`);
		const bookReading = response.dataItems.find((book) => book.isReading);
		commit('SET_BOOK_READING', bookReading);
		commit('SET_ALL_USER_BOOKS', response.dataItems);
	},
};

function convertFullName(firstName, lastName) {
	firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
	lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
	return `${firstName} ${lastName}`;
}

export default {
	state,
	mutations,
	actions,
	// getters,
};
