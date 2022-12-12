import React, { useEffect, useState } from "react";
import { useGSI } from "use-gsi";
import { Link } from "./Link";
import { clientId } from "../constants";

interface Props {
  successCallback: Parameters<
    typeof google.accounts.id.initialize
  >[0]["callback"];
}

export function RenderButton(props: Props) {
  const { successCallback } = props;
  const [flag, setFlag] = useState(false);

  const { initDefaultClient, buttonRef } = useGSI({
    initializeConfig: {
      client_id: clientId,
      callback: successCallback,
    },
    method: "renderButton",
    buttonConfig: {
      theme: "outline",
      type: "standard",
    },
    autoInitialize: false,
  });

  useEffect(() => {
    if (!flag) {
      return;
    }
    initDefaultClient();
  }, [flag, initDefaultClient]);

  return (
    <>
      <h2>Initialize "renderButton" example</h2>
      <p>
        <Link
          href="https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.renderButton"
          title="Google Docs"
        />
      </p>
      <div>
        <div>
          <p>Render button if flag true</p>
          <div className="spacer">
            <button onClick={() => setFlag(true)}>Set true</button>
            <div className="spacer">Flag state: {String(flag)}</div>
          </div>
        </div>
      </div>
      <div className="google-button-container" ref={buttonRef} />
    </>
  );
}
