import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { App } from './App';
import { Home, Article, Post, Personal } from 'src/pages';
import { MainLayout } from '../layout';
import { PrivateRoute } from './PrivateRoute';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <App>
        <Switch>
          <Route
            path="/"
            render={() => (
              <MainLayout>
                <Switch>
                  <PrivateRoute path="/home" title="首页" component={Home} />
                  <PrivateRoute path="/article/:id" title="文章详情" component={Article} />
                  <PrivateRoute path="/post" title="新增文章" component={Post} />
                  <PrivateRoute path="/personal" title="个人中心" component={Personal} />
                  <Redirect to="/home" />
                </Switch>
              </MainLayout>
            )}
          />
          <Route render={() => <h1>未找到匹配的页面</h1>} />
        </Switch>
      </App>
    </BrowserRouter>
  );
};
