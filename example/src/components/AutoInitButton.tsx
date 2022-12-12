import React from "react";
import { useGSI } from "use-gsi";
import { Link } from "./Link";
import { clientId } from "../constants";

interface Props {
  successCallback: Parameters<
    typeof google.accounts.id.initialize
  >[0]["callback"];
}

export function AutoInitButton(props: Props) {
  const { successCallback } = props;

  const { buttonRef } = useGSI({
    initializeConfig: {
      client_id: clientId,
      callback: successCallback,
    },
    method: "renderButton",
    buttonConfig: {
      theme: "outline",
      type: "standard",
    },
  });

  return (
    <>
      <h2>Auto initialized "renderButton" example</h2>
      <p>
        <Link
          href="https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.renderButton"
          title="Google Docs"
        />
      </p>

      <div className="google-button-container" ref={buttonRef} />
    </>
  );
}
