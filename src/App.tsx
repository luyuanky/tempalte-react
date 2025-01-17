import { observer, Provider } from 'mobx-react';
import { useStores } from './stores';
import CloundBg from './components/CloudBg/CloundBg';

const App = () => (
  <Provider store={useStores}>
    <div>
      <CloundBg />
    </div>
  </Provider>
);

export default observer(App);
