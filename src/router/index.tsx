import { Routes, Route } from "react-router-dom"

import PrivateRoute from "../components/PrivateRoute"
import PublicRoute from "../components/PublicRoute"
import { ROUTES } from "../constants"

import HomePage from "../pages/Home"
import NotFoundPage from "..//pages/NotFound"
import ProfilePage from "../pages/Profile"

export type RouteType = {
  path: ROUTES | string
  title?: string
  isPrivate?: boolean
  element: () => JSX.Element
}

const routes: RouteType[] = [
  {
    path: ROUTES.HOME,
    title: "roadventure",
    element: HomePage,
    isPrivate: false
  },
  {
    path: ROUTES.PROFILE,
    title: "Profile",
    element: ProfilePage,
    isPrivate: false
  },
  {
    path: "*",
    title: "Not Found",
    element: NotFoundPage
  }
]
export default function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => {
        const { isPrivate, element: Component } = route
        const RouteWrapper = isPrivate ? PrivateRoute : PublicRoute
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
        )
      })}
    </Routes>
  )
}
