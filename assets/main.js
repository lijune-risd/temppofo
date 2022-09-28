import { data } from './data.js';

/*import kalsu ilssnun is module // put type as module */


/*window load*/

let numberOfPanels = 8;
let panelSize = 300;
let unitRadian = 2*Math.PI / numberOfPanels;
let unitDegree = 360 / numberOfPanels;


let loaderElem;
let panelsElem;
let panelItemElems;
let panelListElem;
let observerElems;


let prevPageYOffset;
let scrollDirection; //scrollDirection

let currentIndex; //Current Index
let currentPanelElem; //current active 

let projectListElem;

let projectView;




function setElems() {
    loaderElem = document.querySelector('.loader-wrapper');
	panelsElem = document.querySelector('.panels');
	panelListElem = document.querySelector('.panel-list');
	panelItemElems = document.querySelectorAll('.panel-item');
	observerElems = document.querySelectorAll('.observer-ready');
	projectListElem = document.querySelector('.project-list');

}

function setPanelItems() {
    const dist = (panelSize / 2) / Math.tan(unitRadian / 2) + (panelSize * 0.65);

    for (let i = 0; i < panelItemElems.length; i++) {
        console.log(panelItemElems[i]);
       panelItemElems[i].style.transform = `rotateY(${unitDegree * i}deg) translateZ(${dist}px)`;
       //colors the item
       panelItemElems[i].style.backgroundColor = data[i].color;
    }
}
function inactivatePanel() {
    if (currentPanelElem) {
    currentPanelElem.classList.remove('active');
    }
}

function setCurrentPanel() {
	inactivatePanel();
	currentPanelElem = panelItemElems[currentIndex] ;
    // if (currentPanelElem) {
	// currentPanelElem.classList.add('active');
    // }
}


function rotatePanel() {
    panelListElem.style.transform =  `translateZ(${numberOfPanels * 85}px) rotateY(${unitDegree * currentIndex}deg)`;
    setCurrentPanel();
}


window.addEventListener('load', () => {
    console.log('load!');
    setElems();

    
    loaderElem.addEventListener('transitioned', e => {
        e.currentTarget.remove();
        console.log(e.currentTarget);

        /*hwasalpyo hamsu */
    });

    document.body.classList.remove('before-load');
    setPanelItems();

	projectView = new ProjectView();

    //Intersection Observer 
    const io = new IntersectionObserver((entries, observer) => {
        //checks entry that comes to eye first  isIntersecting : true
        //checks entry that vanishes isIntersecting : false 
       // console.log(entries);

        for (let i = 0; i <entries.length; i++) {


            if (entries[i].isIntersecting) {

                //First entry 

                if (entries[i].target.classList.contains('content-observer-start')) {
                    currentIndex = 0;
                    rotatePanel();
                    continue;
                } 
                const projectIndex = entries[i].target.dataset.projectIndex*1;

                //boolean value isIntersecting 
            
               console.log(entries[i].target.dataset.projectIndex);

                if (projectIndex >= 0 ) {
                    //uses the ProjectIndex 
                    if (scrollDirection === 'down') {
                        currentIndex = entries[i].target.dataset.projectIndex*1;
                    }else {
                        currentIndex = entries[i].target.dataset.projectIndex*1 +1;
                    }
                    if (currentIndex >= numberOfPanels -1) {
                        currentIndex = numberOfPanels -1;
                    }
                    //rotate panel again
                    rotatePanel();
                    }

                    if (scrollDirection === 'up' && entries[i].target.classList.contains('header-content')) {
                        panelListElem.style.transform =  `translateZ(0) rotateY(0deg)`;
                    }

                    //last project 
                     if (scrollDirection === 'down' && entries[i].target.classList.contains('content-observer-end')) {
                        //Goes down 
                        panelsElem.classList.add('static-position');
                     }

                     //last project 
                     if (scrollDirection === 'up' && (currentIndex = numberOfPanels -1)) {
                        //Goes down 
                        panelsElem.classList.remove('static-position');
                     }
                }
           
        }
    });

   
    observerElems.forEach((item, i) => {
        //console.log(i);
        //console.log(item);
        io.observe(item);
        console.log(rotatePanel());
    });

    window.addEventListener('scroll', () => {
        console.log('scroll');
        if (prevPageYOffset > window.pageYOffset) {
            scrollDirection = 'up';
        } else {
            scrollDirection = 'down';
        }
        prevPageYOffset = window.pageYOffset;
    });

    // projectListElem.addEventListener('click', e => {
	// 	// console.log(e.target);
	// 	if (e.target.classList.contains('project-btn')) {
	// 		// projectView.show(data[ e.target.dataset.projectIndex ]);
	// 	}
	// });


});



