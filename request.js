//using the fetch api
const fetch = require("node-fetch");
const api_url = 'https://datascience-college.unc.edu/wp-json/tribe/events/v1/events';
async function getAPI(api_url) {
    try {
        const response = await fetch(api_url);
        var data = await response.json();
    }
    catch (error) {
        console.log(error);
    }
    return data.value;
}
//rendering event data from API
async function renderAPI() {
    let info = await getAPI(api_url);
    let infoArray = await info.map(event => {
        return { name: event.title, description: event.description, url: event.url, date: event.date}
    });
    var dataScienceEvents = await infoArray.filter((event) => {
        return event.description.includes('data science'); //case sensitive
    });
    //writing data to JSON file
    const fs = require('fs');
    const jsonString = JSON.stringify(dataScienceEvents, null, 2);
    fs.writeFile('./newEvents.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    });
    console.log(dataScienceEvents);
}
renderAPI()

export default renderAPI;