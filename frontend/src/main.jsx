import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";

import Providers from "./app/providers";
import AppInitializer from "./app/AppInitializer";
import router from "./app/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
      <AppInitializer>
        <RouterProvider router={router} />
      </AppInitializer>
    </Providers>
  </StrictMode>
);