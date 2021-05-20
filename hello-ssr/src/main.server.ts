import type { RouteLocationRaw } from 'vue-router';
import { buildApp } from './main.app';

export default (url: RouteLocationRaw) =>
  new Promise((resolve, reject) => {
    const { router, app, store } = buildApp();
    // 设置服务器端路由器的位置
    router
      .push(url)
      .then(() => {
        console.log('成功');
      })
      .catch((e) => {
        console.log('错误 ', e);
      });
    router
      .isReady()
      .then(() => {
        const matchedComponents = router.currentRoute.value.matched;
        console.log('ca', router.currentRoute.value.path);
        matchedComponents.flatMap((record) => {
          Object.values(record.components);
          console.log(record.path);
        });
        // 没有匹配的路线，以404拒绝
        if (!matchedComponents.length) {
          return reject(new Error('404'));
        }
        // Promise应该解析为应用实例，以便可以呈现它
        return resolve({ app, router, store });
      })
      .catch(() => reject(new Error('503')));
  });
