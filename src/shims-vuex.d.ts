declare module '*.vuex' {
  import { Store } from 'vuex';
  const store: Store<any>;
  export default store;
}
