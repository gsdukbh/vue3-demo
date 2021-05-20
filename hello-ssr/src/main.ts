/* eslint-disable */
import {buildApp} from './main.app';

const {app, router, store} = buildApp();

const storeInitialState =  (window as any).INITIAL_DATA;


if (storeInitialState) {
    store.replaceState(storeInitialState);
}

router.isReady()
    .then(() => {
        app.mount('#app');
    });
