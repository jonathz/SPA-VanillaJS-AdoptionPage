class User{
    constructor(){
        this.favoritelist = []
    }
    
    addPet(infoPet){
        this.favoritelist.push(infoPet)
        console.log(this.favoritelist)

    }
    
    deletePet(){
        this.list.pop()
        console.log(this.list)
    }
    
}
import { maleName , femaleName, getRandom } from './petNames.js' // banco de nombres
import getPersonality from './personalityLocation.js'
const CAT_API = './catsAPI.json' //razas y fotos (corregida)
const DOG_API = 'https://api.thedogapi.com/v1/breeds?attach_breed=0' //razas y fotos
const PEOPLE_API = 'https://randomuser.me/api/?page=3&results=20&seed=abc'
let catOffer = []
let dogOffer = []
let users = []
let petFav
let guest = new User
document.querySelector('#btnDog').style.opacity = 1
document.querySelectorAll('#showFav')[0].addEventListener('click', showFavPetList)
document.querySelectorAll('#showFav')[1].addEventListener('click', showFavPetList)
function getAPI(url){
    return new Promise ((resolve,reject)=> {
        fetch(`${url}`)
        .then(data=> data.json())
        .then(data=>resolve(data))
        .catch (err=>reject(err))
    })
}
getAPI(PEOPLE_API)
 .then(data => {
    for (let i = 0; i<20;i++){
        users.push( {nameOwner: data.results[i].name.first + " " + data.results[i].name.last, 
        selfieOwner: data.results[i].picture.large })
    }
    
})
document.querySelector('#btnCat').style.opacity = 0.5
getAPI(CAT_API) //lista de gatos
    .then(data => {
        
        let age = ()=> Math.floor(getRandom(5 , 11))
        let name
        let gender
        for (let i = 0; i < 20; i++){
            let characteristic = getPersonality()
            let randomBreed = Math.floor(getRandom(0,67))//raza random

            if (getRandom(0 , 1) > 0.5){ //macho o hembra?
                name = femaleName[Math.floor(getRandom(0,100))]
                gender = 'female'
                catOffer.push({petType:'cat', name,gender,genderIcon:'../images/female.svg',breed:data[randomBreed].name, age: age(), 
                    image:data[randomBreed].image.url,characteristic,description:data[randomBreed].description,favorite:0 })
            }else{
                name = maleName[Math.floor(getRandom(0,100))]
                gender = 'male'
                catOffer.push({petType:'cat',name,gender, genderIcon:'../images/male.svg', breed:data[randomBreed].name, age: age(), 
                image:data[randomBreed].image.url,characteristic, description:data[randomBreed].description,favorite:0  })
            }
             
        }
        // console.log(data)
        // console.log(catOffer)
        document.querySelector('#btnCat').addEventListener('click', button)
    }) 
    
getAPI(DOG_API) // lista de perros
.then(data => {
    let age = ()=> Math.floor(getRandom(5 , 11))
    let name
    let gender
    console.log(data)
    for (let i= 0; i < 20; i++){
        let characteristic = getPersonality()
        let randomBreed = Math.floor(getRandom(0,172))
        let description = `Medidas: ${data[randomBreed].height.metric} <br>
                       Promedio de vida: ${data[randomBreed].life_span} <br>
                       Temperamento: ${data[randomBreed].temperament} `
                       
        if (getRandom(0 , 1) > 0.5){ //macho o hembra?
            name = femaleName[Math.floor(getRandom(0,100))]
            gender = 'female'
            dogOffer.push({petType:'dog',name,gender, genderIcon:'../images/female.svg', breed:data[randomBreed].name, age: age(),
                 image:data[randomBreed].image.url,characteristic,description,favorite:0 })
        }else{
            name = maleName[Math.floor(getRandom(0,100))]
            gender = 'male'
            dogOffer.push({petType:'dog',name,gender, genderIcon:'../images/male.svg', breed:data[randomBreed].name, age: age(),
            image:data[randomBreed].image.url,characteristic,description,favorite:0 })
        }
        
        
    }
    
    // console.log(data)
    // console.log(dogOffer)
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
        eleccion.addEventListener ('click',details)
    } 
}
function details(){
    document.querySelector('#favoritesWindow').style.display = 'none'
    document.querySelector('#heart').addEventListener ('click',toFavorites)
    let animalSelected
    let animalNumber = this.getAttribute('index')
    if (document.querySelector('#btnDog').style.opacity == 1){
        animalSelected = dogOffer
    }else{
        animalSelected = catOffer
    }
    if(animalSelected[animalNumber].favorite == 1){
        document.querySelector('#heart').classList.add('bg-red-400')
        document.querySelector('#btnHeart').classList.add('animate-beat')
    }else{
        document.querySelector('#heart').classList.remove('bg-red-400')
        document.querySelector('#btnHeart').classList.remove('animate-beat')
    }
    document.querySelector('#mainScreen').style.display = 'none'
    document.querySelector('#petDetails').style.display = 'flex'
    document.querySelector('#photoWide').innerHTML =
     `<img id="bigPhoto" class="w-screen  lg:w-108" src="${animalSelected[animalNumber].image}">`
    document.querySelector('#back').addEventListener ('click', closeDetails)
    document.querySelector('#petName').innerHTML = animalSelected[animalNumber].name + " &nbsp;"
    document.querySelector('#petName').insertAdjacentHTML('beforeend',
    `<img class="" src="${animalSelected[animalNumber].genderIcon}">`)
    document.querySelector('#breedType').innerHTML = animalSelected[animalNumber].breed
    document.querySelector('#ageNumber').innerHTML = animalSelected[animalNumber].age + " meses"
    document.querySelector('#locationId').innerHTML = animalSelected[animalNumber].characteristic[3]
    for (let i=0; i<3; i++){
    document.querySelector('#petSpecs').insertAdjacentHTML('beforeend',`
    <div class="flex flex-col m-3.5 items-center justify-center h-20 w-20 border-opacity-85 border-2 border-secondary rounded-lg">
    
        <div class="w-11 h-11 object-fill " >
            <img src="${animalSelected[animalNumber].characteristic[i].image}">
        </div>
       <p class="text-gray-600"> ${animalSelected[animalNumber].characteristic[i].attribute} </p>
    </div>`)
    }
    document.querySelector('#petTitleBio').innerHTML =`Historia de ${animalSelected[animalNumber].name} <br>`
    document.querySelector('#bioBox').innerHTML =`${animalSelected[animalNumber].description}`
    document.querySelector('#photoAutor').innerHTML = `<img src=${users[animalNumber].selfieOwner}></img>`
    document.querySelector('#ownerName').innerHTML = `${users[animalNumber].nameOwner}`
    petFav = {...animalSelected[animalNumber], ...users[animalNumber] }
             }
            function closeDetails(){
                
                document.querySelector('#mainScreen').style.display = 'flex'
                document.querySelector('#petDetails').style.display = 'none'
                document.querySelector('#photoWide').innerHTML = ''
                document.querySelector('#petSpecs').innerHTML = ''
                
            }
            function toFavorites(){ // ejemplo clousure
                // if (animalSelected[animalNumber].favorite == 1) {
                //     document.querySelector('#heart').classList.remove('bg-red-400')
                //     document.querySelector('#btnHeart').classList.remove('animate-beat')
                //     animalSelected[animalNumber].favorite = 0                    
                // }else{
                    document.querySelector('#heart').classList.add('bg-red-400')
                    document.querySelector('#btnHeart').classList.add('animate-beat')
                //     animalSelected[animalNumber].favorite = 1
                // }
                //  console.log()
                guest.addPet(petFav)
            }
            
            
            function showFavPetList(){
                console.log(guest.favoritelist)
                console.log()
                document.getElementById('petBankFav').innerHTML = ""
                document.querySelector('#mainScreen').style.display = 'none'
                document.querySelector('#petDetails').style.display = 'none'
                document.querySelector('#favoritesWindow').style.display = 'flex'
                if(guest.favoritelist.length==1){
                    document.getElementById('petBankFav').innerHTML = ""
                    let i =0
                    document.getElementById('petBankFav').innerHTML = `<div id="pet" index="${i}" class="flex 
                    cursor-pointer flex-col shadow-inner justify-end w-40 h-64 bg-center bg-scroll bg-cover 
                    bg-no-repeat rounded-2xl lg:mr-5" style="background-image:url(${guest.favoritelist[i].image})">
                    <span class="text-white m-2"><p class="font-bold">${guest.favoritelist[i].name}</p>
                    <p class="text-white text-opacity-80">${guest.favoritelist[i].breed}</p></span>         
                    </div>`
                }
                
                for (let i =0;i<guest.favoritelist.length-1;i++){
                    console.log(i)
                    document.getElementById('petBankFav').insertAdjacentHTML ('beforeend',`<div id="pet" index="${i}" class="flex 
                    cursor-pointer flex-col shadow-inner justify-end w-40 h-64 bg-center bg-scroll bg-cover 
                    bg-no-repeat rounded-2xl lg:mr-5" style="background-image:url(${guest.favoritelist[i].image})">
                    <span class="text-white m-2"><p class="font-bold">${guest.favoritelist[i].name}</p>
                    <p class="text-white text-opacity-80">${guest.favoritelist[i].breed}</p></span>         
                    </div>`)
                    // <div id="pet" index="${i+1}" class="flex cursor-pointer flex-col shadow-inner justify-end w-40 h-64 mt-6 bg-center bg-scroll 
                    // bg-cover  bg-no-repeat rounded-2xl lg:mr-5" style="background-image:url(${guest.favoritelist[i+1].image})">
                    // <span class="text-white m-2"><p class="font-bold">${guest.favoritelist[i+1].name}</p>
                    // <p class="text-white text-opacity-80">${guest.favoritelist[i+1].breed}</p></span>         
                    // </div>)
                } 
                for (let eleccion of document.querySelectorAll('#pet')) {
                    eleccion.addEventListener ('click',detailsFromFavorites)
                }
                
                


                
}

function detailsFromFavorites(){
    document.querySelector('#favoritesWindow').style.display = 'none'
    document.querySelector('#heart').addEventListener ('click',toFavorites)
    let animalSelected
    let animalNumber = this.getAttribute('index')
    if (document.querySelector('#btnDog').style.opacity == 1){
        animalSelected = dogOffer
    }else{
        animalSelected = catOffer
    }
    if(animalSelected[animalNumber].favorite == 1){
        document.querySelector('#heart').classList.add('bg-red-400')
        document.querySelector('#btnHeart').classList.add('animate-beat')
    }else{
        document.querySelector('#heart').classList.remove('bg-red-400')
        document.querySelector('#btnHeart').classList.remove('animate-beat')
    }
    document.querySelector('#mainScreen').style.display = 'none'
    document.querySelector('#petDetails').style.display = 'flex'
    document.querySelector('#photoWide').innerHTML =
     `<img id="bigPhoto" class="w-screen  lg:w-108" src="${guest.favoritelist[animalNumber].image}">`
    document.querySelector('#back').addEventListener ('click', closeDetails)
    document.querySelector('#petName').innerHTML = guest.favoritelist[animalNumber].name + " &nbsp;"
    document.querySelector('#petName').insertAdjacentHTML('beforeend',
    `<img class="" src="${guest.favoritelist[animalNumber].genderIcon}">`)
    document.querySelector('#breedType').innerHTML = guest.favoritelist[animalNumber].breed
    document.querySelector('#ageNumber').innerHTML = guest.favoritelist[animalNumber].age + " meses"
    document.querySelector('#locationId').innerHTML = guest.favoritelist[animalNumber].characteristic[3]
    document.querySelector('#petSpecs').innerHTML = ''
    for (let i=0; i<3; i++){
    document.querySelector('#petSpecs').insertAdjacentHTML('beforeend',`
    <div class="flex flex-col m-3.5 items-center justify-center h-20 w-20 border-opacity-85 border-2 border-secondary rounded-lg">
    
        <div class="w-11 h-11 object-fill " >
            <img src="${guest.favoritelist[animalNumber].characteristic[i].image}">
        </div>
       <p class="text-gray-600"> ${guest.favoritelist[animalNumber].characteristic[i].attribute} </p>
    </div>`)
    }
    document.querySelector('#petTitleBio').innerHTML =`Historia de ${guest.favoritelist[animalNumber].name} <br>`
    document.querySelector('#bioBox').innerHTML =`${guest.favoritelist[animalNumber].description}`
    document.querySelector('#photoAutor').innerHTML = `<img src=${users[animalNumber].selfieOwner}></img>`
    document.querySelector('#ownerName').innerHTML = `${users[animalNumber].nameOwner}`
    
}