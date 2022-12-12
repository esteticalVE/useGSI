import React from "react";
import { useGSI } from "use-gsi";
import { Link } from "./Link";
import { clientId } from "../constants";

interface Props {
  successCallback: Parameters<
    typeof google.accounts.id.initialize
  >[0]["callback"];
}

export function AutoInitPrompt(props: Props) {
  const { successCallback } = props;

  useGSI({
    initializeConfig: {
      client_id: clientId,
      callback: successCallback,
    },
  });

  return (
    <>
      <h2>Auto initialized "prompt" example</h2>
      <p>
        <Link
          href="https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.prompt"
          title="Google Docs"
        />
      </p>
    </>
  );
}
