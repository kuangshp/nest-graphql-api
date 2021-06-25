import React, { PropsWithChildren } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { RootState, useSelector } from 'src/redux';
type Props = PropsWithChildren<RouteComponentProps>;
// 创建一个私有路由的方法
// eslint-disable-next-line
export const PrivateRoute = ({ component, title, ...rest }) => {
  const token: string | null = useSelector((state: RootState) => state.user.token);
  const routeComponent = (props: Props): React.ReactElement => {
    return token || rest.path !== '/post' ? (
      React.createElement(component, props)
    ) : (
      <Redirect to="/home" />
    );
  };
  return (
    <DocumentTitle title={title}>
      <Route render={routeComponent} {...rest} />
    </DocumentTitle>
  );
};
