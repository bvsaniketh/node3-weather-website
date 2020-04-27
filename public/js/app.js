console.log("Client Side JavaScript Loaded");

const weatherForm = document.querySelector('form');
const locationValue = document.querySelector('input');
const messageOne = document.querySelector("#message1");
const messageTwo = document.querySelector("#message2")

// addEventListener will react for all the required provided operations provided in the input
// attaches an event handler to the specified element
// form default value while submit causes page to refresh
// hence we have to include preventDefault() so that we get more control over to change
weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const location = locationValue.value; 

    console.log(location);

    const url = 'http://localhost:3000/weather?address=' + location;

    // then() function is a part of promises
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error);
                messageOne.textContent = data.error
                messageTwo.textContent =null;
            } 
            else {
            console.log(data.location);
            console.log(data.forecast);
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            }
        })
    })
})

