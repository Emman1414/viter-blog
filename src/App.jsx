import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Blog from "./components/pages/backend/blog/Blog";
import Homepage from "./components/pages/frontend/homepage/Homepage";
import Single from "./components/pages/frontend/single/Single";
import { StoreProvider } from "./components/store/storeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const App = () => {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Router>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/admin/single/:slug" element={<Single />} />
            <Route path="/admin/blog" element={<Blog />} />
          </Routes>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
};

export default App;
