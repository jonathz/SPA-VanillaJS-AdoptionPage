import {getRandom } from './petNames.js' 

function getPersonality(){
    let chacteristic = {}
     chacteristic.attributeNo1 = personality[Math.floor(getRandom(0,9.9))]
     chacteristic.attributeNo2 = personality[Math.floor(getRandom(0,9.9))]
     chacteristic.attributeNo3 = personality[Math.floor(getRandom(0,9.9))]
     chacteristic.location = locationList[Math.floor(getRandom(0,70.9))].Location
    if (chacteristic.attributeNo1==chacteristic.attributeNo2 ||chacteristic.attributeNo1==chacteristic.attributeNo3
        ||chacteristic.attributeNo2==chacteristic.attributeNo3 ){
            return getPersonality()
    }else{
        let qualities = []
        qualities.push(chacteristic.attributeNo1, chacteristic.attributeNo2,chacteristic.attributeNo3,chacteristic.location)
        
        return qualities
    }
}

let personality = [{attribute: "Amigable",image: "../images/personality/amigable.svg"},
{attribute: "Cariñoso",image: "https://svgshare.com/i/Wzm.svg"},
{attribute: "Cobarde",image: "https://svgshare.com/i/Wz5.svg"},
{attribute: "Gloton",image: "https://svgshare.com/i/X07.svg"},
{attribute: "Guardian",image: "https://svgshare.com/i/Wzd.svg"},
{attribute: "Inquieto",image: "https://svgshare.com/i/Wyt.svg"},
{attribute: "Jugueton",image: "https://svgshare.com/i/Wzn.svg"},
{attribute: "Nocturno",image: "https://svgshare.com/i/Wyk.svg"},
{attribute: "Tierno",image: "https://svgshare.com/i/Wzo.svg"},
{attribute: "Dormilon",image: "https://imagizer.imageshack.com/img922/949/xcqTtV.jpg"}]

let locationList = [
        {
            "Location": "Bogotá"
        },
        {
            "Location": "Medellín"
        },
        {
            "Location": "Cali"
        },
        {
            "Location": "Barranquilla"
        },
        {
            "Location": "Cartagena"
        },
        {
            "Location": "Cúcuta"
        },
        {
            "Location": "Soacha"
        },
        {
            "Location": "Soledad"
        },
        {
            "Location": "Bucaramanga"
        },
        {
            "Location": "Bello"
        },
        {
            "Location": "Villavicencio"
        },
        {
            "Location": "Ibagué"
        },
        {
            "Location": "Santa Marta"
        },
        {
            "Location": "Valledupar"
        },
        {
            "Location": "Montería"
        },
        {
            "Location": "Pereira"
        },
        {
            "Location": "Manizales"
        },
        {
            "Location": "Pasto"
        },
        {
            "Location": "Neiva"
        },
        {
            "Location": "Palmira"
        },
        {
            "Location": "Popayán "
        },
        {
            "Location": "Buenaventura"
        },
        {
            "Location": "Floridablanca"
        },
        {
            "Location": "Armenia"
        },
        {
            "Location": "Sincelejo"
        },
        {
            "Location": "Itagüí"
        },
        {
            "Location": "Tumaco"
        },
        {
            "Location": "Envigado"
        },
        {
            "Location": "Dosquebradas"
        },
        {
            "Location": "Tuluá"
        },
        {
            "Location": "Barrancabermeja"
        },
        {
            "Location": "Riohacha"
        },
        {
            "Location": "Uribia"
        },
        {
            "Location": "Maicao"
        },
        {
            "Location": "Piedecuesta"
        },
        {
            "Location": "Tunja"
        },
        {
            "Location": "Yopal"
        },
        {
            "Location": "Florencia"
        },
        {
            "Location": "Girón"
        },
        {
            "Location": "Jamundí"
        },
        {
            "Location": "Facatativá"
        },
        {
            "Location": "Fusagasugá"
        },
        {
            "Location": "Mosquera"
        },
        {
            "Location": "Chía"
        },
        {
            "Location": "Zipaquirá"
        },
        {
            "Location": "Rionegro"
        },
        {
            "Location": "Magangué"
        },
        {
            "Location": "Malambo"
        },
        {
            "Location": "Cartago"
        },
        {
            "Location": "Sogamoso"
        },
        {
            "Location": "Quibdó"
        },
        {
            "Location": "Turbo"
        },
        {
            "Location": "Ocaña"
        },
        {
            "Location": "Buga"
        },
        {
            "Location": "Pitalito"
        },
        {
            "Location": "Apartadó"
        },
        {
            "Location": "Madrid"
        },
        {
            "Location": "Duitama"
        },
        {
            "Location": "Ciénaga"
        },
        {
            "Location": "Aguachica"
        },
        {
            "Location": "Ipiales"
        },
        {
            "Location": "Lorica"
        },
        {
            "Location": "Turbaco"
        },
        {
            "Location": "Santander de Quilichao"
        },
        {
            "Location": "Villa del Rosario"
        },
        {
            "Location": "Sahagún"
        },
        {
            "Location": "Yumbo"
        },
        {
            "Location": "Girardot"
        },
        {
            "Location": "Cereté"
        },
        {
            "Location": "Funza"
        },
        {
            "Location": "Sabanalarga"
        }
    ]
    
    export default getPersonality
