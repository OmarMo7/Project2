
// Creating a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();




//Constant variables
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "1845f8fe3d7ad85ba364dfd7bd85ead3";

/**
 * Secondry function
 */

function reload() {
    window.location.reload();
    document.getElementById('feelings').value = '';
    document.getElementById("zip").value = '';

}

/**
 * Main functions
 */

 //Updating UI after fetching data
const updateUI = async () => {

//Assigning variables to initial values
    document.getElementById('date').innerHTML = 'Date:  ';
    document.getElementById('content').innerHTML = 'Your Feeling:  ';
    document.getElementById('temp').innerHTML = 'Temperature:  ';
    try {
        let content = document.getElementById('feelings').value;
        const zipCode = document.getElementById("zip").value;
        if (zipCode == ''){//if the user entered nothing in "zipCode" input
            document.getElementById('content').innerHTML += '...';
            document.getElementById('temp').innerHTML += '...';
        }
        else{
            const temp = await fetchData(baseURL, zipCode, apiKey);
            document.getElementById('content').innerHTML += content;
            document.getElementById('temp').innerHTML += (temp + ' f');
        }
        document.getElementById('date').innerHTML += newDate;
        
    }
    catch (error) {
        console.log("error", error);
    }
    
}

//Event listener to "Generate" button
document.getElementById("generate").addEventListener("click", updateUI);

// Async POST
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),      
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};


// Async function to fetch the data
const fetchData = async (baseURL, zip, key) => {
    try {
        const res = await fetch(baseURL + zip + ",us" + "&appid=" + key);
        const data = await res.json();
        const temp = data.main.temp;
        console.log(data);
        postData('http://localhost:3000/', data);

        return temp;
    } catch (error) {
        console.log("error", error);
    }
};
