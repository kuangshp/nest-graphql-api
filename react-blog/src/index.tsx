import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { ApolloClient } from '@apollo/client';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client/react';

import { Router } from './router';
import rootStore from './redux/store';

import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import './assets/style/global.scss';
import './assets/style/antd.css';
import { initApollo } from './utils';

const client = new ApolloClient(initApollo());

ReactDOM.render(
  <ConfigProvider
    locale={zhCN}
    componentSize="middle"
    getPopupContainer={() => document.getElementById('root') || document.createElement('div')}
  >
    <Provider store={rootStore.store}>
      <PersistGate persistor={rootStore.persistor}>
        <ApolloProvider client={client}>
          <Router />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);
