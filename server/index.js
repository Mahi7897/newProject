const express = require("express");
const cors = require("cors");

const app = express();
const port = 3002; // Update the port number as needed
let offset = 0;
let limit = 100;

// Allow requests from the origin where your React application is hosted
const corsOptions = {
  origin: "http://localhost:5173",
  // Update with your React app's URL
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  try {
    const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&offset=0`);

    const Data = await response.json();
      offset=offset+limit;
    res.send(Data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data from API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
