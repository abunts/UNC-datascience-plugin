//using the fetch api
const fetch = require("node-fetch");
//creating the api to call
const api_url = 'https://datascience-college.unc.edu/events/';
async function getAPI(api_url) {
    try {
        const response = await fetch(api_url);
        var data = await response.json();
    }
    catch (error) {
        console.log(error);
    }
    //accounting for json parsing error (enpoint might be sensitive to "user-agent")
    headers: {
        Accept: 'application/json, text/plain, */*',
            'User-Agent';
    }
    return data.value;
}
//rendering event data from API
async function renderAPI() {
    let info = await getAPI(api_url);
    let infoArray = await info.map(event => {
        return { name: event.tribe-events-single-event-title, description: event.tribe-venue, url: event.tribe-events-event-url, date: event.tribe-events-date-start}
        //description is set to venue type bc there isn't a description yet
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