const loader = document.querySelector(".loader");
const time = document.querySelector("#time");
const locationEl = document.querySelector("#location");
const LOCATIONS = ["new york", "london", "berlin", "paris"]
const hiddenThumbnails = document.querySelectorAll(".cardMore");
const showMore = document.querySelector(".showMore");
const brandIcons = document.querySelectorAll(".brandIcon");


// update the timer element on DOM with the current time. Updates every second
function updateTimer(){
    const timer = setInterval(() => {
        const date = new Date();
        time.innerHTML = `${doubleDigit(date.getHours())}:${doubleDigit(date.getMinutes())} ${AM_PM()}`;
    }, 1000)
    return () => clearInterval(timer)
}

// takes a number and returns a double digit number.
function doubleDigit(number){
    return number < 10 ? `0${number}` : number
}

// checks whether currently the time of the day is Ante or Post Meridian
function AM_PM(){
    const time = new Date().toLocaleString().split(" ");
    return time[time.length - 1]
}

// update the location on DOM with anumation
function changeLocaiton(){
    const currentLocation = locationEl.innerText?.trim().toLowerCase();
    let index = LOCATIONS.indexOf(currentLocation)
    setInterval(() => {
        index = calculateIndex(index)
        locationEl.textContent = LOCATIONS[index]
        locationEl.animate([
            {
                transform : "translateY(100%)",
                opacity : 0
            },
            {
                transform : "translateY(0)",
                opacity : 1
            }
        ], {
            duration : 500,
            easing : "linear"
        })
    }, 2000);
}

// calculate the next index of the LOCATIONS array to be shown on the page
function calculateIndex(index){
    index++;
    if (index < 0 || index >= LOCATIONS.length){
        index = 0;
    }
    return index;
}

// hide the loader screen on load
function hideLoader() {
    document.querySelector("body")?.classList.remove("overflow-hidden");
    loader.classList.add("scale-0");
}

// show all/hide some project thumbnails
function toggleThumbnailVisibility(){
    hiddenThumbnails?.forEach(thumbnail => {
        thumbnail.classList.toggle("cardMore")
        thumbnail.classList.toggle("md:h-screen")
    })
    showMore.style.display = "none"
}

// show icon animations
function animateIcons() {
    setInterval(() => {
        brandIcons?.forEach(iconContainer => {
            Array.from(iconContainer.children).forEach(el => {
                el.classList.toggle("scale-0")
                el.classList.toggle("scale-100")
            })
        })
    }, 3500)
}


// show placeholder only when input is empty
const footerInput = document.querySelector("#msg");
const label = document.querySelector(" label[for='msg']");

footerInput.addEventListener("keyup", () => {
    const {value} = footerInput;
    if (value.length) {
        label.style.visibility = "hidden";
        return;
    }
    label.style.visibility = "visible";
})









// functions that run when the page loads
window.addEventListener("load", () => {
    const p =new Promise((resolve, reject) => {
        updateTimer();
        changeLocaiton();
        animateIcons();
        setTimeout(()=> {
            resolve(true)
        }, 1000)
    })
    p.then(hideLoader)
})

