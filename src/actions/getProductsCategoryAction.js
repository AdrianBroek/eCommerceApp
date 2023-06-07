import axios from "axios"

const getProductsCategoryAction = async (url) => {
    const options = {
        url: "https://dummyjson.com/products/category/"+url,
        method: "GET"
    }

    const data = await axios.request(options)
    // console.log(data.data.products)
    return data.data.products

}

export default getProductsCategoryAction