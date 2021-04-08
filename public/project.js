const root = document.querySelector("#root");

// root.textContent = 
const id = location.search?.split("=")[1];

if (!(parseInt(id) < 1) || (!parseInt(id) > 5)){
    console.log("BAD REQUEST");
} else {
    console.log(id);
}