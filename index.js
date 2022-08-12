// Smooth scrolling instead of changing link url
const navbar = document.querySelector('.navbar');
const top_button = document.querySelector('.top-button');

function scrollSmoothTo(elementId) {
    var element = document.getElementById(elementId);
    element.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }

//Hamburger button
const navList = document.querySelector(".menu")
const hamburger = document.querySelector(".navbar__ham")

function hamburgerOpen(){

    if (!navList.classList.contains("active-menu")){
        navList.classList.add('active-menu')
    } else{
        navList.classList.remove('active-menu')
    }
    if (!hamburger.classList.contains("open")){
        hamburger.classList.add('open')
    } else{
        hamburger.classList.remove('open')
        hamburgerClose()
    }

}
function hamburgerClose(){
    navList.classList.remove('active-menu')
    hamburger.classList.remove('open')
    aboutMenu.classList.add("hide-sub")
    aboutMenu.classList.remove('active-sub')
    projectsMenu.classList.add('hide-sub')
    projectsMenu.classList.remove('active-sub')
    aboutMain.classList.remove('menu-item-gap')
    projectsMain.classList.remove('menu-item-gap')
}


// Sub menu links open on menu hover
projectsMenu = document.getElementById('projects-sub')
aboutMenu = document.getElementById('about-sub')
projectsMain = document.getElementById('nav-projects')
aboutMain = document.getElementById('nav-about')

openSubMenu = (link) => {
    if (link.id === 'nav-projects'){
        projectsMenu.classList.add('active-sub')
        projectsMenu.classList.remove('hide-sub')
        aboutMenu.classList.add("hide-sub")
        aboutMenu.classList.remove('active-sub')
        if (window.innerWidth < 1080){
            link.classList.add('menu-item-gap')
            aboutMain.classList.remove('menu-item-gap')
        }
    } else if (link.id === 'nav-about') {
        aboutMenu.classList.add('active-sub')
        aboutMenu.classList.remove('hide-sub')
        projectsMenu.classList.add('hide-sub')
        projectsMenu.classList.remove('active-sub')
        if (window.innerWidth < 1080){
            link.classList.add('menu-item-gap')
            projectsMain.classList.remove('menu-item-gap')
        }
    }
}
closeSubMenu = (link) => {
    if (window.innerWidth >= 1080){
        if (link === 'nav-projects'){
            projectsMenu.classList.add('hide-sub')
            projectsMenu.classList.remove('active-sub')
        } else if (link === 'nav-about'){
            aboutMenu.classList.add("hide-sub")
            aboutMenu.classList.remove('active-sub')
        } else {
            aboutMenu.classList.add("hide-sub")
            aboutMenu.classList.remove('active-sub')
            projectsMenu.classList.add('hide-sub')
            projectsMenu.classList.remove('active-sub')
        }
    }

}

// Smooth scrolling instead of changing link url
function scrollSmoothTo(elementId) { 
    let element = document.getElementById(elementId);
    const yOffset = 50
    // element.scrollIntoView({ block: 'start',  behavior: 'smooth' });
    const y = element.getBoundingClientRect().top + window.pageYOffset - yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
    hamburgerClose()
    closeSubMenu(elementId)
  }



  fetch('https://polar-eyrie-90298.herokuapp.com/https://letterboxd.com/supershah201/films/reviews/by/added/').then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {

	// Convert the HTML string into a document object
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');

	const link = 'https://polar-eyrie-90298.herokuapp.com/https://letterboxd.com/super' + doc.querySelector('.headline-2 > a').href.split('super')[1];

    fetch(link).then(function (response) {
        // The API call was successful!
        return response.text();
    }).then(async function (html) {
    
        // Convert the HTML string into a document object
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const latestReviewMovie = doc.querySelector('.film-title-wrapper > a').innerText;
        const latestReviewAuthor = doc.querySelector('.title-4 > a > span').innerText;
        const latestReview = doc.querySelector('.body-text > div > div').innerText;
        const latestReviewPoster = await getPoster1(latestReviewMovie);
         
        async function getPoster1(latestReviewMovie){
            const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=5be75f9f183da240b34367329058206a&language=English&include_adult=false&query=" + latestReviewMovie); // завершается с заголовками ответа
            const data = await response.json();
            return 'https://image.tmdb.org/t/p/w200/' + data.results[0].poster_path
        }
        
        document.querySelector('.reviews-container').children[0].children[0].children[0].src = latestReviewPoster
        document.querySelector('.reviews-container').children[0].children[0].href = link.split('https://polar-eyrie-90298.herokuapp.com/')[1]
        document.querySelector('.reviews-container').children[0].children[1].children[0].children[0].innerText = latestReviewMovie
        document.querySelector('.reviews-container').children[0].children[1].children[0].href = link.split('https://polar-eyrie-90298.herokuapp.com/')[1]
        document.querySelector('.reviews-container').children[0].children[1].children[2].children[0].innerText = latestReviewAuthor
        document.querySelector('.reviews-container').children[0].children[1].children[2].children[0].href = link.split('https://polar-eyrie-90298.herokuapp.com/')[1].split('/film')[0]
        document.querySelector('.reviews-container').children[0].children[1].children[3].innerText = latestReview
        document.querySelector('.reviews-container').children[0].children[1].children[3].href = link.split('https://polar-eyrie-90298.herokuapp.com/')[1]
    
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });

}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});


fetch('https://polar-eyrie-90298.herokuapp.com/https://letterboxd.com/typical/films/reviews/by/added/').then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {

	// Convert the HTML string into a document object
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');

	const link = 'https://polar-eyrie-90298.herokuapp.com/https://letterboxd.com/typical' + doc.querySelector('.headline-2 > a').href.split('typical')[1];

    fetch(link).then(function (response) {
        // The API call was successful!
        return response.text();
    }).then(async function (html) {
    
        // Convert the HTML string into a document object
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const latestReviewMovie = doc.querySelector('.film-title-wrapper > a').innerText
        const latestReviewAuthor = doc.querySelector('.title-4 > a > span').innerText
        const latestReview = doc.querySelector('.body-text > div > div').innerText
        const latestReviewPoster = await getPoster2(latestReviewMovie);
         
        async function getPoster2(latestReviewMovie){
            const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=5be75f9f183da240b34367329058206a&language=English&include_adult=false&query=" + latestReviewMovie); // завершается с заголовками ответа
            const data = await response.json();
            return 'https://image.tmdb.org/t/p/w200/' + data.results[0].poster_path
        }
 
        document.querySelector('.reviews-container').children[1].children[0].children[0].src = latestReviewPoster
        document.querySelector('.reviews-container').children[1].children[0].href = link.split('https://polar-eyrie-90298.herokuapp.com/')[1]
        document.querySelector('.reviews-container').children[1].children[1].children[0].children[0].innerText = latestReviewMovie
        document.querySelector('.reviews-container').children[1].children[1].children[0].href = link.split('https://polar-eyrie-90298.herokuapp.com/')[1]
        document.querySelector('.reviews-container').children[1].children[1].children[2].children[0].innerText = latestReviewAuthor
        document.querySelector('.reviews-container').children[1].children[1].children[2].children[0].href = link.split('https://polar-eyrie-90298.herokuapp.com/')[1].split('/film')[0]
        document.querySelector('.reviews-container').children[1].children[1].children[3].innerText = latestReview
        document.querySelector('.reviews-container').children[1].children[1].children[3].href = link.split('https://polar-eyrie-90298.herokuapp.com/')[1]
    
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });

}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});


if (window.innerWidth <= 750 && document.querySelector('.hero-menu').classList.contains('rotate')){
    document.querySelector('.hero-menu').classList.remove('rotate')
}