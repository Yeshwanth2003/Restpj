import { lazy, Suspense, useState } from "react";
import Fallback from "./components/Fallback";

export const PAGESTATE = {
  HOME: "home",
  LOGIN: "login",
};

export function imgErrDectector() {
  let images = document.querySelectorAll("img");
  images.forEach((elem) => {
    elem.addEventListener("error", (event) => {
      event.target.style.display = "none";
    });
  });
}

export default function App() {
  return AppRouter();
}

function AppRouter() {
  let [currentPage, setCurrentPage] = useState(PAGESTATE.LOGIN);
  let [user, setUser] = useState({});

  if (currentPage === PAGESTATE.HOME) {
    let Component = lazy(() => import("./components/MainApp"));
    return (
      <>
        <Suspense fallback={<Fallback />}>
          <Component
            setCurrentPage={setCurrentPage}
            user={user}
            setUser={setUser}
          />
        </Suspense>
      </>
    );
  } else {
    let Component = lazy(() => import("./components/LoginSignup"));
    return (
      <>
        <Suspense fallback={<Fallback />}>
          <Component setCurrentPage={setCurrentPage} setUser={setUser} />
        </Suspense>
      </>
    );
  }
}
