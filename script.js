var biggestIndex = 1;

setInterval(function() {
    document.getElementById('timeElement').innerHTML = new Date().toLocaleString();
}, 1000);

dragElement(document.getElementById("welcome"));

function dragElement(element) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    var navbarHeight = document.querySelector('.top-bar').offsetHeight;


    if (document.getElementById(element.id + "Header")) {
        document.getElementById(element.id + "Header").onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
    }

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;
    }

    function dragElement(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;

        var newTop = element.offsetTop - currentY;
        var newLeft = element.offsetLeft - currentX;

        var rect = element.getBoundingClientRect();
        var offsetDiffTop = rect.top - element.offsetTop;
        var offsetDiffLeft = rect.left - element.offsetLeft;

        var maxTop = window.innerHeight - element.offsetHeight - offsetDiffTop;
        var minTop = navbarHeight - offsetDiffTop;
        newTop = Math.max(minTop, Math.min(newTop, maxTop));

        var maxLeft = window.innerWidth - element.offsetWidth - offsetDiffLeft;
        var minLeft = 0 - offsetDiffLeft;
        newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));

        element.style.top = newTop + "px";
        element.style.left = newLeft + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

var welcomeScreen = document.getElementById("welcome");

function openWindow(element) {
    element.style.display = "flex";
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
}

var welcomeScreenClose = document.getElementById("welcomeClose");
var welcomeScreenOpen = document.getElementById("welcomeOpen");

function closeWindow(element){
    document.getElementById(element.id + "Close").addEventListener("click", function() {
    element.style.display = "none";
})
} 

welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
});

var selectedIcon = undefined;
var aboutWindowOpen = document.getElementById("aboutApp");
var aboutWindowClose = document.getElementById("aboutClose");
var aboutWindow = document.getElementById("about");

function selectIcon(element) {
    element.classList.add("selected");
    handleWindowTap(element);
    selectedIcon = element;
};

function deselectIcon(element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
};

function handleIconClick(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element);
        openWindow(element);
    } else {
        selectIcon(element);
    } 
};

aboutWindowOpen.addEventListener("click", function() {
    handleIconClick(aboutWindowOpen);
});

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
};

var topBar = document.getElementById("top");

var IndexAbout = 1;
var IndexWelcome = 1;

function handleWindowTap(element) {
  biggestIndex++;  
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 2;
  deselectIcon(selectedIcon)
}

function topWindow(element) {
    element.addEventListener("mousedown", () =>{
    handleWindowTap(element)
})
}

function windowInteraction(element) {
    dragElement(element);
    closeWindow(element);
    topWindow(element);
}

windowInteraction(welcome);
windowInteraction(aboutWindow);