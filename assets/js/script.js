// variables for "/index.html" file 
const btnClicked = document.querySelectorAll(".btn-click");
const progressBar = document.querySelector(".progressbar");
const btn1 = document.querySelector("#btn1");
const mapDisplay = document.querySelectorAll(".map-content");
const mapBoxContainer = document.querySelector(".mapbox-container");
let previousMapId = "mapbox1";

// variables for "/images.html" file 
const imageGalleryContainer = document.querySelector(".image-gallery-container");
const imageContainerDiv = document.querySelector(".image-content");
const galleryImagesPath = "./assets/images/gallery/";
const collection = ["collection-1", "collection-2", "collection-3", "collection-4", "collection-5"];
const segregation = ["segregation-1", "segregation-2", "segregation-3", "segregation-4"];
const recycling = ["recycle-1", "recycle-2"];
const product = ["product-1", "product-2"];
const imagesArray = [collection, segregation, recycling, product];
const getBtnDataValue = {
    collection: 1,
    segregation: 2,
    recycling: 3,
    product: 4
};

// remove active class from all Btns 
const removeActive = () => {
    btnClicked.forEach((btn) => {
        btn.classList.remove("active");
    });
}

// update the progress bar width 
const updateProgressBar = (e) => {
    // get Btn tag and its data value 
    const getBtn = e.target.tagName === "IMG" ? e.target.parentElement : e.target;
    const getBtnValue = getBtn.getAttribute("data");

    // returns the progress bar width 
    const getWidth = (value) => {
        switch(value)
        {
            case '1':
                return '0px';
            case '2':
                return '140px';
            case '3':
                return '280px';
            case '4':
                return '440px';
            default:
                return '0px';
        }
    }

    // remove active class from all and add to the clicked btn 
    removeActive();
    getBtn.classList.add("active");

    // update progress bar width 
    progressBar.style.width = getWidth(getBtnValue);

    // execute functions as per webpage 
    const linkPath = window.location.pathname;
    const currentDir = linkPath.substring(linkPath.lastIndexOf('/') + 1);
    
    if(currentDir === "images.html")
        updateImageGallery(getBtnValue);  // for images.html file 
    else
        changeMapID(getBtnValue);  // for index.html file 
}

// event listener for btns 
const progressBarAnimation = btnClicked.forEach((btn) => {
    btn.addEventListener("click", updateProgressBar);
});

// set left and top position for the progress bar 
const updateProgressBarPosition = () => {
    const rect = btn1.getBoundingClientRect();
    progressBar.style.top = (rect.top + 35) + "px";
    progressBar.style.left = rect.left + "px";
}

// set left and top position for the progress bar 
window.onload = updateProgressBarPosition();
// set left and top position for the progress bar 
window.addEventListener("resize", updateProgressBarPosition);

// update images at gallery 
const updateImageGallery = (num) => {
    // get btn data value 
    const value = parseInt(num);
    
    // iterate over the object 
    for(let data in getBtnDataValue)
    {
        // if value found in object execute the fetching process and break 
        if(value === getBtnDataValue[data])
        {
            fetchImages(data, getBtnDataValue[data]);
            break;
        }
    }
}

// fetch images fileName from array and set them 
const fetchImages = (key, value) => {

    // empty the container
    imageGalleryContainer.innerHTML = '';
    // get the required array of images fileName from 2D array 
    const images = imagesArray[value - 1];
    const length = imagesArray[value - 1].length;

    // iterate over the array which contains images fileName and set them 
    for(let i = 0; i < length; i++)
    {
        // select elements from container 
        const newImage = imageContainerDiv.cloneNode(true);
        const setImage = newImage.querySelector(".imageGallery");

        // set image path, alt and append them 
        setImage.src = `./${galleryImagesPath}${images[i]}.jpeg`;
        setImage.alt = `${images[i]}`;
        imageGalleryContainer.append(newImage);
    }
}

// remove .map-active from maps and add to the selected one 
const toggleActiveMap = (maps, newID) => {
    maps.forEach((map) => {
        
        map.classList.remove("map-active");
    
        if (map.id === newID)
            map.classList.add("map-active");
    });
}

// change map 
const changeMapID = (value) => {
    
    // convert to INT 
    const newvalue = parseInt(value);
    const newID = `mapbox${newvalue}`;
    
    if (!(previousMapId === newID))
    {
        toggleActiveMap(mapDisplay, newID);
    }

    previousMapId = newID;
}

// remove active from all 
window.onload = setTimeout(() => {
    toggleActiveMap(mapDisplay, "mapbox1");
}, 600);
