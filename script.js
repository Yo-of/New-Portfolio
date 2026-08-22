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
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

var welcomeScreen = document.getElementById("welcome");

function closeWelcomeWindow() {
    welcomeScreen.style.display = "none";
}

function openWelcomeWindow() {
    welcomeScreen.style.display = "flex";
    biggestIndex++;
    welcomeScreen.style.zIndex = biggestIndex;
}

var welcomeScreenClose = document.getElementById("welcomeClose");
var welcomeScreenOpen = document.getElementById("welcomeOpen");

welcomeScreenClose.addEventListener("click", function() {
  closeWelcomeWindow(welcomeScreen);  
});
welcomeScreenOpen.addEventListener("click", function() {
    openWelcomeWindow(welcomeScreen);
});

var selectedIcon = undefined;
var aboutWindowOpen = document.getElementById("aboutApp");
var aboutWindowClose = document.getElementById("aboutClose");
var aboutWindow = document.getElementById("about");

dragElement(document.getElementById("about"));

function selectIcon(element) {
    element.classList.add("selected");
    handleWindowTap(element);
    selectedIcon = element;
};

function deselectIcon(element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
};

function openAboutWindow() {
    aboutWindow.style.display = "flex";
    aboutWindow.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;

};

function closeAboutWindow() {
    aboutWindow.style.display = "none";
};

function handleIconClick(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element);
        openAboutWindow();
    } else {
        selectIcon(element);
    }
};

aboutWindowOpen.addEventListener("click", function() {
    handleIconClick(aboutWindowOpen);
});

aboutWindowClose.addEventListener("click", function() {
    closeAboutWindow(aboutWindow);
});

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
};

var topBar = document.getElementById("top");

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function handleWindowTap(element) {
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon)
}

welcomeScreen.addEventListener("onclick", () =>{
    handleWindowTap(welcomeScreen)
})
