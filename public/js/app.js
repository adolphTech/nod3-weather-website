
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const messageZero = document.querySelector("#message-0")

// messageOne.textContent =""
weatherForm.addEventListener("submit",(e)=>{
   
    messageOne.textContent="Loading data........"
e.preventDefault();
const location =search.value
const url = `http://localhost:3000/weather?address=${location}`;
messageZero.textContent= location;
async function address (){
try{const response = await axios.get(url)
const description =response.data.description;
const temperature= response.data.temperature;


messageOne.textContent=description;
messageTwo.textContent=temperature;
}

catch(error){
    if(error){
    console.log("Cannot load data")
    }
}

}

address();
})