import { useEffect, useState } from "react";
import "./defaulth.css";
import { HOMESTATES } from "../Home";

export default function DefaultH({ setDispUser, setHS }) {
  let [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost/getWe")
      .then((res) => res.json())
      .then((dats) => {
        setAllUsers(dats);
      });
  }, []);

  function viewUser(event) {
    let thisUser = JSON.parse(event.target.getAttribute("uservalue"));
    setDispUser(thisUser);
    setHS(HOMESTATES.USER)
  }

  return (
    <>
      <div className="def-h-wrapper">
        <div className="def-h-headingDiv">
          <h2>All Available Users</h2>
        </div>
        {allUsers.length > 0 &&
          allUsers.map((elem) => {
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
