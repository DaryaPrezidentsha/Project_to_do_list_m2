const FORM = document.querySelector('.list');
const ADD_BUTTON = document.querySelector('.add');

function upadteTaskList() {
    let allTask = document.querySelectorAll('.form');
    for (const task of allTask) {
        task.draggable = true;
    }
}

function mouseInButtons(e) {
    let className = e.target.className;
    let image;
    if (className === "buttonX") {
        image = document.getElementById(e.target.attributes[1].value);
        image.src = "activeX.png";
    } else {
        if (className === "arrow") {
            image = document.getElementById(e.target.attributes[1].value);
            if (image.getAttribute('src') === "passiveArrowOne.png") {
                image.src = "activeArrowOne.png";
            } else {
                if (image.getAttribute('src') === "passiveArrowTwo.png") {
                    image.src = "activeArrowTwo.png";
                }
            }
        } else {
            if (className === "textAdd" || className === "plus" || className === "add") {
                document.styleSheets[0].cssRules[11].style.border = "1px solid #9953F1";
                document.styleSheets[0].cssRules[11].style['background-color'] = "#9953F1";
                document.styleSheets[0].cssRules[13].style['background-color'] = "#AA68FE";
            }
        }
    }
}

function mouseOutButtons(e) {
    let className = e.target.className;
    let image;
    if (className === "buttonX") {
        image = document.getElementById(e.target.attributes[1].value);
        image.src = "passiveX.png";
    } else {
        if (className === "arrow") {
            image = document.getElementById(e.target.attributes[1].value);
            if (image.getAttribute('src') === "activeArrowOne.png") {
                image.src = "passiveArrowOne.png";
            } else {
                if (image.getAttribute('src') === "activeArrowTwo.png") {
                    image.src = "passiveArrowTwo.png";
                }
            }
        } else {
            if (className === "textAdd" || className === "plus" || className === "add") {
                document.styleSheets[0].cssRules[11].style.border = "1px solid #883AE0";
                document.styleSheets[0].cssRules[11].style['background-color'] = "#883AE0";
                document.styleSheets[0].cssRules[13].style['background-color'] = "#9953F1";
            }
        }
    }
}

function mouseClick(e) {
    function sortFirstA(a, b) {
        if (a < b)
            return -1
        if (a > b)
            return 1
        return 0
    }

    function sortFirstZ(a, b) {
        if (b < a)
            return -1
        if (b > a)
            return 1
        return 0
    }
    let className = e.target.className;
    let image;
    if (className === "arrow") {
        //Для смены изображения сортировки
        image = document.getElementById(e.target.attributes[1].value);
        let currentTasksArray = [];
        let currentTasksElement = document.getElementsByTagName("input");

        for (let taskElement of currentTasksElement) {
            currentTasksArray.push(taskElement.value);
        }

        let imageName = image.getAttribute('src');
        if (imageName === "activeArrowOne.png" || imageName === "passiveArrowOne.png") {
            currentTasksArray.sort(sortFirstZ);
            image.src = "activeArrowTwo.png";
        } else {
            currentTasksArray.sort(sortFirstA);
            image.src = "activeArrowOne.png";
        }
        let i = 0;
        for (let taskElement of currentTasksElement) {
            taskElement.value = currentTasksArray[i];
            ++i;
        }
    } else {
        if (className === "textAdd" || className === "plus" || className === "add") {
            newElement();
        } else {
            if (className === "buttonX") {
                deleteTask(e.target.attributes[1].value);
            }
        }
    }
}

FORM.addEventListener('mouseover', mouseInButtons);
FORM.addEventListener('click', mouseClick);
FORM.addEventListener('mouseout', mouseOutButtons);
FORM.addEventListener('keydown', addIfEnter);
document.addEventListener("DOMContentLoaded", ready);

function addIfEnter(e) {
    if (e.key === "Enter") {
        newElement();
    }
}

function ready() {
    document.getElementById('textTask1').focus();
}


let buttonDeleteTaskNextNumber = 2;
let textTaskNextNumber = 2;

function updateSize(operation) {
    let currentHeightWithPX = document.styleSheets[0].cssRules[1].style.getPropertyValue("height"),
        currentHeightNumber = Number(currentHeightWithPX.replace("px", ""));
    let newHeight;
    if (operation === "Add") {
        newHeight = (currentHeightNumber + 45) + "px";
    } else {
        newHeight = (currentHeightNumber - 45) + "px";
    }
    document.styleSheets[0].cssRules[1].style.height = newHeight;
    upadteTaskList();
}

function newElement() {
    let currentNumberTasks = textTaskNextNumber - 1;
    let allTasks = document.getElementById('tasksId');
    let currentTextField = document.getElementById("textTask" + currentNumberTasks);
    let localNumber = textTaskNextNumber;
    while (!Boolean(currentTextField)) {
        localNumber -= 1;
        currentTextField = document.getElementById("textTask" + localNumber);
    }

    let currentTaskName = currentTextField.value;

    let newTask = document.createElement("li");
    newTask.innerHTML += "<form class='form' onsubmit='return false'><input type='text' placeholder='' id= 'textTask" + textTaskNextNumber + "'class='userInput'><img src='passiveX.png' id='buttonDeleteTask" + buttonDeleteTaskNextNumber + "'class='buttonX'></form>";


    buttonDeleteTaskNextNumber += 1;
    textTaskNextNumber += 1;
    updateSize("Add");

    allTasks.append(newTask);

    let currentTask = document.getElementById('textTask' + (textTaskNextNumber - 1));
    currentTask.focus();
}

function deleteTask(currentDeleteButtonId) {
    let allTasks = document.getElementById('tasksId');
    let nubmberOfTasks = allTasks.childNodes.length - 2;
    //Проверяем является ли наш элемент единственным в списке
    if (nubmberOfTasks === 1) {
        alert("Может не стоит бросать список дел?)");
    } else {
        //Получаем элемент кнопки по ID, для дальнейшей работы
        let currentDeleteButton = document.getElementById(currentDeleteButtonId);
        updateSize("Delete");
        //Так как у нас сам узел располагается выше, достаем его через двух родителей
        allTasks.removeChild(currentDeleteButton.parentElement.parentElement);
    }
}