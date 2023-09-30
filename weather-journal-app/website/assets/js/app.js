/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";//The URL to retrieve the weather information from API
//Personal API key fro OpenWetherApp API,  
const APIKey = ",&appid=792fc2feef884949b23f5113c7c34853&units=metric";// &units=metric to get Celsius degree 
const generateBtn = document.getElementById("generate");
const error = document.getElementById("error");
const entry = document.querySelector('.holder.entry');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

//Callback function called by event listener  
const displayData = () => {
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    //To get weather data 
    getData(zipCode).then((data) => {
            const {
              main: { temp },
              name: city
            } = data;
            const info = {
              newDate,
              city,
              temp: Math.round(temp),
              feelings,
            };
        postData("/addData", info);
       
    }).then(() => {
        updatePageUI();
        entry.style.opacity = 1;
    });
};
//Function to get web API data
const getData = async (zipCode) => {
    try {
        const response = await fetch(baseURL + zipCode + APIKey);
        const data = await response.json();
        //To show the error massage
        if (data.cod != 200) {
            error.innerHTML = data.message;
            console.log(data.message);
            entry.style.opacity = 0;
            //Timeout to remove the error message
            setTimeout(() => {
                error.innerHTML = '';
            }, 3000);
            throw `${data.message}`;
        }
        return data;
    } catch (error) {
        console.log(error);
    }
};
//Function to POST data 
const postData = async (url = "", info = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });
    try {
        const newEntryData = await response.json();
        console.log(newEntryData);
        return newEntryData;
    } catch (error) {
        console.log(error);
    }
};

// Function to get data from the server and updating UI 
const updatePageUI = async ()=>{
        const response = await fetch("/allData");
    try{
        const result = await response.json();
        document.getElementById("date").innerHTML = result.newDate;
        document.getElementById("city").innerHTML = result.city;
        document.getElementById("temp").innerHTML = result.temp + '&degC';
        if(result.temp < 20){
            document.getElementById("img").setAttribute("src","./assets/images/snow.png");
        }
        else if(result.temp > 30) {
            document.getElementById("img").setAttribute("src","./assets/images/hot.png");
        }
        else {
            document.getElementById("img").setAttribute("src","./assets/images/mild.png");
        }
        document.getElementById("content").innerHTML = result.feelings;
    }catch(error) {
        console.log(error);
    }
    
};
//Event Listener to call the function(displayData)  after clicking generate button
generateBtn.addEventListener("click", displayData);