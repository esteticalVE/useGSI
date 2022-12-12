import React from "react";
import { useGSI } from "use-gsi";
import { Link } from "./Link";
import { clientId } from "../constants";

interface Props {
  successCallback: Parameters<
    typeof google.accounts.oauth2.initTokenClient
  >[0]["callback"];
}

export function CustomButtonTokenCallback(props: Props) {
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
      flow: "initTokenClient",
    });
  }

  return (
    <>
      <h2>Initialize a Token client with custom button example</h2>
      <p>
        <Link
          href="https://developers.google.com/identity/oauth2/web/guides/use-token-model#initialize_a_token_client"
          title="Google Docs"
        />
      </p>
      <button className="custom-token-button" onClick={() => onButtonClick()}>
        Custom button click 🫶
      </button>
    </>
  );
}
