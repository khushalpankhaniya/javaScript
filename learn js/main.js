// console.log(add1)
var parent = document.getElementById("parent")
// let add1 = document.querySelector("#btn")
// var text = document.getElementById("text")

// add1.addEventListener("click", additem)

// function additem() {
//     if(text.value.trim() === ""){}

//     var li = document.createElement("li");
//     var font = document.createTextNode(text.value);

//     li.appendChild(font)
//     parent.appendChild(li)

// }

// var btn = document.querySelector("#blue");

// btn.addEventListener('click', addnew)

// function addnew() {

//   var hoo = document.createElement("table");
//   hoo.classList.add("table");
//   const htmldata = `
//   <div class="card" style="width: 18rem;">
//   <div class="card-body">
//     <h5 class="card-title text-center">Card title</h5>
//     <p class="card-text text-center">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>`;
//   hoo.insertAdjacentHTML('afterbegin', htmldata);
//   document.body.appendChild(hoo)

// }

var bttn = document.querySelector("#bttn")

// bttn.addEventListener("click", additem)
// var clicked = false;
// function additem() {
//   if (!clicked) {
//     clicked = true;
//     // document.querySelector("#bttn").disabled = true; --> disabled button after one click
//     var width = window.innerWidth;
//     var height = window.innerHeight;
//     var h5 = document.createElement("h5");

//     const data = `<p>Your screen width is ${width} px </p>
//                   <p> Your screen height is ${height} px </p>
//                   `;            

//     h5.insertAdjacentHTML('afterbegin', data);
//     document.body.appendChild(h5)

//   }
// }

let arr = [" khushal ", "pankhaniya", "jenthibhai"]



console.log(arr[0])

// arr.forEach(element => {
//     setTimeout(() => {
//      document.write(arr)
//     }, 2000);
// });

setInterval(() => {
    let dt = new Date();
    document.write(dt)
}, 2000);



