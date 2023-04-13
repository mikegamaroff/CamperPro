import { JSX as LocalJSX } from "@ionic/core";
import { defineCustomElements as ionDefineCustomElements } from "@ionic/core/loader";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { HTMLAttributes, useEffect } from "react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/core/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/core/css/normalize.css";
import "@ionic/core/css/structure.css";
import "@ionic/core/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/core/css/display.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/float-elements.css";
import "@ionic/core/css/padding.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import { UserProvider } from "../context/userContext";
import "../styles/globals.css";
import "../styles/variables.css";
type ToReact<T> = {
  [P in keyof T]?: T[P] &
    Omit<HTMLAttributes<Element>, "className"> & {
      class?: string;
      key?: string | number | null;
    };
};

declare global {
  export namespace JSX {
    interface IntrinsicElements extends ToReact<LocalJSX.IntrinsicElements> {}
  }
}
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    ionDefineCustomElements(window);
  });
  return (
    <>
      <ion-app>
        <UserProvider>
          <AnimatePresence>
            <Component {...pageProps} />
          </AnimatePresence>
        </UserProvider>
      </ion-app>
      <script defer src='/static/js/ionic.min.js'></script>
    </>
  );
}

export default MyApp;
