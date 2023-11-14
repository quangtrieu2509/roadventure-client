import { Routes, Route } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import { ROUTES } from '../constants';

import HomePage from '../pages/Home';
import NotFoundPage from '..//pages/NotFound';

export type RouteType = {
  path: ROUTES | string;
  title?: string;
  isPrivate?: boolean;
  element: () => JSX.Element;
};

const routes: RouteType[] = [
  { 
    path: ROUTES.HOME,
    title: 'Roadventure',
    element: HomePage },

  {
    path: '*',
    title: 'Not Found',
    element: NotFoundPage,
  },
];
export default function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => {
        const { isPrivate, element: Component } = route;
        const RouteWrapper = isPrivate ? PrivateRoute : PublicRoute;
        return (
          <Route
            key={route.path}
            {...route}
            element={
              <RouteWrapper title={route.title}>
                <Component />
              </RouteWrapper>
            }
          ></Route>
        );
      })}
    </Routes>
  );
}
