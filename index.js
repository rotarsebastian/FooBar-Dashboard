/*import is from is;
import GreenSock from gsap;
import Chart from Chart.js;
*/

init();

const data = FooBar.getData();
const newData = JSON.parse(data);

function init() {
    //setInterval(update, 300);
    update();
}

function update() {
    let data = JSON.parse(FooBar.getData());
    console.log(FooBar.getData(true));
    console.log(data.bartenders);
    handleBartender(data.bartenders);
}

function handleBartender(bartender) {
    console.log(bartender[0]);
}

