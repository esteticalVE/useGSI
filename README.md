# useGSI

## Introduction

A tiny React hook that simplifies the process of using the Google Identity Service in a React application

## Install

**npm**

```sh
npm install use-gsi
```

**yarn**

```sh
yarn add use-gsi
```

## Quick Start

### Auto initilized google button

Get your [**Google API client ID**](https://console.cloud.google.com/apis/dashboard)

```jsx
import React from "react";
import { useGSI } from "use-gsi";

export default function App() {
  const [data, setData] = useState({});

  const { buttonRef } = useGSI({
    initializeConfig: {
      //Google API client ID
      client_id: clientId,
      callback: (response) => setData(response),
    },
    method: "renderButton",
    buttonConfig: {
      theme: "outline",
      type: "standard",
    },
  });

  console.log(data);

  return <div ref={buttonRef} />;
}
```

## Options

// TODO

## License

The MIT License.
