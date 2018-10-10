/*import is from is;
import GreenSock from gsap;
import Chart from Chart.js;
*/

init();

const data = FooBar.getData();
const newData = JSON.parse(data);

function init() {
    setInterval(updateBartender, 5000);
    setInterval(updateStorageRoom, 300);
    setInterval(updateOrders, 300);
    setInterval(updateKegs, 300);
    setInterval(updateQueue, 300);
    document.addEventListener("click", closeDropDownOnClick);
    document.querySelector(".login-button").addEventListener("click", doDropDown);
}

function updateBartender() {
    let data = JSON.parse(FooBar.getData());
    handleBartender(data.bartenders);
}

function updateQueue() {
    let data = JSON.parse(FooBar.getData());
    handleQueue(data.queue);
}

function updateStorageRoom() {
    let data = JSON.parse(FooBar.getData());
    handleStorageRoom(data.storage);
}

function updateKegs() {
    let data = JSON.parse(FooBar.getData());
    handleKegs(data.taps);
}


function updateOrders() {
    let data = JSON.parse(FooBar.getData());
    handleOrders(data.queue);
}

function handleBartender(bartender) {
    const bartenderName = document.querySelector("#welcome-bartender-name");
    bartenderName.textContent = bartender[0].name;
}

function handleStorageRoom(beerType) {
    const storageContainer = document.querySelector("#storage-room-section");
    const storageTemplate = document.querySelector("#storage-room-template").content;
    let firstTypeOfBeer = document.querySelector(".beer-name-storage");
    if (firstTypeOfBeer == null) {
        for (let count = 0; count < beerType.length; count++) {
            let clone = storageTemplate.cloneNode(true);
            clone.querySelector(".beer-name-storage").textContent = beerType[count].name;
            let amountOfKegs = beerType[count].amount;
            while (amountOfKegs > 0) {
                let newImage = new Image(20, 20);
                newImage.src = "img/keg.png";
                newImage.className = "storage-kegs-icon";
                let theDiv = clone.querySelector(".kegs-icon-container");
                theDiv.appendChild(newImage);
                amountOfKegs = amountOfKegs - 1;
            }
            storageContainer.appendChild(clone);

        }
    }
    else {
        let kegIcons = document.querySelectorAll(".storage-kegs-icon");
        for (var i = 0; i < kegIcons.length; i++) {
            kegIcons[i].parentNode.removeChild(kegIcons[i]);
        }
        for (let count = 0; count < beerType.length; count++) {
            let amountOfKegs = beerType[count].amount;
            while (amountOfKegs > 0) {
                let newImage = new Image(20, 20);
                newImage.src = "img/keg.png";
                newImage.className = "storage-kegs-icon";
                newImage.style.marginRight = "3px";
                newImage.style.marginBottom = "3px";
                let theContainers = document.querySelectorAll(".kegs-icon-container");
                let containersArray = Array.from(theContainers);
                containersArray[count].appendChild(newImage);
                amountOfKegs = amountOfKegs - 1;
            }
        }


    }
}

function handleOrders(tickets) {
    const ordersContainer = document.querySelector("#orders-section");
    const ordersTemplate = document.querySelector("#orders-template").content;
    let firstOderTime = document.querySelector(".order-time");
    if (firstOderTime == null) {
        for (let count = 0; count < tickets.length; count++) {
            let clone = ordersTemplate.cloneNode(true);
            let timestamp = tickets[count].startTime;
            let date = new Date(timestamp);
            let hour = date.getHours();
            let minutes = date.getMinutes();
            if (hour <= 9) {
                hour = "0" + hour;
            }
            if (minutes <= 9) {
                minutes = "0" + minutes;
            }
            let divContainer = document.createElement("div");
            divContainer.className = "individual-order";
            let orderTime = document.createElement("h2");
            orderTime.className = "order-time";
            orderTime.textContent = hour + ":" + minutes;
            divContainer.appendChild(orderTime);
            for (let secCount = 0; secCount < tickets[count].order.length; secCount++) {
                let orderItem = document.createElement("p");
                orderItem.className = "order-item";
                orderItem.textContent = tickets[count].order[secCount];
                divContainer.appendChild(orderItem);
            }
            clone.appendChild(divContainer);
            ordersContainer.appendChild(clone);
        }
    }
    else {
        let orderTimes = document.querySelectorAll(".order-time");
        let selectOrders = document.querySelectorAll(".order-item");
        for (let count = 0; count < selectOrders.length; count++) {
            selectOrders[count].parentNode.removeChild(selectOrders[count]);
        }
        for (let count1 = 0; count1 < orderTimes.length; count1++) {
            orderTimes[count1].textContent = "";
        }
        for (let i = 0; i < tickets.length; i++) {
            let timestamp = tickets[i].startTime;
            let date = new Date(timestamp);
            let hour = date.getHours();
            let minutes = date.getMinutes();
            if (hour <= 9) {
                hour = "0" + hour;
            }
            if (minutes <= 9) {
                minutes = "0" + minutes;
            }
            orderTimes[i].textContent = hour + ":" + minutes;
            for (let j = 0; j < tickets[i].order.length; j++) {
                let divContainer = document.querySelectorAll(".individual-order");
                let orderItem = document.createElement("p");
                orderItem.className = "order-item";
                orderItem.textContent = tickets[i].order[j];
                divContainer[i].appendChild(orderItem);
            }
        }
    }
    checkContainer();

}

function checkContainer() {
    let divContainer = document.querySelectorAll(".individual-order");
    for (var i = 0; i < divContainer.length; i++) {
        if (divContainer[i].textContent == "")
            divContainer[i].style.display = "none";
    }

}


function handleKegs(keg) {
    const kegsContainer = document.querySelector("#kegs-section");
    const kegsTemplate = document.querySelector("#kegs-levels-template").content;
    let theKegName = document.querySelector(".keg-name");
    if (theKegName == null) {
        for (let count = 0; count < keg.length; count++) {
            let clone = kegsTemplate.cloneNode(true);
            let beerArray = ["Sleighride", "Hollaback Lager", "Ruined Childhood", "GitHop", "Mowintime", "Row 26", "Hoppily Ever After", "Steampunk", "Fairy Tale Ale", "El Hefe"];
            let kegName = clone.querySelector(".keg-name");
            kegName.textContent = keg[count].beer;
            for (let i = 0; i < beerArray.length; i++) {
                if (kegName.textContent == beerArray[i]) {
                    let beerTag = clone.querySelector(".beer-type-pic");
                    beerTag.src = "img/" + beerArray[i] + ".png";
                }
            }
            let levelBar = clone.querySelector(".w3-progressbar");
            let levelNum = clone.querySelector(".level-number");
            levelNum.textContent = keg[count].level + "/" + keg[count].capacity;
            levelBar.style.width = "100%";
            kegsContainer.appendChild(clone);
        }
    }
    else {

        for (let count = 0; count < keg.length; count++) {
            let level = document.querySelectorAll(".w3-progressbar");
            let decreaseValue = keg[count].capacity - keg[count].level;
            var percentValue = Math.floor((decreaseValue / keg[count].level) * 100);
            let newLevel = 100 - percentValue;
            level[count].style.width = newLevel + "%";
            let levelNum = document.querySelectorAll(".level-number");
            levelNum[count].textContent = keg[count].level + "/" + keg[count].capacity + "cl";
        }

    }

}


function handleQueue(people) {
    let queueLength = people.length;
    let queueNumber = document.querySelector("#queue-number");
    queueNumber.textContent = queueLength;
}

function realTime() {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    if (hours <= 9) {
        hours = "0" + hours;
    }
    if (minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds <= 9) {
        seconds = "0" + seconds;
    }
    document.getElementById("time").innerHTML =
        hours + ":" + minutes + ":" + seconds;
    var t = setTimeout(realTime, 500);
}

function doDropDown() {
    document.querySelector("#theDropdown").classList.toggle("show");
}

function closeDropDownOnClick(event) {
    if (!event.target.matches('.login-button')) {

        var dropdowns = document.querySelector(".login-button");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}