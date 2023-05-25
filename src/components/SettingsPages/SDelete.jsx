import "./style/sdelete.css";
import { SETTINGSPAGESTATE } from "../Settings";
import { toogleLSLoader } from "../MainApp";

export default function SDelete({ setSPS,user }) {
  function deleteAction() {
    let inputz = document.querySelectorAll("input");
    if (inputz[0].value === "" || inputz[1].value === "") {
      toogleLSLoader();
      return;
    }
    let DELOBJ = {
      name: inputz[0].value,
      password: inputz[1].value,
    };
    toogleLSLoader();

    fetch("http://localhost/evictMe", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(DELOBJ),
    })
    .then((res)=>{
        setTimeout(()=>{
           if(res.status===200){
               toogleLSLoader();
               window.location.reload();
           }
           else{
               return;
           }
        },1000)
    });
  }

  return (
    <>
      <div className="s-d-wrapper">
        <div className="s-d-heading">
          <div className="s-d-b-btnDiv">
            <button
              className="s-d-b-btn"
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
        </div>
        <div className="s-d-body">
          <div className="s-d-inputDiv">
            <input placeholder="Name" type="text" className="s-d-input" value={user?.name} readOnly />
          </div>
          <div className="s-d-inputDiv">
            <input placeholder="Password" type="text" className="s-d-input" />
          </div>
          <div className="s-d-del-btnDiv">
            <button
              className="s-d-del-btn"
              onClick={() => {
                deleteAction();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 0 24 24"
                width="30px"
                fill="#ffffff"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M14.12 10.47L12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z" />
              </svg>
              ERASE ME
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
