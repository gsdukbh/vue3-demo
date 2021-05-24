import {createStore} from 'vuex';

export default createStore({
    state: {
        hello: 'hello'
    },
    mutations: {},
    actions: {},
    modules: {},
    getters:{
        hello: state => state.hello
    }
});
