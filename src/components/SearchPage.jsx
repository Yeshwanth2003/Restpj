import { lazy, Suspense, useState } from "react";
import "./style/searchPage.css";
import FallBack from "./Fallback";

export const SEARCHSTATE = {
  DEFAULT: "0",
  USER: "1",
};

export default function SearchPage() {
  let [searchState, setSearchState] = useState(SEARCHSTATE.DEFAULT);
  let [sUser,setSUser] = useState({})

  function SearchRouter() {
    if (searchState === SEARCHSTATE.USER) {
      let Component = lazy(()=>import("./UserInfo"));
     return(
          <>
          <Suspense fallback={<FallBack />}>
               <Component shouldDisplayButton={""} user={sUser}/>
          </Suspense>
          </>
     )
    } else {
      let Component = lazy(() => import("./SearchPages/DefalutSearch"));
      return (
        <>
          <Suspense fallback={<FallBack />}>
            <Component setSUser={setSUser} setSearchState={setSearchState}/>
          </Suspense>
        </>
      );
    }
  }

  return (
    <>
      <div className="search-backDiv">
        <button
          className="search-back-btn"
          onClick={() => {
            setSearchState(SEARCHSTATE.DEFAULT);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            viewBox="0 0 24 24"
            width="25px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
            <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
          </svg>
          Back
        </button>
      </div>
      <SearchRouter />
    </>
  );
}
