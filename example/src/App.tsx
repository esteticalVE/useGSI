import React, { useCallback, useMemo, useState } from "react";
import { Tabs } from "./components/Tabs";
import { AutoInitButton } from "./components/AutoInitButton";
import { AutoInitPrompt } from "./components/AutoInitPrompt";
import { CustomButtonCodeCallback } from "./components/CustomButtonCodeCallback";
import { CustomButtonTokenCallback } from "./components/CustomButtonTokenCallback";
import { InitPrompt } from "./components/InitPrompt";
import { RenderButton } from "./components/RenderButton";

const tabsNames = [
  "AutoInitPrompt",
  "AutoInitButton",
  "CustomButtonCodeCallback",
  "CustomButtonTokenCallback",
  "InitPrompt",
  "RenderButton",
];

type ClientData =
  | google.accounts.id.CredentialResponse
  | google.accounts.oauth2.TokenResponse
  | unknown
  | null;

export default function App() {
  const [tabData, setTabData] = useState(tabsNames[2]);
  const [clientData, setClientData] = useState<ClientData>(null);

  const tabHandler = useCallback(
    (tab: string) => {
      if (tab === tabData) {
        return;
      }
      setClientData(null);
      setTabData(tab);
    },
    [tabData]
  );

  const renderTabs = useMemo(() => {
    switch (tabData) {
      case "AutoInitPrompt":
        return <AutoInitPrompt successCallback={(res) => setClientData(res)} />;
      case "AutoInitButton":
        return <AutoInitButton successCallback={(res) => setClientData(res)} />;
      case "CustomButtonTokenCallback":
        return (
          <CustomButtonTokenCallback
            successCallback={(res) => setClientData(res)}
          />
        );
      case "CustomButtonCodeCallback":
        return (
          <CustomButtonCodeCallback
            successCallback={(res) => setClientData(res)}
          />
        );
      case "RenderButton":
        return <RenderButton successCallback={(res) => setClientData(res)} />;
      case "InitPrompt":
        return <InitPrompt successCallback={(res) => setClientData(res)} />;
      default:
        return null;
    }
  }, [tabData]);

  return (
    <main>
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <Tabs
              items={tabsNames}
              currentItem={tabData}
              clickHandler={tabHandler}
            />
          </div>
        </div>
      </header>
      <section>
        <div className="container">{renderTabs}</div>
      </section>
      <hr />
      <div>
        <div className="container">
          Response:<pre>{JSON.stringify(clientData)}</pre>
        </div>
      </div>
    </main>
  );
}
