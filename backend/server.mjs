import express from "express";
import fetch from "node-fetch";
import fs from "fs";
const app = express();

const outputFilePath = "output.json";
const writeStream = fs.createWriteStream(outputFilePath, { flags: "w" });

app.listen(3300, () => {
  console.log("Server is running on port 3300");
});

app.get("/getsensors", async (req, res) => {
  try {
    const data = await api.getsensors();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/getdata", async (req, res) => {
  try {
    const data = await api.getdatalocal();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

class sensorApi {
  constructor() {
    setInterval(() => {
      this.getsensors();
    }, 30000);
  }

  getsensors() {
    fetch("https://data.sensor.community/airrohr/v1/filter/country=NL")
      .then((response) => {
        // Check if the response is OK (status code 200)
        if (!response.ok) {
          throw new Error(
            `API request failed with status code ${response.status}`
          );
        }

        // Stream the response data to the file
        response.body.pipe(writeStream);
      })
      .then(() => {
        console.log("API response data has been written to file successfully");
      })
      .catch((error) => {
        console.error("Failed to fetch API response:", error);
      });

    // Handle events during the streaming process
    writeStream.on("finish", () => {
      console.log("API response data has been written to file successfully");
    });

    writeStream.on("error", (error) => {
      console.error("Failed to write API response data to file:", error);
    });
  }
}

let api = new sensorApi();
