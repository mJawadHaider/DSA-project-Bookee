import Vue from 'vue';
import VueRouter from 'vue-router';
import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import routes from './routes';
import store from './store';

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;

// Vue Router Documentation https://v3.router.vuejs.org/installation.html#npm
const router = new VueRouter({
	mode: 'history',
	routes,
});

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token');
	let user = JSON.parse(localStorage.getItem('user') || '{}');

	if (to.path === '/login') {
		return next();
	}
	if (
		to.matched.every((rec) => {
			const roles = rec.meta.roles || [];
			if (rec.meta?.authNotRequired) {
				return next();
			}
			return !roles.includes('all') && !roles.includes(user.role);
		})
	) {
		return next({ path: '/home' });
	}
	next();
});

Vue.config.errorHandler = (err, vm) => {
	// err: error trace
	// vm: component in which error occured
	// info: Vue specific error information such as lifecycle hooks, events etc.

	console.error(err, '<=== Main.js Error Tracking');
	if (err) vm.$toast.error(err.data.error?.body || err.data.error);
};

const options = {
	position: 'topCenter',
};
Vue.use(VueIziToast, options);

Vue.use(VueRouter);
// Vue.mixin(pageTitleMixin);

Promise.all([store.dispatch('fetchUsersData')]).then((res) => {
	new Vue({
		vuetify,
		router,
		store,
		render: (h) => h(App),
	}).$mount('#app');
});
