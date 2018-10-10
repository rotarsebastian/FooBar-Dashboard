/*import is from is;
import GreenSock from gsap;
import Chart from Chart.js;
*/

init();

const data = FooBar.getData();
const newData = JSON.parse(data);

function init() {
    //setInterval(updateBartender, 5000);
    //setInterval(updateStorageRoom, 300);
    setInterval(updateOrders, 300);
    updateStorageRoom();
    //updateOrders();

}

function updateBartender() {
    let data = JSON.parse(FooBar.getData());
    handleBartender(data.bartenders);
}

function updateStorageRoom() {
    let data = JSON.parse(FooBar.getData());
    handleStorageRoom(data.storage);
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
                newImage.src = "img/mowintime.png";
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
            console.log(amountOfKegs);
            while (amountOfKegs > 0) {
                let newImage = new Image(20, 20);
                newImage.src = "img/mowintime.png";
                newImage.className = "storage-kegs-icon";
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
            selectOrders[i].parentNode.removeChild(selectOrders[i]);
        }
        for (let count1 = 0; count1 < orderTimes.length; count1++) {
            orderTimes[count1].textContent = "";
        }
        console.log(tickets);
        for (let count2 = 0; count2 < tickets.length; count2++) {
            let timestamp = tickets[count2].startTime;
            let date = new Date(timestamp);
            let hour = date.getHours();
            let minutes = date.getMinutes();
            if (hour <= 9) {
                hour = "0" + hour;
            }
            if (minutes <= 9) {
                minutes = "0" + minutes;
            }
            orderTimes[count2].textContent = hour + ":" + minutes;
            for (let count = 0; count < tickets[count2].order.length; count++) {
                let orderItem = document.createElement("p");
                orderItem.className = "order-item";
                orderItem[count2].textContent = tickets.order[count];
                divContainer.appendChild(orderItem);
            }
        }
    }
}