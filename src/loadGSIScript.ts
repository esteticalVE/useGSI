import { getGSIInstance } from "./utils";

const GSIScriptRequestPromise = new Promise<typeof google.accounts>(
  (resolve, reject) => {
    const instance = getGSIInstance();
    if (instance) {
      resolve(instance);
      return;
    }
    loadScript(resolve, reject);
  }
);

export function loadGSIScript() {
  return GSIScriptRequestPromise;
}

function loadScript(
  onSuccess: (value: typeof google.accounts) => void,
  onError: (reason: string) => void
) {
  const scriptTag = document.createElement("script");

  scriptTag.src = "https://accounts.google.com/gsi/client";
  scriptTag.async = true;
  scriptTag.defer = true;

  scriptTag.onload = () => {
    const instance = getGSIInstance();
    instance ? onSuccess(instance) : onError("GSI: Instance doesn't exist");
  };

  scriptTag.onerror = () => {
    onError("GSI: Failed loading script");
  };

  document.body.appendChild(scriptTag);
}
