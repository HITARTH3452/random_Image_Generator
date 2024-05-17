const express = require("express");
const axios = require("axios");
const sharp = require("sharp")

const app = express();

app.use(express.json());

const PORT = 3000;

const ApiKey = "jJOsKomlppevkczpHakWwsa2etKpM5M4ZBIpCg8k6rE";

app.get("/random/image", async (req, res) => {
    try {
        const resp = await axios({
            method: "get",
            url: "https://api.unsplash.com/photos/random",
            headers: {
                Authorization: `Client-ID ${ApiKey}`
            }
        })

        const imageUrl = resp.data.urls.full;
        console.log(imageUrl);

        const imageData = await axios({
            method : "get",
            url : imageUrl,
            responseType: 'arraybuffer'
        })


        const resizeImage = await sharp(imageData.data).resize({
            height : 300,
            width : 400
        }).toBuffer();


        res.setHeader("content-type" , "image/jpeg")

        res.status(200).send(resizeImage);
    
    }catch(err){
        console.log(err)

        res.status(500).json({
            message : "Internal server error"
        })
    }
});
    
app.listen(PORT, () => console.log("Server is runnign on 3000"));