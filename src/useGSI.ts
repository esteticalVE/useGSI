import { useCallback, useEffect, useRef, useState } from "react";
import { getGSIInstance } from "./utils";
import { loadGSIScript } from "./loadGSIScript";

enum LOAD_STATUSES {
  INIT = "init",
  SUCCESS = "success",
  LOADING = "loading",
  FAILED = "failed",
}

type DefaultClientUseGSIOptions = {
  readonly initializeConfig: Parameters<
    typeof window.google.accounts.id.initialize
  >[0];
  readonly buttonConfig?: Parameters<
    typeof window.google.accounts.id.renderButton
  >[1];
  method?: keyof Pick<typeof google.accounts.id, "renderButton" | "prompt">;
  autoInitialize?: boolean;
};

type CustomClientUseGSIOptions = {
  method: "customClient";
};

export type UseGSIOptions =
  | DefaultClientUseGSIOptions
  | CustomClientUseGSIOptions;

export type CustomClientCallbackParams =
  | {
      flow: "initCodeClient";
      initialConfig: Parameters<
        typeof window.google.accounts.oauth2.initCodeClient
      >[0];
    }
  | {
      flow: "initTokenClient";
      initialConfig: Parameters<
        typeof window.google.accounts.oauth2.initTokenClient
      >[0];
      overrideConfig?: google.accounts.oauth2.OverridableTokenClientConfig;
    };

export function useGSI(options: UseGSIOptions) {
  const googleInstanceRef = useRef(getGSIInstance());
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const [configs] = useState(
    options.method === "customClient"
      ? { method: options.method }
      : {
          initializeConfig: options.initializeConfig,
          buttonConfig: options.buttonConfig,
          method: options.method ?? "prompt",
          autoInitialize:
            options.autoInitialize === undefined
              ? true
              : options.autoInitialize,
        }
  );
  const { method } = configs;

  const [status, setStatus] = useState(
    googleInstanceRef.current ? LOAD_STATUSES.SUCCESS : LOAD_STATUSES.INIT
  );

  const initCustomClient = useCallback(
    (params: CustomClientCallbackParams) => {
      if (status !== LOAD_STATUSES.SUCCESS) {
        return;
      }

      if (method !== "customClient") {
        return;
      }

      const instance = googleInstanceRef.current;
      if (!instance) {
        return;
      }
      switch (params.flow) {
        case "initCodeClient":
          instance.oauth2.initCodeClient(params.initialConfig).requestCode();
          break;
        case "initTokenClient":
          instance.oauth2
            .initTokenClient(params.initialConfig)
            .requestAccessToken(params.overrideConfig);
          break;
      }
    },
    [status, method]
  );

  const initDefaultClient = useCallback(() => {
    if (status !== LOAD_STATUSES.SUCCESS) {
      return;
    }

    if (method !== "renderButton" && method !== "prompt") {
      return;
    }

    const instance = googleInstanceRef.current;
    if (!instance) {
      return;
    }

    switch (method) {
      case "prompt":
        instance.id.initialize(configs.initializeConfig);
        instance.id.prompt();
        break;

      case "renderButton":
        if (!buttonRef.current) {
          return;
        }
        instance.id.initialize(configs.initializeConfig);
        instance.id.renderButton(
          buttonRef.current,
          configs.buttonConfig || { type: "standard" }
        );
        break;
    }
  }, [configs.buttonConfig, configs.initializeConfig, status, method]);

  useEffect(() => {
    if (status !== LOAD_STATUSES.INIT) {
      return;
    }

    setStatus(LOAD_STATUSES.LOADING);

    loadGSIScript()
      .then((res) => {
        googleInstanceRef.current = res;
        setStatus(LOAD_STATUSES.SUCCESS);
      })
      .catch(() => {
        googleInstanceRef.current = null;
        setStatus(LOAD_STATUSES.FAILED);
      });
  }, [status]);

  useEffect(() => {
    if (configs.autoInitialize) {
      initDefaultClient();
    }
  }, [configs.autoInitialize, initDefaultClient]);

  return {
    instance: googleInstanceRef.current,
    error: status === LOAD_STATUSES.FAILED,
    buttonRef,
    initCustomClient,
    initDefaultClient,
  };
}
