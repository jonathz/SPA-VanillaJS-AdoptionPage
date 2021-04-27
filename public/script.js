import { maleName , femaleName, getRandom } from './petNames.js' // banco de nombres
import getPersonality from './personalityLocation.js'
const CAT_API = './catsAPI.json' //razas y fotos (corregida)
const DOG_API = 'https://api.thedogapi.com/v1/breeds?attach_breed=0' //razas y fotos
var catOffer = []
let dogOffer = []

async function getAPI(url){
    return new Promise ((resolve,reject)=> {
        fetch(`${url}`)
        .then(data=> data.json())
        .then(data=>resolve(data))
        .catch (err=>reject(err))
    })
}

document.querySelector('#btnCat').style.opacity = 0.5
getAPI(CAT_API) //lista de gatos
    .then(data => {
        let start = Math.floor(getRandom(0 , 47)) 
        let end = start + 20
        let edad = ()=> Math.floor(getRandom(5 , 11))
        let name
        let gender
        for (start; start < end; start++){
            if (getRandom(0 , 1) > 0.5){ //macho o hembra?
                name = femaleName[Math.floor(getRandom(0,100))]
                gender = 'female'
                catOffer.push({name,gender,breed:data[start].name, edad: edad(), image:data[start].image.url,characteristic: getPersonality() })
            }else{
                name = maleName[Math.floor(getRandom(0,100))]
                gender = 'male'
                catOffer.push({name,gender,breed:data[start].name, edad: edad(), image:data[start].image.url,characteristic: getPersonality() })
            }
             
        }
        console.log(data)
        document.querySelector('#btnCat').addEventListener('click', button)
    })
getAPI(DOG_API) // lista de perros
.then(data => { 
    let start = Math.floor(getRandom(0 , 152)) 
    let end = start + 20
    let edad = ()=> Math.floor(getRandom(5 , 11))
    let name
    let gender
    for (start; start < end; start++){
        if (getRandom(0 , 1) > 0.5){ //macho o hembra?
            name = femaleName[Math.floor(getRandom(0,100))]
            gender = 'female'
            dogOffer.push({name,gender,breed:data[start].name, edad: edad(), image:data[start].image.url,characteristic: getPersonality() })
        }else{
            name = maleName[Math.floor(getRandom(0,100))]
            gender = 'male'
            dogOffer.push({name,gender,breed:data[start].name, edad: edad(), image:data[start].image.url,characteristic: getPersonality() })
        }
    }
    console.log(data)
    document.querySelector('#btnDog').addEventListener('click', button)
    printer(dogOffer)
})

function button(){
    if (this.getAttribute('id')=='btnDog' ){
        document.querySelector('#petBank').innerHTML = ''
        document.querySelector('#btnDog').style.opacity = 1
        document.querySelector('#btnCat').style.opacity = 0.5
        printer(dogOffer)     

    }else {
        document.querySelector('#petBank').innerHTML = ''
        document.querySelector('#btnCat').style.opacity = 1
        document.querySelector('#btnDog').style.opacity = 0.5
        printer(catOffer)
    }      
}

function printer(groupPet){
    for (let i=0; i < 20;i+=2 ){
        document.getElementById('petBank').insertAdjacentHTML ('beforeend',`<div id="pet" index="${i}" class="flex 
        cursor-pointer flex-col shadow-inner justify-end w-40 h-64 bg-center bg-scroll bg-cover 
        bg-no-repeat rounded-2xl lg:mr-5" style="background-image:url(${groupPet[i].image})">
        <span class="text-white m-2"><p class="font-bold">${groupPet[i].name}</p>
        <p class="text-white text-opacity-80">${groupPet[i].breed}</p></span>         
        </div>
        <div id="pet" index="${i+1}" class="flex cursor-pointer flex-col shadow-inner justify-end w-40 h-64 mt-6 bg-center bg-scroll 
        bg-cover  bg-no-repeat rounded-2xl lg:mr-5" style="background-image:url(${groupPet[i+1].image})">
        <span class="text-white m-2"><p class="font-bold">${groupPet[i+1].name}</p>
        <p class="text-white text-opacity-80">${groupPet[i+1].breed}</p></span>         
        </div>`)
    }
    for (let eleccion of document.querySelectorAll('#pet')) {
        eleccion.addEventListener ('click',detalles)
    } 
}
function detalles(){
    console.log(this)
}
