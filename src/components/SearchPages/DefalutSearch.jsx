import { useEffect, useRef, useState } from "react";
import "./style/defalutSearch.css";
import { SEARCHSTATE } from "../SearchPage";

export default function DefalutSearch({ setSearchState, setSUser }) {
  let searchInput = useRef();
  let [searchUsers, setSU] = useState([]);

  function viewUser(event) {
    let userObj = JSON.parse(event.target.getAttribute("uservalue"));
    setSUser(userObj)
    setSearchState(SEARCHSTATE.USER);
  }

  useEffect(() => {
    searchInput.current.addEventListener("input", (event) => {
      let like = event.target.value.trim();
      if (like.length === 0) {
        setSU([]);
        return;
      }
      let dataObj = { name: like };

      fetch("http://localhost/getProfileMatch", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(dataObj),
      })
        .then((res) => res.json())
        .then((dats) => {
          setSU(dats);
        });
    });
  }, []);

  return (
    <>
      <div className="df-s-wrapper">
        <div className="df-s-sr-div">
          <div className="df-s-in-wrapper">
            <input
              type="text"
              className="df-s-input"
              placeholder="Search"
              ref={searchInput}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>
        </div>
        <div className="df-s-body">
          {searchUsers.length > 0 &&
            searchUsers.map((elem) => {
              return (
                <>
                  <HomeUserCard
                    NAME={elem.name}
                    USERVALUE={JSON.stringify(elem)}
                    viewUser={viewUser}
                  />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

function HomeUserCard({ NAME, USERVALUE, viewUser }) {
  return (
    <>
      <div className="h-Card-wrapper">
        <div className="h-card-userDiv">
          <div className="h-card-imgDiv">
            <img
              src="https://scontent.fmaa2-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Y9NY4mwYloEAX9wiH8v&_nc_ht=scontent.fmaa2-1.fna&oh=00_AfAtyy5d-ArpwgZmEULoMg5R9lXgF0p7xv8AfoNmvuFs5A&oe=648C77F8"
              alt=""
              className="h-card-img"
            />
          </div>
          <div className="h-card-nameDiv">
            <h2 className="h-card-name">{NAME}</h2>
          </div>
        </div>
        <div className="h-card-viewbtn-Div">
          <button
            className="h-card-v-btn"
            onClick={(event) => {
              viewUser(event);
            }}
            uservalue={USERVALUE}
          >
            View Profile
          </button>
        </div>
      </div>
    </>
  );
}
