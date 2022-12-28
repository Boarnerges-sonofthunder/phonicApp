import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SharedLayout from "./Components/Layouts/SharedLayout";
import Index from "./Components/Home/Index";
import Profile from "./Components/User/Profile";
import Panier from "./Components/User/Panier";
import { AuthProvider } from "./Components/Firebase/AuthContext";
import { PanierProvider } from "./Components/Context/PanierContext";
import { ArticleProvider } from "./Components/Context/ArticleContext";
import { ModalProvider } from "./Components/Context/ModalContext";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import PrivateRoutes from "./Components/Layouts/PrivateRoutes";
import Setting from "./Components/User/Setting";
import Catalogue from "./Components/article/Catalogue";
import EditionArticle from "./Components/article/EditionArticle";
import PresentationArticle from "./Components/article/PresentationArticle";
import ForgotPassword from "./Components/User/ForgotPassword";


function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <PanierProvider>
          <ArticleProvider>
            <>
              <Router>
                <Routes>
                  <Route exact path="/" element={<SharedLayout />}>
                    <Route exact index element={<Index />} />
                    <Route exact element={<PrivateRoutes />}>
                      <Route exact path="monprofile" element={<Profile />} />
                      <Route exact path="panier" element={<Panier />} />
                      <Route
                        exact
                        path="monprofile/setting"
                        element={<Setting />}
                      />
                      <Route
                        exact
                        path="catalogue/editionArticle/:articleId"
                        element={<EditionArticle />}
                      />
                    </Route>
                    <Route exact path="login" element={<Login />} />
                    <Route exact path="login/register" element={<Register />} />
                    <Route
                      exact
                      path="motDePasseOubliee"
                      element={<ForgotPassword />}
                    />
                    <Route exact path="catalogue" element={<Catalogue />} />
                    <Route
                      exact
                      path="presentationArticle/:articleId"
                      element={<PresentationArticle />}
                    />
                  </Route>
                </Routes>
              </Router>
            </>
          </ArticleProvider>
        </PanierProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
