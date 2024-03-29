import { Suspense } from "react";
import { lazy, useState } from "react";
import "./style/settings.css";
import Fallback from "./Fallback";

export const SETTINGSPAGESTATE = {
  DEFAULT: "0",
  CHANGENAME: "1",
  DELETEACC: "2",
};

export default function Settings({ user }) {
  let [settingsPageState, setSPS] = useState(SETTINGSPAGESTATE.DEFAULT);

  function SettingsRouter() {
    if (settingsPageState === SETTINGSPAGESTATE.DEFAULT) {
      let Component = lazy(() => import("./SettingsPages/SettingsDefault"));
      return (
        <>
          <Suspense fallback={<Fallback />}>
            <Component setSPS={setSPS} />
          </Suspense>
        </>
      );
    } else if (settingsPageState === SETTINGSPAGESTATE.CHANGENAME) {
      let Component = lazy(() => import("./SettingsPages/sChangeName"));
      return (
        <>
          <Suspense fallback={<Fallback />}>
            <Component user={user} setSPS={setSPS} />
          </Suspense>
        </>
      );
    } else if (settingsPageState === SETTINGSPAGESTATE.DELETEACC) {
      let Component = lazy(() => import("./SettingsPages/SDelete"));
      return (
        <>
          <Suspense fallback={<Fallback />}>
            <Component user={user} setSPS={setSPS} />
          </Suspense>
        </>
      );
    }
  }

  return (
    <>
      <div className="settings-wrapper">
        <div className="settings-headingDiv">
          <h2 className="settings-h2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="35"
              viewBox="0 96 960 960"
              width="35"
            >
              <path d="m643 783 44-41q7-7 7-15.5t-7-15.5L535 559q5-14 8-27t3-27q0-58-41-99t-99-41q-17 0-34 5t-33 14l88 87-54 51-86-85q-9 16-13.5 33t-4.5 35q0 57 40 96.5t97 39.5q14 0 27.5-2.5T461 631l151 152q6 6 15.5 6t15.5-6ZM480 976q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z" />
            </svg>
            Profile WorkShop
          </h2>
        </div>
        <div className="settings-body">
          <SettingsRouter />
        </div>
      </div>
    </>
  );
}
