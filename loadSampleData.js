const fs = require("fs");

const loadSampleData = async () => {
  const data = JSON.parse(fs.readFileSync("./public/sampleData.json"));

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const options = {
      method: "POST",
      body: JSON.stringify(element),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch("http://localhost:3000/api/addpg", options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
};

loadSampleData();
