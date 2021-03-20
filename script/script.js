let isDark;
//-
let headerCross = document.getElementById("burger")
let headerBurger = document.getElementById("cross")
//-
let magnifying = document.getElementById("magnifying")
let crossMagnifying = document.getElementById("crossMagnifying")
//-
const API_KEY = 'VfAQnZwBHdFaj75QChwBF5O4uEoTxQXh'
//-
const darkMode = document.querySelector("#darkMode")
let logoDark = document.querySelector("#logoDark")
let logo = document.querySelector("#logo")
//-
let crossDark = document.getElementById("burgerDark")
let hamburDark = document.getElementById("crossDark")
//-
let magnifDark = document.getElementById("magniDark")
let crossMagnifDark = document.getElementById("crossMagniDark")
//-
let amount = 11
const gifosContainer = document.querySelector(".gifosContainer")
//-
const clickSeeMore = document.querySelector(".seeMore")
const clickSeeMoreDark = document.querySelector(".seeMoreDark")
//-
const formGifosFinder = document.querySelector("#gifosFinder")
const inputTextToSearch = document.querySelector("#searchGifos")
//-
const lineHr = document.querySelector(".lineUnderSearch")
const wordSearchH2 = document.querySelector(".termToSearch")
//-
const tryAnotherSearch = document.querySelector("#tryAnotherSearch")

const buttonSeeMore = document.querySelector(".seeMore")
const buttonSeeMoreDark = document.querySelector(".seeMoreDark")
//-
const offH1 = document.querySelector(".color_purple")
const offIlustration = document.querySelector(".ilustra_header")
//-
const changePositionCross = document.querySelectorAll(".search")
//-
const clickMagnifying = document.querySelector("#magnifying")
const clickMagniDark = document.querySelector("#magniDark")

/*-------------------------------*/
/*   CHANGE MODE - DAY OR DARK   */
/*-------------------------------*/
let modeValidation = () => {
    let styleStatus = sessionStorage.getItem("modeStyle");
    if (styleStatus === null) {
        styleStatus = false;    
        sessionStorage.setItem("modeStyle", styleStatus);
    } else if (styleStatus !== null) {
        isDark = (styleStatus == 'true');
        sessionStorage.setItem("modeStyle", styleStatus);
    }
}
modeValidation();

/*----------------------------*/
/*   CLICK - NAVIGATION BAR   */
/*----------------------------*/
headerCross.addEventListener("click", () => {
    headerCross.classList.add("off")
    document.querySelector("#cross").classList.remove("off")
    document.querySelector("#menu").classList.remove("off")
})

headerBurger.addEventListener("click", () => {
    headerBurger.classList.add("off")
    document.querySelector("#burger").classList.remove("off")
    document.querySelector("#menu").classList.add("off")
})

/*------------------------------------------*/
/*   CLICK - GIFOS FINDER - FIRST SECTION   */
/*------------------------------------------*/
magnifying.addEventListener("click", () => {
    magnifying.classList.add("off")
    document.querySelector("#crossMagnifying").classList.remove("off")
})

crossMagnifying.addEventListener("click", (clic) => {
    clic.preventDefault()
    crossMagnifying.classList.add("off")
    document.querySelector("#magnifying").classList.remove("off")
})

let showButtonsMore = () => {
    let checkClass = document.getElementById("titleToSearch");
    let hasClassOff = checkClass.classList.contains('off');
    if (hasClassOff == false) {
        if (isDark == false) {
            document.querySelector(".seeMore").classList.remove("off")
            document.querySelector(".seeMoreDark").classList.add("off")
        } else {
            document.querySelector(".seeMore").classList.add("off")
            document.querySelector(".seeMoreDark").classList.remove("off")
        }
    }
}

/*----------------------------*/
/*          TRENDING          */
/*----------------------------*/
fetch(`https://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`)
    .then (response => response.json())
    .then (response => {
        const ulcreate = document.createElement("ul")
        
        response.data.slice(0,5).forEach( term => {
            const liTerms = document.createElement("li")
            const aTerms = document.createElement("a")
            aTerms.textContent = term + ", " 
            ulcreate.appendChild(liTerms)
            liTerms.appendChild(aTerms) 
        })
        document.querySelector(".ultrendings").appendChild(ulcreate) 
        
        const clickLista = document.querySelectorAll(".ultrendings > ul > li > a")
        clickLista.forEach( clicksito => {
            let texto = clicksito.innerText
            clicksito.addEventListener("click", () => {
                inputTextToSearch.value = texto
                getGifos(inputTextToSearch.value)
                showTermH2()
                showLineHr()
                showButtonsMore()
            })
        })
    })

/*----------------------------*/
/*       GIFOS IN TREND       */
/*----------------------------*/   
fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=3`)
    .then (response => response.json())
    .then (response => {
        let apiResponseList = response.data//esta variable trae consigo una lista, 
        //por eso cuando la usaba en otros lugares junto con .title era undefined,
        //yo queria que me dieran el titulo de todo un array. Para usar la variabla
        //luego del for le agrego [i] indicando el indice al que quiero acceder. 
       // console.log("API RESPUESTA" + apiResponseList)
        console.log(apiResponseList)
        response.data.forEach( gif => {
            const image = document.createElement("img")
            image.src = gif.images.original.url
            image.setAttribute("id", gif.id)
            document.querySelector("#newGifos").appendChild(image)
        })
             
        let imgNewGifos = document.querySelectorAll("#newGifos > img")
        imgNewGifos.forEach(imgGifosTrend => {
            imgGifosTrend.addEventListener("click", () => {

                let containerMaxGifs = document.querySelector("#containerMaxGifs")
                let containerImage = document.createElement("img")

                const anchor = document.createElement("a");
                const href = document.createAttribute("href");

                anchor.setAttributeNode(href);
                anchor.setAttribute("download", "Gifo");
                anchor.setAttribute("id", "anchorDownload")
                //anchor.setAttribute("target", "_blank")
                                                                           
                containerImage.src = imgGifosTrend.src
                containerImage.setAttribute("id", "imgMaxSize")

                let imgCross = document.createElement("img")
                imgCross.src = './assets/close.svg';
                imgCross.setAttribute("id", "imgCrossMax")
                let imgFavorite = document.createElement("img")
                imgFavorite.src = './assets/icon-fav-hover.svg';
                imgFavorite.setAttribute("id", "imgFavoriteMax")
                let imgDownload = document.createElement("img")
                imgDownload.src = './assets/icon-download-hover.svg';
                imgDownload.setAttribute("id", "imgDownloadMax")

                let idGifos = imgGifosTrend.getAttribute("id")
                for (i=0; i<apiResponseList.length; i++) {
                    console.log("indice    " + i)
                    if (idGifos === apiResponseList[i].id) {
                        const titleGifos = document.createElement("h2")
                        titleGifos.textContent = apiResponseList[i].title
                        const user = document.createElement("h3")
                        user.textContent = apiResponseList[i].username
                        document.querySelector("#containerMaxGifs").appendChild(titleGifos)
                        document.querySelector("#containerMaxGifs").appendChild(user)
                        href.value = apiResponseList[i].images.original.url
                        console.log(href)
                        break;
                    }
                } 

                anchor.appendChild(containerImage)
                containerMaxGifs.appendChild(anchor)      
                containerMaxGifs.appendChild(imgCross)
                containerMaxGifs.appendChild(imgFavorite)
                containerMaxGifs.appendChild(imgDownload)
                
                document.querySelector("#containerMaxGifs").style.display = "block"
                
                const crossMax = document.getElementById("imgCrossMax")
                console.log("crossMax    " + crossMax)
                crossMax.addEventListener("click", () => {
                    containerMaxGifs.innerHTML = "" //con esta línea evito guardar las imagenes
                    document.querySelector("#containerMaxGifs").style.display = "none"
                })

                // const downloadMax = document.getElementById("imgDownloadMax")
                // downloadMax.addEventListener("click", () => {
                
                // })
                
            })
        })    
    }) 



/*----------------------------*/
/*         DARK MODE          */
/*----------------------------*/
const changeModeStyle = (text) => { 
    if (text == "darkLogoClick") {
        isDark = true;
    }else if(text == "dayLogoClick") {
        isDark = false;
    }else if(text == "repaintStyles") {
    }else {
        if (isDark == true) {
            isDark = false;
        } else {
            isDark = true;
        }
    }
    sessionStorage.setItem("modeStyle", isDark);

    if (isDark === true) {
        document.body.classList.add("dark")
        darkMode.innerHTML = "Modo Diurno <hr>"
        document.querySelector("#cross").classList.add("off")
        document.querySelector("#crossDark").classList.add("off")
        document.querySelector("#burgerDark").classList.remove("off")
        document.querySelector("#magnifying").classList.add("off")
        document.querySelector("#magniDark").classList.remove("off")
        document.querySelector("#magnifying").classList.add("off")
        document.querySelector(".seeMore").classList.add("off")
        if (text == "darkLogoClick") {
            document.querySelector("#crossDark").classList.add("off")
            document.querySelector("#burger").classList.add("off")
            document.querySelector("#burgerDark").classList.remove("off")
        } else if (text == undefined || text == "repaintStyles") {
            document.querySelector("#menu").classList.add("off")
            document.querySelector("#crossDark").classList.add("off")
            document.querySelector("#burgerDark").classList.remove("off")
            showButtonsMore()
        }
    } else {
        document.body.classList.remove("dark")
        darkMode.innerHTML = "Modo Nocturno <hr>"
        document.querySelector("#crossDark").classList.add("off")
        document.querySelector("#burgerDark").classList.add("off")
        document.querySelector("#magnifying").classList.remove("off")
        document.querySelector("#magniDark").classList.add("off")
        document.querySelector("#cross").classList.remove("off")
        document.querySelector("#burger").classList.add("off")
        document.querySelector(".seeMoreDark").classList.add("off")
        if (text == undefined || text == "repaintStyles") {
            document.querySelector("#menu").classList.add("off")
            document.querySelector("#cross").classList.add("off") 
            document.querySelector("#burger").classList.remove("off")
            showButtonsMore()
        } else if (text == "dayLogoClick") {
            document.querySelector("#cross").classList.add("off") 
            document.querySelector("#burger").classList.remove("off")
        }
    }
}

darkMode.addEventListener("click", () => {  
    changeModeStyle()
})

logoDark.addEventListener("click", () => {
    changeModeStyle("darkLogoClick")
})

logo.addEventListener("click", () => {
    changeModeStyle("dayLogoClick")
})

changeModeStyle("repaintStyles")
/*------------------------------------------*/
/*    DARK MODE - CLICK - NAVIGATION BAR    */
/*------------------------------------------*/
crossDark.addEventListener("click", () => {
    crossDark.classList.add("off")
    document.querySelector("#crossDark").classList.remove("off")
    document.querySelector("#menu").classList.remove("off")
    document.querySelector("#magniDark").classList.add("off") 
})

hamburDark.addEventListener("click", () => {
    hamburDark.classList.add("off")
    document.querySelector("#burgerDark").classList.remove("off")
    document.querySelector("#menu").classList.add("off")
    document.querySelector("#magniDark").classList.remove("off")
})

/*------------------------------------------------------*/
/*   DARK MODE - CLICK - GIFOS FINDER - FIRST SECTION   */
/*------------------------------------------------------*/
magnifDark.addEventListener("click", () => {
    magnifDark.classList.add("off")
    document.querySelector("#crossMagniDark").classList.remove("off")
})

crossMagnifDark.addEventListener("click", () => {
    crossMagnifDark.classList.add("off")
    document.querySelector("#magniDark").classList.remove("off")
})

/*----------------------------*/
/*        GIFOS FINDER        */
/*----------------------------*/
clickMagnifying.addEventListener("click", () =>{
    if (inputTextToSearch.value !== "") {
        getGifos(inputTextToSearch.value)
        showTermH2()
        showLineHr()
        showButtonsMore()
        offH1Title()
        offIlustra_header()
        hiddenIconAnotherSearch()
        positionCross()
    } else {
        showLineHr()
        showIconAnotherSearch()
    }
})

clickMagniDark.addEventListener("click", () =>{
    if (inputTextToSearch.value !== "") {
        getGifos(inputTextToSearch.value)
        showTermH2()
        showLineHr()
        showButtonsMore()
        offH1Title()
        offIlustra_header()
        positionCross()
        hiddenIconAnotherSearch()
    } else {
        showLineHr()
        showIconAnotherSearch()
    }
})

formGifosFinder.addEventListener("submit" , (text) => {
    text.preventDefault()
    if (inputTextToSearch.value !== "") {
        getGifos(inputTextToSearch.value)
        showTermH2()
        showLineHr()
        showButtonsMore()
        hiddenIconAnotherSearch()
    } else {
        getGifos(inputTextToSearch.value)
        showTermH2()
        showLineHr()
        showIconAnotherSearch()
    }
})

const getGifos = async (textToSearch) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${textToSearch}`)
    const responseFromApi = await response.json() 
    gifosContainer.innerHTML = ""
    for (let i = 0; i < responseFromApi.pagination.count; i++)
    {
        if (i > amount) {break}
        const imageGifos = document.createElement("img")
        imageGifos.classList.add("showGifos")
        imageGifos.src = responseFromApi.data[i].images.original.url
        gifosContainer.appendChild(imageGifos)
    }
}

clickSeeMore.addEventListener("click", () => {
    clickButtonSeeMore()
}) 

clickSeeMoreDark.addEventListener("click", () => {
    clickButtonSeeMore()
})

const clickButtonSeeMore = () => {
    amount = amount + 12
    getGifos(inputTextToSearch.value)
}

const showLineHr = () => {
    lineHr.classList.remove("off")
}

const showTermH2 = () => {
    wordSearchH2.textContent = inputTextToSearch.value
    wordSearchH2.classList.remove("off")
}

const showIconAnotherSearch = () => {
    tryAnotherSearch.classList.remove("off")
    buttonSeeMore.classList.add("off")
    buttonSeeMoreDark.classList.add("off")
}

const hiddenIconAnotherSearch = () => {
    tryAnotherSearch.classList.add("off")
}

const offH1Title = () => {
    offH1.classList.add("off")
}

const offIlustra_header = () => {
    offIlustration.classList.remove("ilustra_header")
    offIlustration.classList.add("off")
}

const positionCross = () => {
    for (i = 0; i < changePositionCross.length; i++) {
        changePositionCross[i].classList.replace("search", "searchToTerm")
    }
}