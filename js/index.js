
let mask = document.querySelector('.mask');

window.addEventListener('load', () => {
    mask.classList.add('hide');
    setTimeout(() => { 
        mask.remove();
    },1000)
});

let  ellogaut = document.querySelector("#logout");
let elForm = document.querySelector("form");
let elInput = document.querySelector("#text");
let elList = document.querySelector(".products");
// let elBtns = document.querySelector(".btns");

let token = localStorage.token

if(!token){
 document.location.replace("login.html");
}
ellogaut.addEventListener("click",()=>{
    if (confirm("вы уверены выйти?")) {
      localStorage.removeItem("token");
      location.replace("./login.html");
    }
});

let kino = "";
setTimeout(() => {
  elInput.addEventListener("keyup", (e) => {
    e.preventDefault();
    let elInputVal = elInput.value;
    kino = elInputVal;
    renderFetch(elInputVal);
  });
}, 3000);

async function renderFetch(a) {
  let resolve = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${a}&startIndex=20&maxResults=6&orderBy=newest`	
  );
  let data = await resolve.json();
  renderFilm(data.items);
  console.log(data.items);
};


async function renderPosts(e){
	let id =e.target.getAttribute("data-user-id");
	let{data: posts} = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${el.bookId}`);

		console.log(posts);
}
function renderFilm(arr) {
  elList.innerHTML = "";

  arr.forEach((el) => {
    let productItem = document.createElement("div");
    productItem.classList.add("productItem");
    let proImg = document.createElement("img");
    proImg.src = el.volumeInfo.imageLinks.smallThumbnail;
    let proH2 = document.createElement("h2");
    proH2.innerHTML = el.volumeInfo.title;
    let proH3 = document.createElement("h3");
    proH3.innerHTML = el.volumeInfo.authors;
     let proH4 = document.createElement("h4");
     proH4.innerHTML = el.volumeInfo.publishedDate;

    let proItemLink = document.createElement("div");
    proItemLink.classList.add("proItemLink");
    let toBasket = document.createElement("a");
    toBasket.classList.add("toBasket");
    toBasket.innerHTML = "Bookmark";
    let toInfo = document.createElement("button");


    toInfo.classList.add("toInfo");
    toInfo.innerHTML = "More Info";
	toInfo.setAttribute('data-user-id', el.id)

     let toRead = document.createElement("button");
     toRead.classList.add("toRead");
     toRead.innerHTML = "Read";
	 toRead.setAttribute('data-user-id',el.previewLink)
    proItemLink.append(toBasket, toInfo);
    productItem.append(proImg, proH2, proH3, proH4, proItemLink, toRead);
    elList.append(productItem);

	toInfo.addEventListener("click",renderPosts)
  });
};



elList.addEventListener("click", (evt) => {
	if (evt.target.matches(".toRead")) {
	  let elbookId = evt.target.dataset.bookId;
	  console.log(elbookId);
	  
  
  location.replace('https://books.google.co.uz/books?id=shEwEAAAQBAJ&pg=PT20&dq=we&hl=&cd=11&source=gbs_api#v=onepage&q=we&f=false');
  console.log("read ishladi ");
  
	}
  });