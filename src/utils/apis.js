import axios from "axios";

export const saveScrape = async (url) => {
    try {
        const response = await axios.post('http://localhost:3001/api/scrape', { url })
        console.log("🚀 ~ saveScrape ~ response:", response)

    } catch (error) {
        console.log("🚀 ~ saveScrape ~ error:", error)        
    }
}

export const getCompanyList = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/company');
        console.log("🚀 ~ saveScrape ~ response:", response)
        return response.data;
    } catch (error) {
        console.log("🚀 ~ getCompanyList ~ error:", error)        
    }
}

export const deleteCompanyData = async (ids) => {
    try {
        const response = await axios.post('http://localhost:3001/api/company', { ids } )
    } catch (error) {
        console.log("🚀 ~ deleteCompanyData ~ error:", error);        
    }
}

export const getCompanyDetail = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/company/${id}`)
        console.log("🚀 ~ deleteCompanyData ~ response:", response);
        return response.data;
    } catch (error) {
        console.log("🚀 ~ deleteCompanyData ~ error:", error);        
    }
}

export const takeScreenshot = async (url) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/screenshot`, { url })
        // const response = await fetch("http://localhost:3001/api/screenshot", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ url }),
        // });
        // console.log("🚀 ~ takeScreenshot ~ response:", response);

        // if (!response.ok) {
        //     throw new Error("Failed to fetch screenshot");
        // }

        // // Convert response to a Blob
        // const bolobResponse = await response.blob()
        // console.log("🚀 ~ takeScreenshot ~ bolobResponse:", bolobResponse)
        // return bolobResponse;
        console.log("🚀 ~ takeScreenshot ~ response:", response);
        return response;
    } catch (error) {
        console.log("🚀 ~ takeScreenshot ~ error:", error);        
    }
}