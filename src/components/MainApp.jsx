import { lazy, Suspense, useEffect, useState, useRef } from "react";
import "./style/mainApp.css";
import { PAGESTATE } from "../App";
import Fallback from "./Fallback";

export const NAVIGATORHINTS = {
  HOME: "HOME",
  SEARCH: "SEARCH",
  USER: "USER",
  SETTINGS: "SETTINGS",
};
let inPageLoader;

// loader fun
export function toogleLSLoader() {
  inPageLoader.current.classList.toggle("ls-displayLoader");
}

export default function MainApp({ setCurrentPage, user, setUser }) {
  inPageLoader = useRef();

  let [accUser, setAccUser] = useState(user);
  let [currPage, setCurrPage] = useState(NAVIGATORHINTS.HOME);

  useEffect(() => {
    setAccUser(user);
  }, [user]);

  function toogleMobileNav() {
    document
      .getElementById("mobileDropDownDiv")
      .classList.toggle("open-mobile-nav-div");
  }

  //   NAV functions

  useEffect(() => {
    let navListz = document.querySelectorAll("#mainAppNavList");
    navListz.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        setCurrPage(event.target.getAttribute("value"));
      });
    });
  }, []);

  //   NAV style indi

  useEffect(() => {
    let navListz = document.querySelectorAll("#navRouterLi");
    navListz.forEach((elem) => {
      elem.classList.remove("mobile-nav-on");
      if (elem.getAttribute("value") === currPage) {
        elem.classList.add("mobile-nav-on");
        return;
      }
      if (
        elem.getAttribute("value") === NAVIGATORHINTS.USER &&
        currPage === NAVIGATORHINTS.SETTINGS
      ) {
        elem.classList.add("mobile-nav-on");
      }
    });
  }, [currPage]);
  // logout fun

  function logOut() {
    toogleLSLoader();
    setTimeout(() => {
      toogleLSLoader();
      setCurrentPage(PAGESTATE.LOGIN);
    }, 1000);
  }

  //   pageRouter

  function PageRouter() {
    if (currPage === NAVIGATORHINTS.USER) {
      let Component = lazy(() => import("./UserInfo"));
      return (
        <>
          <Suspense fallback={<Fallback />}>
            <Component user={accUser} setCurrPage={setCurrPage} />
          </Suspense>
        </>
      );
    } else if (currPage === NAVIGATORHINTS.SEARCH) {
      let Component = lazy(() => import("./SearchPage"));
      return (
        <>
          <Suspense fallback={<Fallback />}>
            <Component />
          </Suspense>
        </>
      );
    } else if (currPage === NAVIGATORHINTS.SETTINGS) {
      let Component = lazy(() => import("./Settings"));
      return (
        <>
          <Suspense fallback={<Fallback />}>
            <Component user={accUser} setCurrPage={setCurrPage} />
          </Suspense>
        </>
      );
    } else {
      let Component = lazy(() => import("./Home"));
      return (
        <>
          <Suspense fallback={<Fallback />}>
            <Component />
          </Suspense>
        </>
      );
    }
  }

  return (
    <>
      <div className="mainapp-wrapper">
        <div className="mainapp-container">
          <header className="mainapp-header">
            <div className="mainapp-logodiv">
              <h1 className="mainapp-logo">makkalMedia</h1>
            </div>
            <div
              onClick={() => toogleMobileNav()}
              className="mainapp-options-button"
            >
              <div className="mainapp-lap-nav">
                <ul className="mainapp-nav-ul">
                  <li
                    value={NAVIGATORHINTS.HOME}
                    className="mainapp-navli mobile-nav-on"
                    id="navRouterLi"
                  >
                    <svg
                      id="mainAppNavList"
                      xmlns="http://www.w3.org/2000/svg"
                      height="35"
                      viewBox="0 96 960 960"
                      width="35"
                      value={NAVIGATORHINTS.HOME}
                      className="lap-nav"
                    >
                      <path
                        value={NAVIGATORHINTS.HOME}
                        d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z"
                      />
                    </svg>
                  </li>
                  <li
                    value={NAVIGATORHINTS.SEARCH}
                    className="mainapp-navli"
                    id="navRouterLi"
                  >
                    <svg
                      id="mainAppNavList"
                      xmlns="http://www.w3.org/2000/svg"
                      height="35"
                      viewBox="0 0 24 24"
                      width="35"
                      className="lap-nav"
                      value={NAVIGATORHINTS.SEARCH}
                    >
                      <path
                        value={NAVIGATORHINTS.SEARCH}
                        d="M0 0h24v24H0V0z"
                        fill="none"
                      />
                      <path
                        value={NAVIGATORHINTS.SEARCH}
                        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                      />
                    </svg>
                  </li>
                  <li
                    value={NAVIGATORHINTS.USER}
                    className="mainapp-navli"
                    id="navRouterLi"
                  >
                    <svg
                      id="mainAppNavList"
                      xmlns="http://www.w3.org/2000/svg"
                      height="35"
                      viewBox="0 96 960 960"
                      width="35"
                      className="lap-nav"
                      value={NAVIGATORHINTS.USER}
                    >
                      <path
                        value={NAVIGATORHINTS.USER}
                        d="M480 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160 896v-94q0-38 19-65t49-41q67-30 128.5-45T480 636q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800 764 800 802v94H160Zm60-60h520v-34q0-16-9.5-30.5T707 750q-64-31-117-42.5T480 696q-57 0-111 11.5T252 750q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570 425q0-39-25.5-64.5T480 335q-39 0-64.5 25.5T390 425q0 39 25.5 64.5T480 515Zm0-90Zm0 411Z"
                      />
                    </svg>
                  </li>
                </ul>
              </div>
              <div className="mainapp-mobile-button"></div>
            </div>
            <div id="mobileDropDownDiv" className="mainapp-mobile-dropdown">
              <div className="mainapp-mobileDrop-body">
                <ul className="mainapp-nav-ul mainapp-mobileDrop-ul">
                  <li
                    style={{ border: "none" }}
                    className="mainapp-navli mobile-nav-on"
                    value={NAVIGATORHINTS.HOME}
                    id="navRouterLi"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 96 960 960"
                      className="mobile-nav-svg"
                    >
                      <path d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z" />
                    </svg>
                    <p
                      id="mainAppNavList"
                      value={NAVIGATORHINTS.HOME}
                      className="mobilenav-p"
                    >
                      Home
                    </p>
                  </li>
                  <li
                    style={{ border: "none" }}
                    className="mainapp-navli"
                    value={NAVIGATORHINTS.SEARCH}
                    id="navRouterLi"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="mobile-nav-svg"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                    <p
                      id="mainAppNavList"
                      value={NAVIGATORHINTS.SEARCH}
                      className="mobilenav-p"
                    >
                      Search
                    </p>
                  </li>
                  <li
                    id="navRouterLi"
                    style={{ border: "none" }}
                    className="mainapp-navli"
                    value={NAVIGATORHINTS.USER}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 96 960 960"
                      className="mobile-nav-svg"
                    >
                      <path d="M480 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160 896v-94q0-38 19-65t49-41q67-30 128.5-45T480 636q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800 764 800 802v94H160Zm60-60h520v-34q0-16-9.5-30.5T707 750q-64-31-117-42.5T480 696q-57 0-111 11.5T252 750q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570 425q0-39-25.5-64.5T480 335q-39 0-64.5 25.5T390 425q0 39 25.5 64.5T480 515Zm0-90Zm0 411Z" />
                    </svg>
                    <p
                      id="mainAppNavList"
                      value={NAVIGATORHINTS.USER}
                      className="mobilenav-p"
                    >
                      User
                    </p>
                  </li>
                  <li style={{ border: "none" }} className="mainapp-navli">
                    <button
                      onClick={() => {
                        logOut();
                      }}
                      className="mainapp-lap-addOptns-logoutBtn"
                    >
                      {" "}
                      &#10006; Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <main className="mainapp-main">
            <div className="mainapp-lap-addOptns">
              <div className="mainapp-lap-addOptnsWrapper">
                <ul className="mainapp-lap-addOptns-ul">
                  <li className="mainapp-lap-addOptns-li">
                    <div className="mainapp-addOptns-li-div">
                      <div className="mainapp-addoptn-imgDiv">
                        <img
                          src="https://scontent.fmaa2-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Y9NY4mwYloEAX9wiH8v&_nc_ht=scontent.fmaa2-1.fna&oh=00_AfAtyy5d-ArpwgZmEULoMg5R9lXgF0p7xv8AfoNmvuFs5A&oe=648C77F8"
                          alt=""
                          className="mainapp-addoptn-img"
                        />
                      </div>
                      <h2 className="mainapp-addOptn-name-h2">{user?.name}</h2>
                    </div>
                  </li>
                  <li className="mainapp-lap-addOptns-li">
                    <button
                      onClick={() => {
                        logOut();
                      }}
                      className="mainapp-lap-addOptns-logoutBtn"
                    >
                      {" "}
                      &#10006; Log Out
                    </button>
                  </li>
                </ul>
                <div className="addOptns-lap-cmpy-info">
                  Production Media @VeeraBaagu&Co
                </div>
              </div>
            </div>
            <div className="mainapp-pagelayout">
              <PageRouter />
            </div>
          </main>
        </div>
        <div ref={inPageLoader} className="ls-loaderUi ls-displayLoader"></div>
      </div>
    </>
  );
}
