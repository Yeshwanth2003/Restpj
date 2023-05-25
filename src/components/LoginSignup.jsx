import { useCallback, useContext, useRef } from "react";
import "./style/loginsignup.css";
import ContextTag from "./AppContext";
import { PAGESTATE } from "../App";

export default function LoginSignup({ setCurrentPage, setUser }) {
  let inPageLoader = useRef();

  function toogleLSLoader() {
    inPageLoader.current.classList.toggle("ls-displayLoader");
  }

  return (
    <>
      <div className="ls-wrapper">
        <div className="ls-container">
          <div className="ls-logoName-div">
            <div className="ls-logoName-main">
              <div className="ls-appNameDiv">
                <h1 className="ls-h2">makkalMedia</h1>
              </div>
              <div className="ls-logo-paraDiv">
                <p className="ls-para">
                  Makkal Media helps you connect with the people in your life.
                </p>
              </div>
            </div>
          </div>
          <main className="ls-mainDiv">
            <ContextTag.Provider
              value={{ toogleLSLoader, setUser, setCurrentPage }}
            >
              <LoginOrSignup />
            </ContextTag.Provider>
            <p className="ls-mainDiv-p">
              Know Who's There <span>Around You</span>
            </p>
          </main>
        </div>
        <div ref={inPageLoader} className="ls-loaderUi ls-displayLoader"></div>
      </div>
    </>
  );
}

function LoginOrSignup() {
  let { toogleLSLoader, setUser, setCurrentPage } = useContext(ContextTag);

  let toogleSignUp = useCallback(() => {
    let losContainer = document.getElementById("losSlider");
    losContainer.classList.toggle("los-container-signup");
  }, []);

  return (
    <>
      <div className="los-wrapper">
        <div id="losSlider" className="los-container">
          <ContextTag.Provider
            value={{ toogleSignUp, toogleLSLoader, setUser, setCurrentPage }}
          >
            <Login />
            <Signup />
          </ContextTag.Provider>
        </div>
      </div>
    </>
  );
}

function Login() {
  let { toogleSignUp, toogleLSLoader, setUser, setCurrentPage } =
    useContext(ContextTag);

  let loginPost = useCallback(() => {
    let name = document.getElementById("lName").value;
    let password = document.getElementById("lPassword").value;
    let lWarning = document.getElementById("lWarning");

    if (name === "" || password === "") {
      lWarning.classList.add("ls-display-wraning");
      return;
    }
    toogleLSLoader();

    lWarning.classList.remove("ls-display-wraning");

    const dataObj = { name, password };

    fetch("http://localhost/getMe", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => {
        setTimeout(() => {
          if (res.status !== 200) return;
          res.json().then((dats) => {
            toogleLSLoader();
            if (dats.name === "Not found") {
              lWarning.classList.add("ls-display-wraning");
              return;
            }
            lWarning.classList.remove("ls-display-wraning");
            setUser(dats);
            setCurrentPage(PAGESTATE.HOME);
          });
        }, 1000);
      })
      .catch(() => {
        return;
      });
  }, [toogleLSLoader, setCurrentPage, setUser]);

  return (
    <>
      <div className="l-wrapper">
        <div className="l-container">
          <div className="l-body">
            <div className="l-inputs-div">
              <input
                id="lName"
                type="text"
                className="l-input"
                placeholder="Name"
              />
              <input
                id="lPassword"
                type="password"
                className="l-input"
                placeholder="Password"
              />
              <h4 id="lWarning" className="l-wraning-msg">
                Enter Valid Details....
              </h4>
            </div>
            <div className="l-button-wrapper">
              <div className="l-buttondiv">
                <button
                  style={{ backgroundColor: "royalblue" }}
                  className="l-button"
                  onClick={() => loginPost()}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="l-foot">
            <div className="l-foot-buttonDiv">
              <button
                style={{ backgroundColor: "limegreen" }}
                className="l-button"
                onClick={() => {
                  toogleSignUp();
                }}
              >
                Create New Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Signup() {
  let { toogleSignUp, toogleLSLoader } = useContext(ContextTag);

  let signupPost = useCallback(() => {
    let name = document.getElementById("sNameInput").value;
    let password = document.getElementById("sPasswordInput").value;
    let phone = document.getElementById("sPhoneNumberInput").value;
    let dob = document.getElementById("sDOBInput").value;
    let sWraning = document.getElementById("sWraning");

    if (name === "" || password === "" || phone === "" || dob === "") {
      sWraning.classList.add("ls-display-wraning");
      return;
    }
    toogleLSLoader();
    sWraning.classList.remove("ls-display-wraning");

    let dataObj = { name, password, phone, dob };

    fetch("http://localhost/addMe", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => {
        setTimeout(() => {
          if (res.status !== 200) return;
          toogleSignUp();
          toogleLSLoader();
        }, 1000);
      })
      .catch(() => {
        return;
      });
  }, [toogleSignUp, toogleLSLoader]);

  return (
    <>
      <div className="s-wrapper">
        <div className="s-container">
          <div className="s-inputDiv">
            <input
              id="sNameInput"
              className="s-input"
              type="text"
              placeholder="Name"
            />
            <input
              id="sPasswordInput"
              className="s-input"
              type="text"
              placeholder="New Password"
            />
            <input
              id="sPhoneNumberInput"
              className="s-input"
              type="text"
              placeholder="Phone Number"
            />
            <input
              id="sDOBInput"
              className="s-input"
              type="text"
              placeholder="DOB"
            />
            <div className="s-errorDiv">
              <h4 id="sWraning" className="l-wraning-msg">
                Enter Valid Details....
              </h4>
            </div>
          </div>
          <div className="s-buttonWrapper">
            <div className="s-button-div">
              <button className="s-button" onClick={() => signupPost()}>
                SignUp
              </button>
              <button
                onClick={() => {
                  toogleSignUp();
                }}
                className="s-button2"
              >
                Already Have An Account ?
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
