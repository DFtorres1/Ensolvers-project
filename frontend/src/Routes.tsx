import { Fragment, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingScreen from "./shared/components/LoadingScreen";
import { useValidateContext } from "./shared/utils/customHooks";
import Layout from "./shared/components/Layout";
import GuardId from "./shared/components/GuardId";

const routesConfig: RoutesType[] = [
  {
    id: "login",
    exact: true,
    layout: Layout,
    path: "/login",
    component: lazy(() => import("src/views/pages/Users/Login")),
  },
  {
    id: "register",
    exact: true,
    layout: Layout,
    path: "/register",
    component: lazy(() => import("src/views/pages/Users/Register")),
  },
  {
    id: "not-found",
    exact: true,
    layout: Layout,
    path: "/404",
    component: lazy(() => import("src/views/pages/NotFound")),
  },
  {
    id: "root",
    exact: true,
    guard: GuardId(),
    layout: Layout,
    path: "/",
    component: lazy(() => import("src/views/pages/Notes/Notes")),
  },
  {
    id: "*",
    layout: Layout,
    path: "*",
    component: () => <Navigate to="/404" />,
  },
];

const renderRoutes = (routes: RoutesType[]) =>
  routes ? (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {routes.map((route) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;
          return (
            <Route
              key={route.id}
              path={route.path ?? ""}
              element={
                <Guard>
                  <Layout>
                    {route.routes ? renderRoutes(route.routes) : <Component />}
                  </Layout>
                </Guard>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  ) : null;

const RenderRoutes = () => {
  useValidateContext();
  return renderRoutes(routesConfig);
};

export default RenderRoutes;
