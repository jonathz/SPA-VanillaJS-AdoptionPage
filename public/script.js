class User{
    constructor(){
        this.favoritelist = []
        this.data = {name:'Cuenta',
                    lastName: 'Visitante',
                    email: 'Por favor actualice sus datos',
                    contacts:[]
        } 
    }
    addPet(infoPet){
        let nameToFav = document.querySelector('#nameDetails').innerHTML
        let photoSrc = document.querySelector('#bigPhoto').getAttribute("src")
        if(petType == 'cat'){
            for (let i = 0; i<20;i++){
                if (catOffer[i].name==nameToFav && catOffer[i].image==photoSrc){
                    this.favoritelist.push(catOffer[i])}
            }   
        }else{
            for (let i = 0; i<20;i++){
                if (dogOffer[i].name==nameToFav && dogOffer[i].image==photoSrc){
                    this.favoritelist.push(dogOffer[i])}
        }

    }


    }
    
    deletePet(infoPet){
        let photoSrc = document.querySelector('#bigPhoto').getAttribute("src")
        
        for (let i = 0; i<this.favoritelist.length;i++){
            console.log(this.favoritelist[i].image)
            if (this.favoritelist[i].image==photoSrc){
                
                    this.favoritelist.splice(i,1)
                    document.querySelector('#heart').classList.remove('bg-red-400')
                    document.querySelector('#btnHeart').classList.remove('animate-beat')
                    break
            }
        }
        
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
let petType
let animalNumber
let guest = new User
document.querySelector('#btnDog').style.opacity = 1
document.querySelectorAll('#showFav')[0].addEventListener('click', showFavPetList)
document.querySelectorAll('#showFav')[1].addEventListener('click', showFavPetList)
document.querySelector('#hiddenBack').addEventListener ('click', messagesList)
document.querySelector('#heart').addEventListener ('click', toFavorites)
document.querySelector('#messageImg').addEventListener ('click', messagesList)
document.querySelector('#btnContact').addEventListener ('click', conversationScreen)
document.querySelector('#btnHome').addEventListener('click', ()=>{
    document.querySelector('#titleSection').innerHTML = `Adopta una adorable <br> mascota`
    document.querySelector('#petTypeSelector').style.display = 'block'
    document.querySelector('#petBank').innerHTML = ''
    if (document.querySelector('#btnDog').style.opacity == 1){
        printer(dogOffer)}else{printer(catOffer)}
        
    })
    
    
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
document.querySelector('#back').addEventListener ('click', closeDetails)//flecha
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
                    image:data[randomBreed].image.url,characteristic,description:data[randomBreed].description,favorite:0,indexNo:i })
            }else{
                name = maleName[Math.floor(getRandom(0,100))]
                gender = 'male'
                catOffer.push({petType:'cat',name,gender, genderIcon:'../images/male.svg', breed:data[randomBreed].name, age: age(), 
                image:data[randomBreed].image.url,characteristic, description:data[randomBreed].description,favorite:0,indexNo:i  })
            }
             
        }
        
        document.querySelector('#btnCat').addEventListener('click', button)
    }) 
    
getAPI(DOG_API) // lista de perros
.then(data => {
    let age = ()=> Math.floor(getRandom(5 , 11))
    let name
    let gender
   
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
                 image:data[randomBreed].image.url,characteristic,description,favorite:0,indexNo:i })
        }else{
            name = maleName[Math.floor(getRandom(0,100))]
            gender = 'male'
            dogOffer.push({petType:'dog',name,gender, genderIcon:'../images/male.svg', breed:data[randomBreed].name, age: age(),
            image:data[randomBreed].image.url,characteristic,description,favorite:0,indexNo:i })
        }
        
        
    }
   
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
    for (let i=0; i < groupPet.length;i++ ){
        document.getElementById('petBank').insertAdjacentHTML ('beforeend',`<div id="pet" petkind="${groupPet[i].petType}" index="${i}" class="flex 
        cursor-pointer flex-col shadow-inner justify-end w-40 h-64 bg-center bg-scroll bg-cover 
        bg-no-repeat mr-6 rounded-2xl lg:mr-5" style="background-image:url(${groupPet[i].image})">
        <span class="text-white m-2"><p class="font-bold">${groupPet[i].name}</p>
        <p class="text-white text-opacity-80">${groupPet[i].breed}</p></span>         
        </div>`)
    }
        
    
    for (let i = 0; i < document.querySelectorAll('#pet').length; i++) {
        if (i%2!=0) {document.querySelectorAll('#pet')[i].classList.add('mt-10')}
        document.querySelectorAll('#pet')[i].onclick= details
        }
   
}
function details(){
    petType = this.getAttribute('petkind')
    document.querySelector('#petSpecs').innerHTML = ''
    let animalSelected
        animalNumber = this.getAttribute('index')
    if(guest.favoritelist.length>0){
        animalSelected = guest.favoritelist
        if(petType=='dog'){
            animalSelected = [...dogOffer]
        }else{
            animalSelected = [...catOffer] 
        }
        
        
    }else{
    if (document.querySelector('#btnDog').style.opacity == 1){
        animalSelected = dogOffer
    }else{
        animalSelected = catOffer
    }
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
    document.querySelector('#petName').innerHTML = `<p id="nameDetails">${animalSelected[animalNumber].name}</p>`
    document.querySelector('#petName').insertAdjacentHTML('beforeend',
    `&nbsp; <img class="" src="${animalSelected[animalNumber].genderIcon}">`)
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


}
    
    function toFavorites(){ 
        if(document.querySelector('#btnDog').style.opacity == 1){
            
            if (dogOffer[animalNumber].favorite == 1) {
                
                document.querySelector('#heart').classList.remove('bg-red-400')
                document.querySelector('#btnHeart').classList.remove('animate-beat')
                dogOffer[animalNumber].favorite = 0     
                guest.deletePet(dogOffer[animalNumber])             
            }else{
                
                document.querySelector('#heart').classList.add('bg-red-400')
                document.querySelector('#btnHeart').classList.add('animate-beat')
                dogOffer[animalNumber].favorite = 1            
                petFav = {...dogOffer[animalNumber], ...users[animalNumber] }
                guest.addPet(petFav)
            }
        }else{
        if (document.querySelector('#btnCat').style.opacity == 1) {
            if (catOffer[animalNumber].favorite == 1) {
            document.querySelector('#heart').classList.remove('bg-red-400')
            document.querySelector('#btnHeart').classList.remove('animate-beat')
            catOffer[animalNumber].favorite = 0
            guest.deletePet(catOffer[animalNumber])                                
        }else{             
            document.querySelector('#heart').classList.add('bg-red-400')
            document.querySelector('#btnHeart').classList.add('animate-beat')
            catOffer[animalNumber].favorite = 1
            petFav = {...catOffer[animalNumber], ...users[animalNumber] }
            guest.addPet(petFav)}
        }
    
        }
       
    }





            function closeDetails(){
                document.querySelector('#mainScreen').style.display = 'flex'
                document.querySelector('#petDetails').style.display = 'none'
                document.querySelector('#photoWide').innerHTML = ''
                document.querySelector('#petSpecs').innerHTML = ''
                
            }
            
            
            function showFavPetList(){
                
                document.getElementById('petBank').innerHTML = ""
                document.querySelector('#mainScreen').style.display = 'flex'
                document.querySelector('#petDetails').style.display = 'none'
                document.querySelector('#petTypeSelector').style.display = 'none'
                document.querySelector('#titleSection').innerHTML = 'Mascotas Favoritas'
                // console.log (document.querySelector('#titleSection').innerHTML)
                
                printerFav(guest.favoritelist)
                }
                
function printerFav(groupPet){
     for (let i=0; i < groupPet.length;i++ ){
        document.getElementById('petBank').insertAdjacentHTML ('beforeend',`<div id="pet" petkind="${groupPet[i].petType}" index="${groupPet[i].indexNo}" class="flex 
        cursor-pointer flex-col shadow-inner justify-end w-40 h-64 bg-center bg-scroll bg-cover 
        bg-no-repeat mr-6 rounded-2xl lg:mr-5" style="background-image:url(${groupPet[i].image})">
        <span class="text-white m-2"><p class="font-bold">${groupPet[i].name}</p>
        <p class="text-white text-opacity-80">${groupPet[i].breed}</p></span>         
        </div>`)
        if (i%2!=0) {document.querySelectorAll('#pet')[i].classList.add('mt-10')}
        document.querySelectorAll('#pet')[i].onclick= details
        }
    }
function messagesList(){
    document.querySelector('#navBar').style.display = 'flex'
    document.querySelector('#titleSection').innerHTML = 'Mensajes'
    document.querySelector('#petTypeSelector').style.display = 'none'
    document.querySelector('#messagePlatform').style.display = 'none'
    document.querySelector('#petBank').innerHTML = ''
    document.querySelector('#conversationSpace').childElementCount
    // if
    //imprimir en petbank los contactos
}
function conversationScreen(){

    // document.querySelector('#ownerName').innerHTML CONSEGUIR NOMBRE DE ACA
    // document.querySelector('#photoAutor').innerHTML CONSEGUIR FOTO
    
    let photoContact = document.querySelector('#photoAutor')
    let nameContact = document.querySelector('#ownerName').innerHTML
    let petAbout = document.querySelector('#nameDetails').innerHTML
    document.querySelector('#messagePlatform').style.display = 'flex'
    document.querySelector('#photoMessage').appendChild(photoContact)
    document.querySelector('#nameContact').innerHTML = nameContact
    
    document.querySelector('#photoAutor').style.width = '64px'
    document.querySelector('#photoAutor').style.height = '64px'
    console.log(photoContact)
    document.querySelector('#navBar').style.display = 'none'
    document.querySelector('#hiddenBack').style.display = 'flex'
    document.querySelector('#titleSection').innerHTML = ''
    document.querySelector('#petTypeSelector').style.display = 'none'
    document.querySelector('#petBank').innerHTML = ''
    document.querySelector('#mainScreen').style.display = 'flex'
    document.querySelector('#petDetails').style.display = 'none'
    document.querySelector('#photoWide').innerHTML = ''
    document.querySelector('#petSpecs').innerHTML = ''
    

    // cuando de atras se guarde el nombre y foto 
    // con enter guarda en un arreglo
    
    document.querySelector('#messageSpace').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            console.log(messageSpace.value)
            let conversationLog = []
            let moment = new Date()
            let hour = moment.getHours()
            let minute = moment.getMinutes()
            let hourToPrint =hour + ':' + minute
            //agregar funcion de hora
            conversationLog.push('Yo'+hourToPrint +'/'+ messageSpace.value)

            document.querySelector('#conversationSpace').insertAdjacentHTML('beforeend',
            `<div class="w-full flex justify-end">   
                    <div class="flex flex-col w-72 mr-6" >
                    <span class="font-semibold mt-10 text-center">${hourToPrint}</span>
                    <span class="flex flex-col bg-white ml-6 p-4 rounded-2xl border
                    border-black ">${messageSpace.value}</span>
                </div>
             </div>`)
             document.querySelector('#typing').innerHTML = `${nameContact} esta escribiendo...`
             document.querySelector('#typing').style.display= 'block'
            setTimeout(()=>{
                document.querySelector('#typing').style.display= 'none'
                document.querySelector('#conversationSpace').insertAdjacentHTML('beforeend',
                `<div class="flex flex-col w-72" >
                    <span class="font-semibold mt-10 text-center">${hourToPrint}</span>
                    <span class="flex flex-col items-center bg-messageBubble text-white ml-6 p-4 rounded-2xl border
                     border-black ">'¡Hola! claro, podemos acordar un lugar y hora para que conoscas a ${petAbout}'</span>
                </div>`)
            }, 3000)
            

            // let contact = {name:document.querySelector('#ownerName').innerHTML,
            //                photoContact, sendedMessages:}
            // guest.data.contacts[hacer push]{nameContact: innerhtml,foto:src contact,mensajes[]}
            // document.querySelector('#conversation').insertAdjacentElement
        }
    });

}
  