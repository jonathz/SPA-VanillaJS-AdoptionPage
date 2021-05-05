class User{
    constructor(){
        this.favoritelist = []
        this.contactList = []
        this.data = {name:'Juan',
                    lastName: 'Méndez',
                    email: 'juan.mendez@gmail.com',
                    contacts:[]
        }              
    }
    addPet(){
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
    addContact(){
        let photoSrc = document.querySelector('#photoAutor').children[0].src
            for (let i = 0; i<20;i++){
                if (users[i].favorite == 1){
                    break
                }

                if (users[i].selfieOwner==photoSrc){
                    users[i].favorite = 1
                    this.contactList.push(users[i])}
                    
            }   
        }
    deletePet(){
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
let conversationLog = []
let contactInfo = {}
let animalNumber
let guest = new User
document.querySelector('#btnDog').style.opacity = 1
document.querySelectorAll('#showFav')[0].addEventListener('click', showFavPetList)
document.querySelectorAll('#showFav')[1].addEventListener('click', showFavPetList)
document.querySelector('#hiddenBack').addEventListener ('click', conversationComp)
document.querySelector('#heart').addEventListener ('click', toFavorites)
document.querySelector('#messageImg').addEventListener ('click', messagesList)
document.querySelectorAll('#showProfile')[0].addEventListener('click', profile)
document.querySelectorAll('#showProfile')[1].addEventListener('click', profile)
document.querySelector('#btnContact').addEventListener ('click', conversationScreen)
document.querySelector('#btnHome').addEventListener('click', goHome)

     
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
        selfieOwner: data.results[i].picture.large, favorite: 0 })
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
document.querySelector('#nextStart').addEventListener('click' , nextStart)

function nextStart(){
    document.querySelector('#imgStart').src = '../images/start 2.png'
    document.querySelector('#startEnd').style.display = 'block'
    document.querySelector('#nextStart').addEventListener('click' , startEnd) 
}
function startEnd(){
    document.querySelector('#startPop').style.display = 'none'
    document.querySelector('#petTypeSelector').style.display = 'block'
}

function goHome(){
        document.querySelector('#btnHome').src = 'https://svgur.com/s/WzP'
        document.querySelector('#messageImg').src = '../images/Component 1.svg'
        document.querySelector('#showFav').src = 'https://svgshare.com/i/Wz_.svg'
        document.querySelector('#showProfile').src = '../images/Component 3.svg'

        document.querySelector('#titleSection').innerHTML = `Adopta una adorable <br> mascota`
        document.querySelector('#petTypeSelector').style.display = 'block'
        document.querySelector('#petBank').innerHTML = ''
        if (document.querySelector('#btnDog').style.opacity == 1){
            printer(dogOffer)}else{printer(catOffer)}
        
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
    // document.querySelector('#profileInputs').style.display = 'null'
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
    document.querySelector('#btnHomeD').addEventListener('click', closeDetails)
    document.querySelector('#messageImgD').addEventListener('click', messagesList)
    document.querySelector('#showProfile').addEventListener('click', closeDetails)
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
                document.querySelector('#showFav').src = 'https://svgshare.com/i/Wys.svg'
                document.querySelector('#btnHome').src = 'https://svgshare.com/i/WyN.svg'
                document.querySelector('#messageImg').src = 'https://svgshare.com/i/WwR.svg'
                document.querySelector('#showProfile').src = 'https://svgshare.com/i/WyM.svg'

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
    document.querySelector('#messageImg').src = 'https://svgshare.com/s/WyP'
    document.querySelector('#btnHome').src = 'https://svgshare.com/i/WyN.svg'
    document.querySelector('#showFav').src = 'https://svgshare.com/i/Wz_.svg'
    document.querySelector('#showProfile').src = 'https://svgshare.com/i/WyM.svg'
    document.querySelector('#mainScreen').style.display = 'flex'
    document.querySelector('#petDetails').style.display = 'none'
    document.querySelector('#photoWide').innerHTML = ''
    document.querySelector('#petSpecs').innerHTML = ''
    document.querySelector('#hiddenBack').style.display = 'none'
    document.querySelector('#petBank').innerHTML = '  '
    document.querySelector('#navBar').style.display = 'flex'
    document.querySelector('#titleSection').innerHTML = 'Mensajes'
    document.querySelector('#petTypeSelector').style.display = 'none'
    document.querySelector('#messagePlatform').style.display = 'none'


    //oculta cosas
    for (let i = 0; i< guest.contactList.length; i++){
    let messageToShow = guest.contactList.contact.conversation[contact.conversation.length - 1]  
    document.querySelector('#petBank').insertAdjacentHTML('beforeend',`
            <div class="w-80 h-20">
                <div id="contactAdded"><img src="${guest.contactList[i].contact.photo}"></div>
                <div> <div><span>${guest.contactList.contact.contactName}</span><p>${contact.lastMessageTime}</p></div> <div>${contact.conversation[contact.conversation.length - 1]}</div> </div>
                <div>flecha</div>
            </div>`)
        }
    for (let i = 0; i < document.querySelectorAll('#contactAdded').length; i++) {
            document.querySelectorAll('#contactAdded')[i].onclick = conversationScreen
        }
}
function conversationScreen(){  //
    
    document.querySelector('#mainScreen').style.display = 'flex'
    console.log(document.querySelector('#photoAutor').innerHTML);  
    let photoContact = document.querySelector('#photoAutor')
    let nameContact = document.querySelector('#ownerName').innerHTML
    document.querySelector('#messagePlatform').style.display = 'flex'
    document.querySelector('#photoMessage').appendChild(photoContact)
    document.querySelector('#nameContact').innerHTML = nameContact
    document.querySelector('#photoAutor').style.width = '64px'
    document.querySelector('#photoAutor').style.height = '64px'
    document.querySelector('#navBar').style.display = 'none'
    document.querySelector('#hiddenBack').style.display = 'flex'
    document.querySelector('#titleSection').innerHTML = ''
    document.querySelector('#petTypeSelector').style.display = 'none'
    document.querySelector('#petBank').innerHTML = ''
    document.querySelector('#petDetails').style.display = 'none'
    document.querySelector('#photoWide').innerHTML = ''
    document.querySelector('#petSpecs').innerHTML = ''
   //oculta cosas y crea interfaz
}
    document.querySelector('#messageSpace').addEventListener('keypress', function (e) {
       if (e.key === 'Enter') {
           
            guest.addContact()
            //hora
            let moment = new Date()
            let hour = moment.getHours()
            let minute = moment.getMinutes()
            let hourToPrint = hour + ':' + minute
            
            //Burbuja blanca
            conversationLog.push(hourToPrint +'/'+ messageSpace.value)
            document.querySelector('#conversationSpace').insertAdjacentHTML('beforeend',
            `<div class="w-full flex justify-end">   
                    <div class="flex flex-col w-72 mr-6" >
                    <span class="font-semibold mt-10 text-center">${hourToPrint}</span>
                    <span class="flex flex-col bg-white ml-6 p-4 rounded-2xl border
                    border-black ">${messageSpace.value}</span>
                </div>
             </div>`)
             //Animacion y reseteo
             document.querySelector('#messageSpace').value = ''
             document.querySelector('#typing').innerHTML = `${document.querySelector('#ownerName').innerHTML} esta escribiendo...`
             document.querySelector('#typing').style.display= 'block'
            setTimeout(()=>{
                document.querySelector('#typing').style.display= 'none'

                let petAbout = document.querySelector('#nameDetails').innerHTML
                if (document.querySelector('#conversationSpace').childElementCount >2) {
                    let messageToReceive = 'ok :)'// segunda respuesta gris
                    document.querySelector('#conversationSpace').insertAdjacentHTML('beforeend',
                    `<div class="flex flex-col w-72" >
                        <span class="font-semibold mt-10 text-center">${hourToPrint}</span>
                        <span class="flex flex-col items-center bg-messageBubble text-white ml-6 p-4 rounded-2xl border
                         border-black "> ${messageToReceive} </span>
                    </div>`)

                    conversationLog.push(hourToPrint + '/' + messageToReceive )
                    
                }else{
                    let messageToReceive = `¡Hola! claro, podemos acordar un lugar y hora para que conoscas a ${petAbout}`
                    document.querySelector('#conversationSpace').insertAdjacentHTML('beforeend',
                    `<div class="flex flex-col w-72" >
                        <span class="font-semibold mt-10 text-center">${hourToPrint}</span>
                        <span class="flex flex-col items-center bg-messageBubble text-white ml-6 p-4 rounded-2xl border
                         border-black "> ${messageToReceive} </span>
                    </div>`) //primer mensaje gris
                    conversationLog.push(hourToPrint + '/' + messageToReceive )
                    
                }
            }, 3000)

            
           
           
        }
    })
    
function conversationComp(){
    console.log (guest.contactList)
    let innerH = document.querySelector('#conversationSpace')
    let historyContact = [...conversationLog]
    let lastMessageTime = historyContact[historyContact.length-1]
    lastMessageTime = lastMessageTime.split("/",1)[0]
    let lastMessage = historyContact[historyContact.length-1]
    lastMessage = lastMessage.split("/").pop()
    console.log(lastMessage);
    innerH
    guest.contactList[guest.contactList.length-1].conv = historyContact
    guest.contactList[guest.contactList.length-1].time = lastMessageTime
    guest.contactList[guest.contactList.length-1].lastM = lastMessage
    // lastMessageTime = lastMessageTime.split(" ")
    console.log(lastMessageTime);
    document.querySelector('#hiddenBack').style.display = 'none'
    document.querySelector('#petBank').innerHTML = '  '
    document.querySelector('#navBar').style.display = 'flex'
    document.querySelector('#titleSection').innerHTML = 'Mensajes'
    document.querySelector('#petTypeSelector').style.display = 'none'
    document.querySelector('#messagePlatform').style.display = 'none'
    //oculta cosas
    for (let i = 0; i<= guest.contactList.length -1; i++){

    document.querySelector('#petBank').insertAdjacentHTML('beforeend',`
            <div id="contactAdded" class="w-80 h-40 bg-white p-2 m-4 flex items-center rounded-3xl" >
                <div class="">
                <div class="w-16 h-16 border-4 rounded-full border-homeColor overflow-hidden"">
                <img src="${guest.contactList[i].selfieOwner}"></div></div>
                <div class="w-48 p-1"> <div class="flex justify-between">
                <span class="font-bold">
                ${guest.contactList[i].nameOwner}</span>
                <p text-gray-600>${guest.contactList[i].time}</p></div> 
                <p text-gray-600>${guest.contactList[i].lastM}</p> </div>
                <div h-full ><img src="../images/arrow.svg"></div>
            </div>`)
        }
    for (let i = 0; i < document.querySelectorAll('#contactAdded').length; i++) {
            document.querySelectorAll('#contactAdded')[i].onclick = conversationScreen
        }
}


function profile(){
    document.querySelector('#showProfile').src = 'https://svgshare.com/i/WyZ.svg'
    document.querySelector('#btnHome').src = 'https://svgshare.com/i/WyN.svg'
    document.querySelector('#messageImg').src = 'https://svgshare.com/i/WwR.svg'
    document.querySelector('#showFav').src = 'https://svgshare.com/i/Wz_.svg'


    document.querySelector('#titleSection').innerHTML = 'Perfil'
    document.querySelector('#petDetails').style.display = 'none'
    document.querySelector('#mainScreen').style.display = 'flex'
    document.querySelector('#petBank').innerHTML = ' '
    document.querySelector('#navBar').style.display = 'flex'
    document.querySelector('#petTypeSelector').style.display = 'none'
    document.querySelector('#messagePlatform').style.display = 'none'
    
    document.querySelector('#petBank').insertAdjacentHTML ('beforeend',
     `
    <div class="flex flex-col w-80" id="profileInputs">
    <div class="flex justify-center mb-5">
         <div >
                <div class="flex justify-center mb-2">
                <img class="w-20 h-20" src="../images/juanPerez.png">
                </div>
                <div class="font-semibold">
                Juan Méndez
                </div>
                <div class="font-semibold">
                Editar Cuenta
                </div>
        </div>
    </div>
    <span class="ml-4 font-semibold">Nombre</span>
    <input id="nameInput" type="text" class="mb-6 p-3 border-solid border border-black rounded-md" name="nameProfile" value="${guest.data.name}" id="nameProfile">
    <span class="ml-4 font-semibold">Apellido</span>
    <input id="lnameInput" type="text" class="mb-6 p-3 border-solid border border-black rounded-md" name="lnameProfile" value="${guest.data.lastName}" id="lnameProfile">
    <span class="ml-4 font-semibold">Correo</span>
    <input id="emailInput" type="text" class="mb-6 p-3 border-solid border border-black rounded-md" name="emailProfile" value="${guest.data.email}" id="emailProfile">
    <div id="btnSave" class="cursor-pointer m-2 p-2 text-center bg-selector text-white rounded-3xl">Guardar</div>
    </div>
   `
    )
    document.querySelector('#btnSave').addEventListener ('click', getProfileData)
    function getProfileData(){
     guest.data.name = document.querySelector("#nameInput").value
     guest.data.lastName = document.querySelector("#lnameInput").value
     guest.data.email = document.querySelector("#emailInput").value
     alert ("Su perfil ha sido actualizado")
    }
}
