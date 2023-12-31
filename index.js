import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=9001aeffe501a8c6cb33e1c8ddb91b4e");
         const result = response.data;
          res.render("index.ejs",{data : result});
        } catch (error) {
          console.error("Failed to make request:", error.message);
          res.render("index.ejs", {
            error: error.message,
          });
        }
  });

  app.post("/", async (req, res) => {

    try{
        console.log(req.body);
        const city=req.body.cityname;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9001aeffe501a8c6cb33e1c8ddb91b4e`);
        const result = response.data;
       
        console.log(result);
        res.render("index.ejs",{data : result});
      }
      catch(error){
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error:"NO activity match your criteria ",
        });
      }
    });

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });