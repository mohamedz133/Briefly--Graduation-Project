import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLandingPage from "./routes/MainLandingPage";
import HomePage from "./routes/HomePage";
import ResetPassword from "./components/Reset_Password";
import AddFeed from "./routes/AddFeed";
import "./index.css";
import PricingPage from "./routes/PricingPage";
import Protected from "./components/Protected";
import SubscripedChannels from "./components/SubscribedChannels";
import DiscoverChannels from "./components/DiscoverChannels";
import UserArticles from "./components/UserArticles";
import ErrorBoundary from "./components/ErrorBound";
import Notfound from "./components/Error404";
import PublicChannels from "./components/PublicChannels";
import SavedArticles from "./components/SavedArtices";
import './styles/common.css'
function App() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showCreateAccountPopup, setShowCreateAccountPopup] = useState(false);

  const ToggleLoginPopup = () => {
    setShowLoginPopup((old) => {
      if (old) {
        setShowCreateAccountPopup(false);
        return !old;
      } else {
        setShowCreateAccountPopup(false);
        return !old;
      }
    });
  };

  const ToggleSignupPopup = () => {
    setShowCreateAccountPopup((old) => {
      if (old) {
        setShowLoginPopup(false);
        return !old;
      } else {
        setShowLoginPopup(false);
        return !old;
      }
    });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLandingPage
          stateShowLoginPopup={showLoginPopup}
          stateshowCreateAccountPopup={showCreateAccountPopup}
          onClickLogin={ToggleLoginPopup}
          onClickCreateAccount={ToggleSignupPopup}
        />
      ),
      errorElement: <Notfound errorType="404" />,
    },
    {
      path: "/home",
      element: (
        <ErrorBoundary>
           <Protected> 
            <HomePage />
          </Protected> 
        </ErrorBoundary>
      ),
      children: [
        {
          path: "/home/subscriptions",
          element: <SubscripedChannels />,
        },
        {
          path: "/home",
          element: <UserArticles />,
        },
        {
          path: "/home/addFeed",
          element: <AddFeed />,
        },
        {
          path: "/home/discover",
          element: <DiscoverChannels />,
        }
        ,{
          path: "/home/publicApi",
          element:    <div className="publicChannels_home">  <PublicChannels/></div>
          ,
        }
        ,{
          path: "/home/SavedArticles",
          element:    <div className="SavedArticles_home">  <SavedArticles/></div>
          ,
        },
      ],
    },
    {
      path: "/Reset_Password",
      element: <ResetPassword />,
    },
    {
      path: "/pricing",
      element: <PricingPage />,
    },
  ]);

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
