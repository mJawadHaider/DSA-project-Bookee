import Vuex from 'vuex';
import { state, mutations, actions } from './global';

import globalStore from './global';

export default new Vuex.Store({
	modules: {
		global: {
			namespaced: true,
			...globalStore,
		},
	},
	...globalStore,
});
