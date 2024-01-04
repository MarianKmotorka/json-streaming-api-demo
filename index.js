const express = require("express");
var cors = require("cors");
const app = express();

app.use(cors());

const jsonArray = [
  [
    {
      appCode: "Aura",
      data: [
        {
          name: "Pascal Test 2",
          id: "e512d7f3-685d-449a-b857-19771365f2ab",
          appCode: "Aura",
          metaData: {
            url: "https://deu-auraonline-stg.de.ema.pwcinternal.com/",
            lastUpdateDate: "2023-12-19T15:41:52.017000",
            status: "Deployed/Active",
          },
        },
      ],
      success: true,
      error: null,
    },
  ],
  [
    {
      appCode: "IDA",
      data: [
        {
          name: "Landing Page Demo GmbH 12/31/2021",
          id: "e512d7f3-685d-449a-b857-19771365f2ab",
          appCode: "IDA",
          metaData: {
            url: "https://prismapps-qa.pwchalo.com/",
            teamId: "e512d7f3-685d-449a-b857-19771365f2ab",
            lastUpdateDate: "2023-11-29 15:37:35.491490",
          },
        },
      ],
      success: true,
      error: null,
    },
    {
      appCode: "CCA",
      data: [
        {
          name: "Landing Page Demo GmbH 12/31/2021",
          id: "e512d7f3-685d-449a-b857-19771365f2ab",
          appCode: "CCA",
          metaData: {
            url: "https://prismapps-qa.pwchalo.com/",
            teamId: "e512d7f3-685d-449a-b857-19771365f2ab",
            lastUpdateDate: "2023-11-29 20:34:55.804861",
          },
        },
      ],
      success: true,
      error: null,
    },
  ],
  [
    {
      appCode: "Connect",
      data: [
        {
          name: "Audit Suite Test Site",
          id: "45377e23-84ff-4520-ac7b-96703eb07890",
          appCode: "Connect",
          metaData: {
            url: "https://central.connect-stage.pwc.com/",
          },
        },
      ],
      success: true,
      error: null,
    },
  ],
  [
    {
      appCode: "sput",
      data: [
        {
          name: "Pascal Test 2 - SPUT 2.0",
          id: "45436247",
          appCode: "sput",
          metaData: {
            url: "https://ccp-int.pwcinternal.com",
            lastUpdateDate: "2024-01-04T13:06:34.6922357Z",
            status: null,
          },
        },
      ],
      success: true,
      error: null,
    },
  ],
];

// Define a streaming endpoint
app.get("/stream-json", (req, res) => {
  // Set the content type to application/json
  res.setHeader("Content-Type", "application/json");

  // Function to stream each JSON array with a timeout
  const streamJsonArrayWithTimeout = (index) => {
    if (index < jsonArray.length) {
      res.write(JSON.stringify(jsonArray[index]) + "\n");

      // Introduce a timeout before streaming the next array
      setTimeout(() => {
        streamJsonArrayWithTimeout(index + 1);
      }, 1000); // 1000 milliseconds (1 second) timeout
    } else {
      // End the response to close the connection after streaming all arrays
      res.end();
    }
  };

  // Start streaming the JSON arrays with a timeout
  streamJsonArrayWithTimeout(0);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
