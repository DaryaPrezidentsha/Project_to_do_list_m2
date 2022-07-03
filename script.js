const FORM = document.querySelector('.list');
const ADD_BUTTON = document.querySelector(".add");
const ADD_CIRCLE = document.querySelector(".circle");
const SORT_BUTTON = document.querySelector('.arrow');
const DELETE_BUTTON = document.querySelector('.buttonX');

function sortFirstA(a, b) {
    if (a < b)
        return -1
}

function sortFirstZ(a, b) {
    if (b < a)
        return -1
}

function changeSortPicture(imageName, action) {
    if (action === "click") {
        if (imageName === "img/pictures/activeArrowOne.png" || imageName === "img/pictures/passiveArrowOne.png") {
            SORT_BUTTON.src = "img/pictures/activeArrowTwo.png";
        } else {
            SORT_BUTTON.src = "img/pictures/activeArrowOne.png";
        }
    }

    if (action === "over") {
        if (imageName === "img/pictures/passiveArrowOne.png") {
            SORT_BUTTON.src = "img/pictures/activeArrowOne.png";
        } else {
            if (imageName === "img/pictures/passiveArrowTwo.png") {
                SORT_BUTTON.src = "img/pictures/activeArrowTwo.png";
            }
        }
    }
    if (action === "out") {
        if (imageName === "img/pictures/activeArrowOne.png") {
            SORT_BUTTON.src = "img/pictures/passiveArrowOne.png";
        } else {
            if (imageName === "img/pictures/activeArrowTwo.png") {
                SORT_BUTTON.src = "img/pictures/passiveArrowTwo.png";
            }
        }
    }
}

function sortTasks() {
    let currentTasksArray = [];
    let currentTasksElement = document.querySelectorAll(".userInput");

    for (let taskElement of currentTasksElement) {
        currentTasksArray.push(taskElement.value);
    }

    let imageName = SORT_BUTTON.getAttribute('src');
    if (imageName === "img/pictures/activeArrowOne.png" || imageName === "img/pictures/passiveArrowOne.png") {
        currentTasksArray.sort(sortFirstA);
    } else {
        currentTasksArray.sort(sortFirstZ);
    }

    let i = 0;
    for (let taskElement of currentTasksElement) {
        taskElement.value = currentTasksArray[i];
        ++i;
    }
}


function newElement() {
    let allTasks = document.querySelector('.tasks');

    let newTask = document.createElement("input");
    newTask.type = "text";
    newTask.placeholder = "";
    newTask.className = "userInput";

    let newDeleteButton = document.createElement("img");
    newDeleteButton.src = "img/pictures/passiveX.png";
    newDeleteButton.className = "buttonX";

    //Add listeners for new elements
    newDeleteButton.addEventListener('mouseover', function() {
        newDeleteButton.src = "img/pictures/activeX.png";
    });

    newDeleteButton.addEventListener('click', function() {
        newTask.remove();
        newDeleteButton.remove();
    });

    newDeleteButton.addEventListener('mouseout', function() {
        newDeleteButton.src = "img/pictures/passiveX.png";
    });
    //End of new listeners

    allTasks.append(newTask);
    allTasks.append(newDeleteButton);

}

//Listeners for add button
ADD_BUTTON.addEventListener('mouseover', function() {
    ADD_BUTTON.style.border = "1px solid #9953F1";
    ADD_BUTTON.style['background-color'] = "#9953F1";
    ADD_CIRCLE.style['background-color'] = "#AA68FE";
});

ADD_BUTTON.addEventListener('click', newElement);

ADD_BUTTON.addEventListener('mouseout', function() {
    ADD_BUTTON.style.border = "1px solid #883AE0";
    ADD_BUTTON.style['background-color'] = "#883AE0";
    ADD_CIRCLE.style['background-color'] = "#9953F1";
});
//End of Listeners for add button

//Listeners for delete button
DELETE_BUTTON.addEventListener('mouseover', function() {
    DELETE_BUTTON.src = "img/pictures/activeX.png";
});

DELETE_BUTTON.addEventListener('click', function(e) {
    document.querySelector(".userInput").remove();
    e.target.remove();
});

DELETE_BUTTON.addEventListener('mouseout', function() {
    DELETE_BUTTON.src = "img/pictures/passiveX.png";
});
//End of Listeners for delete button

//Listeners for sortButton
SORT_BUTTON.addEventListener('mouseover', function() {
    let currentPicture = SORT_BUTTON.getAttribute('src');
    changeSortPicture(currentPicture, "over");
});

SORT_BUTTON.addEventListener('click', function() {
    let currentPicture = SORT_BUTTON.getAttribute('src');
    changeSortPicture(currentPicture, "click");
    sortTasks();
});

SORT_BUTTON.addEventListener('mouseout', function() {
    let currentPicture = SORT_BUTTON.getAttribute('src');
    changeSortPicture(currentPicture, "out");
});
//End of Listeners for sortButton