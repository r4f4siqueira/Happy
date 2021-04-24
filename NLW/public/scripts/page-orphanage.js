//tipos de dados
//String ""
//Number 01
//Object {}
//Boolean true or false
//Array []

const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scroollWheelZoom: false,
    zoomControl: false
}
//get values from html options
const lat = document.querySelector('span[data-lat]').dataset.lat
const lng = document.querySelector('span[data-lng]').dataset.lng

//create map
const map = L.map('mapid', options).setView([lat,lng], 15);
//-22.2348294,-54.8181412
//create and add title layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', ).addTo(map);

//create icon
const icon = L.icon({
    iconUrl:"/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68],
    popupAnchor: [170,2]
})

//create an add marker
L
.marker([lat,lng], {icon})
.addTo(map)


//image galery
function selectImage(event){
    const button = event.currentTarget
    //remover todas as classes active
    const buttons = document.querySelectorAll(".images button")
    buttons.forEach(removeActiveClass)

    function removeActiveClass(button){
        button.classList.remove("active")
    }

    //selecioanr imagem clicada
    const image = button.children[0]
    const imageContainer = document.querySelector(".orphanage-details > img")

    //atualizar o container de imagem
    imageContainer.src = image.src
    //adicionar classe .active para esse botao
    button.classList.add("active")
}