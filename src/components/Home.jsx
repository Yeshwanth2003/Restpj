import { lazy, Suspense, useState } from "react";
import "./style/home.css";
import Fallback from './Fallback';

export const HOMESTATES = {
  DEFAULT: "0",
  USER: "1",
};

export default function Home() {
  let [homeState, setHS] = useState(HOMESTATES.DEFAULT);
  let [dispUser,setDispUser] = useState({});

  function HomeRouter() {
    if (homeState===HOMESTATES.USER) {
     let Component = lazy(()=>import("./UserInfo"));
     return(
          <>
          <Suspense fallback={<Fallback />}>
               <Component shouldDisplayButton={""} user={dispUser}/>
          </Suspense>
          </>
     )
    } else {
     let Component = lazy(()=>import("./HomePages/DefaultH"));
     return(
          <>
          <Suspense fallback={<Fallback />}>
               <Component setHS={setHS} setDispUser={setDispUser}/>
          </Suspense>
          </>
     )
    }
  }

  return (
    <>
      <div className="home-wrapper">
          <HomeRouter />
      </div>
    </>
  );
}
