import React from "react";
import axios from "axios";

const GenerateImage = async(url) => {
    const options = {
        url: "https://picsum.photos/200",
        method: "GET"
    }
    const data = await axios.request(options)

    console.log(data.data)
}

export default GenerateImage