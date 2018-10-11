/*import is from is;
import GreenSock from gsap;
import Chart from Chart.js;
*/

init();


function init() {
    //setInterval(updateStorageRoom, 300);
    setInterval(updateOrders, 300);
    setInterval(updateKegs, 300);
    setInterval(updateQueue, 300);
    updateBartender();
    updateStorageRoom();


    document.addEventListener("click", closeDropDownOnClick);
    document.querySelector(".login-button").addEventListener("click", doDropDown);
}

function updateQueue() {
    let data = JSON.parse(FooBar.getData());
    handleQueue(data.queue);
}

function updateBartender() {
    let data = JSON.parse(FooBar.getData());
    handleBartenders(data.bartenders);
}

function updateStorageRoom() {
    let data = JSON.parse(FooBar.getData());
    handleStorageRoom(data.storage);
    //console.log(FooBar.getData(true));
}

function updateKegs() {
    let data = JSON.parse(FooBar.getData());
    handleKegs(data.taps, data.storage);
}


function updateOrders() {
    let data = JSON.parse(FooBar.getData());
    handleOrders(data.queue);
}

function handleBartenders(bartender) {
    let dropDowns = document.querySelectorAll(".drop-down-name");
    for (let count = 0; count < bartender.length; count++) {
        dropDowns[count].textContent = " " + bartender[count].name;
    }

}

function logIn(e) {
    let bartenderName = document.querySelector("#welcome-bartender-name");
    bartenderName.textContent = e.textContent;
}

function handleStorageRoom(beerType) {
    const storageContainer = document.querySelector("#storage-room-section");
    const storageTemplate = document.querySelector("#storage-room-template").content;
    if (!handleStorageRoom.didrun) {
        for (let count = 0; count < beerType.length; count++) {
            let clone = storageTemplate.cloneNode(true);
            let amountOfKegs = beerType[count].amount;
            clone.querySelector(".beer-name-storage").textContent = beerType[count].name + ` (${amountOfKegs})`;
            if (amountOfKegs == 0 || amountOfKegs == 1) {
                let lowWarning = clone.querySelector(".low-amount-warning");
                lowWarning.textContent = "Low amount left!";
            }
            while (amountOfKegs > 0) {
                let newImage = new Image(20, 25);
                newImage.src = "img/keg.png";
                newImage.className = "storage-kegs-icon";
                newImage.style.marginRight = "3px";
                newImage.style.marginBottom = "3px";
                let theDiv = clone.querySelector(".kegs-icon-container");
                theDiv.appendChild(newImage);
                amountOfKegs = amountOfKegs - 1;
            }

            storageContainer.appendChild(clone);

        }
    }
    /*
    else {
        let kegIcons = document.querySelectorAll(".storage-kegs-icon");
        for (var i = 0; i < kegIcons.length; i++) {
            kegIcons[i].parentNode.removeChild(kegIcons[i]);
        }
        for (let count = 0; count < beerType.length; count++) {
            let amountOfKegs = beerType[count].amount;
            while (amountOfKegs > 0) {
                let newImage = new Image(20, 25);
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
        

    }*/
    handleStorageRoom.didrun = true;
}

function handleOrders(tickets) {
    const ordersContainer = document.querySelector("#orders-section");
    const ordersTemplate = document.querySelector("#orders-template").content;
    if (!handleOrders.didrun) {
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
            divContainer.id = tickets[count].id;
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
        handleOrders.didrun = true;
    }
    else {
        let orderContainers = document.querySelectorAll(".individual-order");
        //DELETE THE EXPIRED ORDERS
        for (let i = 0; i < orderContainers.length; i++) {
            let itsOk = 0;
            for (let j = 0; j < tickets.length; j++) {
                if (orderContainers[i].id == tickets[j].id) {
                    itsOk = 1;
                }
            }
            if (itsOk == 0) {
                orderContainers[i].remove();
            }
        }
        //ADD NEW ORDERS FROM QUEUE
        if (tickets.length != 0) {
            for (let z = 0; z < tickets.length; z++) {
                let isOk = 0;
                for (let x = 0; x < orderContainers.length; x++) {
                    if (tickets[z].id == orderContainers[x].id) {
                        isOk = 1;
                    }
                }
                if (isOk == 0) {
                    let clone = ordersTemplate.cloneNode(true);
                    let timestamp = tickets[z].startTime;
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
                    divContainer.id = tickets[z].id;
                    let orderTime = document.createElement("h2");
                    orderTime.className = "order-time";
                    orderTime.textContent = hour + ":" + minutes;
                    divContainer.appendChild(orderTime);
                    for (let count = 0; count < tickets[z].order.length; count++) {
                        let orderItem = document.createElement("p");
                        orderItem.className = "order-item";
                        orderItem.textContent = tickets[z].order[count];
                        divContainer.appendChild(orderItem);
                    }
                    clone.appendChild(divContainer);
                    ordersContainer.appendChild(clone);
                }
            }
        }


    }

}


function handleKegs(keg, storageAmount) {
    const kegsContainer = document.querySelector("#kegs-section");
    const kegsTemplate = document.querySelector("#kegs-levels-template").content;
    let theKegName = document.querySelector(".keg-name");
    if (!handleKegs.didrun) {
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
            console.log(newLevel);
            if (newLevel == 0) {
                newLevel = 100;
            }
            level[count].style.width = newLevel + "%";
            let levelNum = document.querySelectorAll(".level-number");
            levelNum[count].textContent = keg[count].level + "/" + keg[count].capacity + "cl";
            if (keg[count].level == 0) {
                let allKegsInStorage = storageAmount.amount;
                //CONTINUE
                let theBeers = document.querySelectorAll(".beer-name-storage");
                for (let i = 0; i < theBeers.length; i++) {
                    if (keg[count].beer == theBeers[i].textContent) {
                        let theBeerIcons = theBeers[i].nextElementSibling;
                        let lastKegIs = theBeerIcons.lastChild;
                        if (lastKegIs != null) {
                            lastKegIs.remove();
                        }
                    }
                }

            }
        }

    }
    handleKegs.didrun = true;

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
        let thedropdown = document.querySelector("#theDropdown");
        if (thedropdown.classList.contains('show')) {
            thedropdown.classList.remove('show');
        }
    }
}
