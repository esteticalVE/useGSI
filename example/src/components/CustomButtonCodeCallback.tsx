import React from "react";
import { useGSI } from "use-gsi";
import { Link } from "./Link";
import { clientId } from "../constants";

interface Props {
  successCallback: Parameters<
    typeof google.accounts.oauth2.initCodeClient
  >[0]["callback"];
}

export function CustomButtonCodeCallback(props: Props) {
  const { successCallback } = props;

  const { initCustomClient } = useGSI({
    method: "customClient",
  });

  function onButtonClick() {
    initCustomClient({
      initialConfig: {
        client_id: clientId,
        callback: successCallback,
        scope: "openid profile email",
      },
      flow: "initCodeClient",
    });
  }

  return (
    <>
      <h2>Initialize a Code Client with custom button example</h2>
      <p>
        <Link
          href="https://developers.google.com/identity/oauth2/web/guides/use-code-model#initialize_a_code_client"
          title="Google Docs"
        />
      </p>
      <button className="custom-code-button" onClick={() => onButtonClick()}>
        Custom button click 🫶
      </button>
    </>
  );
}
