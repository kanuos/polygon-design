let projectID;
const projectDetail = document.getElementById("project__detail");
const projectDetailTitle = document.getElementById("project__detail__title");
const projectDetailCaption = document.getElementById("project__detail__caption");
const projectDetailFront = document.querySelector(".project__detail__front");
const projectDetailBack = document.querySelector(".project__detail__back");
const loader = document.querySelector(".loader");
const time = document.querySelector("#time");
const locationEl = document.querySelector("#location");
const LOCATIONS = ["new york", "london", "berlin", "paris"]
const allArticles = document.querySelectorAll(".card");
const hiddenThumbnails = document.querySelectorAll(".cardMore");
const showMore = document.querySelector(".showMore");
const brandIcons = document.querySelectorAll(".brandIcon");
const detailTogglers = document.querySelectorAll(".detailToggler");
const footerInput = document.querySelector("#msg");
const label = document.querySelector(" label[for='msg']");
const paragraphs = document.querySelectorAll(".appearingText");
const modalGroup = document.querySelectorAll(".modalGroup");

let articles = [];

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
footerInput.addEventListener("keyup", () => {
    const {value} = footerInput;
    if (value.length) {
        label.style.visibility = "hidden";
        return;
    }
    label.style.visibility = "visible";
})


// when the project is clicked

detailTogglers?.forEach(toggler => {
    toggler.addEventListener("click", e => {
        e.preventDefault();
        projectID = e.target.pathname.split("/")?.[e.target.pathname.split("/").length - 1] ?? 1
        const {title, caption, front, back} = articles[projectID - 1];
        projectDetailBack.setAttribute("src", back);
        projectDetailFront.setAttribute("src", front);
        projectDetailTitle.textContent = title
        projectDetailCaption.textContent = caption
        hideDetail()    // toggle effect
        projectDetail.scrollTo(0,0)
    })

})

function grabProjectDetail(){
    allArticles.forEach(el => {
        const [article, h3] = el.children
        const project = {
            front : article.firstElementChild.children[1].getAttribute("src"),
            back : article.firstElementChild.children[0].getAttribute("src"),
            title : article.children[1].textContent,
            caption : h3.textContent.trim()
        }
        articles.push(project)
    })
}

function hideDetail() {
    projectDetail?.classList.toggle("scale-100")
    projectDetail?.classList.toggle("scale-0")
}




// functions that run when the page loads
window.addEventListener("load", () => {
    const p =new Promise((resolve, reject) => {
        grabProjectDetail()
        updateTimer();
        changeLocaiton();
        animateIcons();
        setTimeout(()=> {
            resolve(true)
        }, 1000)
    })
    p.then(hideLoader)
})


// animations

const articleObserver = new IntersectionObserver(
    (entries, articleObserver) => {
        entries.forEach(entry => {
            entry.target.style.transition = "all .5s ease";
            if (entry.isIntersecting){
                entry.target.style.opacity = 1;
                entry.target.style.transform = "scale(1)";
                return 
            } 
            entry.target.style.opacity = 0.25;
            entry.target.style.transform = "scale(.5)";
        })
    },
{
    threshold : .5,
    rootMargin : "0px 0px 200px 0px"
})

const paragraphObserver = new IntersectionObserver(entries=> {
    entries.forEach(entry => {
        entry.target.style.transition = "all .5s ease-out"
        if (entry.isIntersecting){
            entry.target.style.transform = "scale(1) translateX(0)";
            return
        }
        entry.target.style.transform = "scale(0) translateX(100%)";
    })
}, 
{
    threshold : 0.75,
})


paragraphs.forEach(paragraph => paragraphObserver.observe(paragraph))
allArticles.forEach(article => articleObserver.observe(article))
modalGroup.forEach(article => articleObserver.observe(article))