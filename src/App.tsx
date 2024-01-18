import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ECommerce from "./pages/Dashboard";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import Loader from "./common/Loader";
import routes from "./routes";
import Protected from "./features/ProtectedRoutes";
import ProtectedRoute from "./features/ProtectedRoutes";
import ErrorBoundary from "./components/ErrorBoundary";

const DefaultLayout = lazy(() => import("./layout/DefaultLayout"));



function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    // throw new Error('error....')
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        {/* <Route path="/auth/signin" element={<ProtectedRoute children={<SignIn />} />} /> */}
        <Route path="/auth/signin" element={
        <SignIn />
        } />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}



export default App;
