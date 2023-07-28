const mainContent = document.querySelector(".content");
const mainContentBg = document.getElementById("main-content-bg");
const mapContent = document.querySelector(".content-map")
const mapContentBg = document.getElementById("content-map-bg");
const poldoShot1 = document.getElementById("poldo-shot1");


const headerDesc = document.getElementsByClassName("header-desc")[0];
const headerDescBtn = document.getElementById("header-desc-btn");

// // headerDescBtn.style.width = headerDesc.offsetWidth /2 + "px";

// console.log(document.querySelectorAll(".content-contacts-form:last-child"))

window.addEventListener("load", (event) => {
    mainContentBg_curve();
    mapContentBg_curve();
})

addEventListener("resize", (e) => {
    mainContentBg_curve();
    mapContentBg_curve();
})

headerDescBtn.addEventListener('click', (e) => {
    window.location.href="#content-contacts-contact";
    e.preventDefault();
    e.stopPropagation();
})

// poldoShot1.addEventListener("mousemove", (e) => {
//     let moveX = (e.pageX * -1 / 15);
//     let moveY = (e.pageY * -1 / 15);
//     poldoShot1.style.backgroundPosition = moveX + "px " + moveY + "px";
// })

function curvePx(height, percent = 8) {
    let w = Math.max(height, window.innerWidth || 0);
    return ((percent * w) / 100);
}

function mainContentBg_curve (x_maincontent_height = mainContent.offsetHeight) {
    
    let window_width = window.innerWidth;
    let curvepx = curvePx(x_maincontent_height)

    /* Calcolo la percentuale di quando il contenitore del contenuto (quello incurvato) deve stare sopra all'immagine
    In questo caso voglio che sia visibile sempre il 22% del mainContent e il restante dell'header/immagine */
    let mainContentTopMargin = ((22*window.innerHeight) / 100);
    // console.log(mainContentTopMargin)

    // mainContent.style.marginTop = `-${curvepx+1}px`;
    mainContent.style.marginTop = `-${mainContentTopMargin}px`

    mainContentBg.style.clipPath = `
        path(\"M 0 0 \\
            Q ${window_width / 2} ${curvepx} ${window_width} 0 \\
            L ${window_width} ${x_maincontent_height} \\
            Q ${window_width / 2} ${x_maincontent_height - curvepx} 0 ${x_maincontent_height} \\
        \")
    `;
    mainContentBg.style.stroke = "block";
}

function mapContentBg_curve (x_mapcontentbg_height = mainContent.offsetHeight) {
    
    let window_width = window.innerWidth;
    let curvepx = curvePx(x_mapcontentbg_height)
    mapContent.style.marginTop = `-${curvepx+1}px`;
    
    mapContentBg.style.clipPath = `
            path(\"M 0 ${curvepx} \\
                Q ${window_width / 2} 0 ${window_width} ${curvepx} \\
                L ${window_width} ${x_mapcontentbg_height} \\
                L 0 ${x_mapcontentbg_height} \\
            \")
        `;
    mapContentBg.style.stroke = "block";
}

/* Burger Menu Handlers */
const navbarMenu = document.querySelector(".navbar-menu");
const navbarMenuText = document.getElementById("navbar-menu-text");
const navbarMenuBasicBurger = document.querySelector("#navbar-menu-burger")

const rotatedBurgerContainer = document.querySelector(".navbar-menu-sliced-burger-container");
const headerMenu = document.querySelector(".header-menu ")

// Variable che uso per gestire quando chiudo il menu al click e si resetta tutto a default
var hoverLeaveDisabled = false; 

// Variabile per la gestione dello sfondo semi trasparante sull'intero sito
const siteCover = document.getElementById("site-cover-opacity");

navbarMenu.onmouseover = (e) => {
    navbarMenuText.style.display = "none";
    // navbarMenuBasicBurger.style.transform = 'scale(1.2)';
    navbarMenuBasicBurger.children[0].style.display = "none"
    rotatedBurgerContainer.style.display = "flex";
}

navbarMenu.onmouseleave = (e) => {
    resetNavBarmenu()
}

rotatedBurgerContainer.addEventListener('click', (e) => {
    let tmp = 0;
    hoverLeaveDisabled = hoverLeaveDisabled == true ? false : true;
    if (hoverLeaveDisabled == false) return resetNavBarmenu()
    headerMenu.style.display = "flex";
    window.setTimeout(() => {
        
        siteCover.style.visibility = "visible";
        siteCover.style.opacity = "0.5";
        
        for (var item of headerMenu.children) {
            item.style.left = "0px"
        }

        rotatedBurgerContainer.children[0].style.transform = 'rotate(-7deg)'
        rotatedBurgerContainer.children[1].style.transform = 'rotate(9deg)'
        rotatedBurgerContainer.children[2].style.transform = 'rotate(-5deg)'
    }, 0)
    
});

function resetNavBarmenu() {
    if (hoverLeaveDisabled) return;
    for (var item of headerMenu.children) {
        item.style.left = ""
    }
    window.setTimeout(() => {
        navbarMenuText.style.display = "";
        // navbarMenuBasicBurger.style.transform = 'scale(1.0)';
        navbarMenuBasicBurger.children[0].style.display = "";

        siteCover.style.visibility = "hidden";
        siteCover.style.opacity = "";

        rotatedBurgerContainer.style.display = "none";
        rotatedBurgerContainer.children[0].style.transform = ''
        rotatedBurgerContainer.children[1].style.transform = ''
        rotatedBurgerContainer.children[2].style.transform = ''

        headerMenu.style.display = "";
    }, 500)
    
    // for (var item of headerMenu.children) {
    //     item.style.transform = '';
    // }
}


/* Mail Form Handlers */
const groupInfo = document.querySelectorAll(".content-contacts-form-groupinfo input");
const mailOggetto = document.getElementById("mail-oggetto");
const mailMessaggio = document.getElementById("mail-messaggio");
const mailTermini = document.getElementById("mail-checkbox");
const btnSendForm = document.querySelector(".content-contacts-form-groupsend-btn");
const mail = "24mattiaromagnoli96@gmail.com";

btnSendForm.addEventListener("click", (e) => {
    const mex = "Uno o più campi non sono compilati!"
    for (var item of groupInfo) {
        if (item.value.length == 0) return alert(mex)
    }
    if (mailOggetto.value.length == 0) return alert(mex)
    else if (mailMessaggio.value.length == 0) return alert(mex)
    else if (!mailTermini.checked) return alert(mex);

    var body = `Richiesta ricevuta da:
Nome: ${groupInfo[0].value}
Email: ${groupInfo[1].value}
Telefono: ${groupInfo[2].value}

 Oggetto: ${mailOggetto.value}
 Messaggio: ${mailMessaggio.value}
`
    body = encodeURIComponent(body);
    window.open(`mailto:${mail}?subject=Richiesta%20apertura%20poldo&body=${body}`)
    // this.parentNode.parentNode.parentNode.submit()

    // this.parentNode.submit();

    svuotaForm()
})

function svuotaForm() {
    for (var item of groupInfo) {
        item.value = ""
    }
    mailOggetto.value = "";
    mailMessaggio.value = "";
    mailTermini.checked = false;
}

const sendBtnText = btnSendForm.children[0];
const sendBtnImg = btnSendForm.children[1];

btnSendForm.onmouseover = (e) => {
    sendBtnImg.style.display = "block"
    window.setTimeout(() => {
        sendBtnImg.style.opacity ="1"
    
        // btnSendForm.style.padding = "0.6vw 1.5vw";
        btnSendForm.style.width = "22%";
    }, 10)
    
}

btnSendForm.onmouseleave = (e) => {
    
    sendBtnImg.style.opacity ="0"
    btnSendForm.style.width = "15%";

    window.setTimeout(() => {
        sendBtnImg.style.display = "none"
    }, 400)
    
}

/* Map Handlers */
const srcSiena = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.705212206632!2d11.324839010615682!3d43.32043007377106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a2cb93d7551ed%3A0xd7efec9512a244bc!2sDa%20Poldo%20Food%20%26%20Love%20-%20Siena!5e0!3m2!1sit!2sit!4v1688574873518!5m2!1sit!2sit"; 
const srcFollonica = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d373970.15831835964!2d10.180147573437495!3d42.922593599999985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1329dd99c194efa5%3A0x50992199f48e1259!2sDa%20Poldo%20Food%20%26%20Love%20-%20Follonica!5e0!3m2!1sit!2sit!4v1688587370235!5m2!1sit!2sit";
const srcColle = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2897.957275535564!2d11.136548910622167!3d43.419719367381596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a3a95354f9cd3%3A0x7a47919d0436fb9b!2sDa%20Poldo%20Food%20%26%20Love%20-%20Colle%20di%20Val%20d&#39;Elsa!5e0!3m2!1sit!2sit!4v1688592509326!5m2!1sit!2sit";
const srcPoggibonsi = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.4526098069136!2d11.144376310625617!3d43.472023964011136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a3a1daa980659%3A0x2236d16fcfd0b296!2sDa%20Poldo%20Food%20%26%20Love%20-%20Poggibonsi!5e0!3m2!1sit!2sit!4v1688587480320!5m2!1sit!2sit";

const mapFrame = document.getElementById("map-frame");
const contentMapLogo = document.getElementById("content-map-logo");
const footerMapBtns = document.querySelector(".footer-map-btns");
const animTimeout = 500;

footerMapBtns.children[0].onclick = (e) => {
    if (e.target.classList.contains("selected")) return;
    mapFrame.src = "";
    contentMapLogo.style.transform = "translate(-50%,-50%) scale(1)";
    setTimeout(() => {
        mapFrame.src = srcSiena;
        removeMapBtnSelection();
        e.target.classList.add("selected");
        contentMapLogo.style.transform = "translate(-50%,-50%) scale(0)";
    }, animTimeout)
}

footerMapBtns.children[1].onclick = (e) => {
    if (e.target.classList.contains("selected")) return;
    mapFrame.src = "";
    contentMapLogo.style.transform = "translate(-50%,-50%) scale(1)";
    setTimeout(() => {
        mapFrame.src = srcFollonica;
        removeMapBtnSelection();
        e.target.classList.add("selected");
        contentMapLogo.style.transform = "translate(-50%,-50%) scale(0)";
    }, animTimeout)
}

footerMapBtns.children[2].onclick = (e) => {
    if (e.target.classList.contains("selected")) return;
    mapFrame.src = "";
    contentMapLogo.style.transform = "translate(-50%,-50%) scale(1)";
    setTimeout(() => {
        mapFrame.src = srcColle;
        removeMapBtnSelection();
        e.target.classList.add("selected");
        contentMapLogo.style.transform = "translate(-50%,-50%) scale(0)";
    }, animTimeout)
}

footerMapBtns.children[3].onclick = (e) => {
    if (e.target.classList.contains("selected")) return;
    mapFrame.src = "";
    contentMapLogo.style.transform = "translate(-50%,-50%) scale(1)";
    setTimeout(() => {
        mapFrame.src = srcPoggibonsi;
        removeMapBtnSelection();
        e.target.classList.add("selected");
        contentMapLogo.style.transform = "translate(-50%,-50%) scale(0)";
    }, animTimeout)
}


function removeMapBtnSelection() {
    for (let item of footerMapBtns.children) {
        if (item.classList.contains("selected")) {
            item.classList.remove("selected");
            item.removeAttribute("class")
        }
    }
}



// const resContainer = document.querySelector(".res-container");

// window.onresize = (e) => {
//     resContainer.children[0].textContent = window.innerWidth;
//     resContainer.children[2].textContent = window.innerHeight;
// }

// window.onload = (e) => {
//     resContainer.children[0].textContent = window.innerWidth;
//     resContainer.children[2].textContent = window.innerHeight;
// }