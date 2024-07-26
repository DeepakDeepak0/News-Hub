const API_KEY = "d80c8ae61f52422d97d3bd1d726a70a9";
const URL = "https://newsapi.org/v2/everything?q=";



window.addEventListener('load',()=> fetchNews("India"));

function reload(){
   window.location.reload();
}

async function fetchNews(query){
   const response = await  fetch(`${URL}${query}&apiKey=${API_KEY}`);
   const data = await response.json();
   console.log(data);
   bindData(data.articles);
}

function bindData(articles){
      const cardsContainer = document.getElementById('cards-container');
      const newsCardTemplate = document.getElementById('template-news-card');
      cardsContainer.innerHTML ="";

      articles.forEach((article)=>{
         if(!article.urlToImage) return;
         
         const cardClone = newsCardTemplate.content.cloneNode(true);   /*deep cloning*/
         fillDataInCard(cardClone,article);
         cardsContainer.appendChild(cardClone);
      })
}
function fillDataInCard(cardClone,article){
const newsImg = cardClone.querySelector('#news-img');
const newsTitle = cardClone.querySelector('#news-title');
const newsSource = cardClone.querySelector('#news-source');
const newsDesc = cardClone.querySelector('#news-desc');

newsImg.src = article.urlToImage;
newsTitle.innerHTML = article.title;
newsDesc.innerHTML = article.description;

const date = new Date(article.publishedAt).toLocaleString("en-US",{
   timeZone:"Asia/Jakarta"
})

newsSource.innerHTML = `${article.source.name} . ${date}`;  
cardClone.firstElementChild.addEventListener('click',()=>{
   window.open(article.url,"_blank");
})

}
let currSelectNav = null;
function onNavItemClick(id){
   fetchNews(id);
   const navItem = document.getElementById(id);
   currSelectNav?.classList.remove('active');    /*ifcurrSelctNav is not null*/
   currSelectNav = navItem;
   currSelectNav.classList.add('active');
}

const newsInput = document.getElementById('news-input');
const  searchButton = document.getElementById('search-button');

searchButton.addEventListener('click',()=>{
   const query = newsInput.value;
   if(!query) return;
   fetchNews(query);
   currSelectNav?.classList.remove('active');
   currSelectNav = null;
})

newsInput.addEventListener('keypress',(event)=>{
   if(event.key ==='Enter'){
      search();
   }
})

function search(){
   const query = newsInput.value;
   if(!query) return;
   fetchNews(query);
   currSelectNav?.classList.remove('active');
   currSelectNav = null;
}



const ModeButton = document.querySelector('.modeBtn');
const MainNav = document.querySelector('nav');
const Body = document.querySelector('body');
const NavItems = document.querySelector('.nav-items');
const cardContent = document.getElementsByClassName('card-content');

function modeChange(){
ModeButton.classList.toggle('activeMode1');
MainNav.classList.toggle('activeMode2');
Body.classList.toggle('activeMode3');
NavItems.classList.toggle('activeMode4');
ModeButton.classList.toggle('fa-toggle-on');
cardContent.classList.toggle('activeMode5');


}
