import "./style/schname.css";
import { SETTINGSPAGESTATE } from "../Settings";
import { toogleLSLoader } from "../MainApp";

export default function ChangeName({ setSPS,user }) {
  function changeName() {
    let inputz = document.querySelectorAll("input");

    if (
      inputz[0].value === "" ||
      inputz[1].value === "" ||
      inputz[2].value === ""
    ) {
      toogleLSLoader();
      return;
    }

    const OBJ = {
      name: inputz[0].value,
      password: inputz[1].value,
      newName: inputz[2].value,
    };
    toogleLSLoader();
    fetch("http://localhost/updateMe", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(OBJ),
    }).then((res) => {
      setTimeout(() => {
        if (res.status === 200) {
          toogleLSLoader();
          alert("Name Updated Successfully");
          window.location.reload();
        } else {
          toogleLSLoader();
        }
      }, 1000);
    });
  }

  return (
    <>
      <div className="ch-n-wrapper">
        <div className="ch-n-header">
          <button
            className="ch-n-back-btn"
            onClick={() => {
              setSPS(SETTINGSPAGESTATE.DEFAULT);
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
        <div className="ch-n-body">
          <div className="ch-n-inDiv">
            <input type="text" placeholder="Name" className="ch-n-input" value={user?.name} readOnly/>
          </div>
          <div className="ch-n-inDiv">
            <input type="text" placeholder="Password" className="ch-n-input" />
          </div>
          <div className="ch-n-inDiv">
            <input type="text" placeholder="NewName" className="ch-n-input" />
          </div>
          <div className="ch-n-s-btnDiv">
            <button
              onClick={() => {
                changeName();
              }}
              className="ch-n-s-btn"
            >
              Make It !
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
