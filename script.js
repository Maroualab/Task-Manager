let tasks = [];

document.getElementById("addTaskButton").addEventListener("click", function () {
  const taskName = document.getElementById("taskName").value;
  const deadline = document.getElementById("deadline").value;
  const description = document.getElementById("description").value;

  if (taskName && deadline) {
    const newTask = {
      id: Date.now(), //JavaScript function that returns the number of milliseconds elapsed since January 1, 1970, unique IDs
      name: taskName,
      deadline: deadline,
      description: description,
      completed: false, // Task is not completed when created
    };

    tasks.push(newTask);
    generateTasks();

    document.getElementById("taskName").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("description").value = "";
  } else {
    alert("Please enter both a task name and a deadline.");
  }
});

function generateTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card" , "show");

    const taskContent = document.createElement("div");
    taskContent.classList.add("task-card-content");
    taskContent.innerHTML = `
    <strong>Task:</strong> ${task.name} <br>
    <strong>Deadline:</strong> ${task.deadline} <br>
    ${
      task.description? `<strong>Description:</strong> ${task.description} `: ""
    }
  `;
  taskCard.appendChild(taskContent);

const taskActions =document.createElement("div");
taskActions.classList.add("task-card-actions");


    const status = document.createElement("span");
    status.classList.add("status");
    const currentDate = new Date();
    const deadlineDate = new Date(task.deadline);
    const timeDifference = deadlineDate - currentDate;
    const daysUntilDeadline = timeDifference / (1000 * 60 * 60 * 24);
    const text = document.createElement("span");
    // const statusIcon = document.createElement("i");

    if (task.completed) {
      text.innerText = "Done";
    } else if (daysUntilDeadline < 0) {
      // statusIcon.style.color = "red";
      text.innerText = "Overdue";
    } else if (daysUntilDeadline <= 2) {
      // statusIcon.style.color = "orange";
      text.innerText = "Due Soon";
    } else {
      // statusIcon.style.color = "green";
      text.innerText = "On Track";
    }
    // statusIcon.classList.add("fas", "fa-circle");

    status.appendChild(text);
    // status.appendChild(statusIcon);
  

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", function () {
  task.completed = checkbox.checked;
  generateTasks();
});

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      enterEditMode(taskCard, task);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

   // Append everything to the action section
  //  taskActions.appendChild(checkbox);
  status.appendChild(checkbox);
   taskActions.appendChild(status);
   taskActions.appendChild(editButton);
   taskActions.appendChild(deleteButton);

   // Append the icon to the status span
  //  status.appendChild(statusIcon);

   // Append action section to the task card
   taskCard.appendChild(taskContent);
   taskCard.appendChild(taskActions);

   taskList.appendChild(taskCard);

    setTimeout(() => taskCard.classList.add("show"), 10);
  }
}

function updateStatus(task, status) {
  const currentDate = new Date();
  const deadlineDate = new Date(task.deadline);

  const timeDifference = deadlineDate - currentDate;
  const daysUntilDeadline = timeDifference / (1000 * 60 * 60 * 24);

  status.innerHTML = "";
  const text = document.createElement("span");

  if (task.completed) {
    text.innerText = "Done";
  } else if (daysUntilDeadline < 0) {
    // statusIcon.style.color = "red";
    text.innerText = "Overdue";
  } else if (daysUntilDeadline <= 2) {
    // statusIcon.style.color = "orange";
    text.innerText = "Due Soon";
  } else {
    // statusIcon.style.color = "green";
    text.innerText = "On Track";
  }

  status.appendChild(text);
  // status.appendChild(statusIcon);
}

function enterEditMode(taskElement, task) {
  const taskNameField = document.createElement("input");
  taskNameField.type = "text";
  taskNameField.value = task.name;

  const taskDeadlineField = document.createElement("input");
  taskDeadlineField.type = "date";
  taskDeadlineField.value = task.deadline;

  const taskDescriptionField = document.createElement("input");
  taskDescriptionField.type = "text";
  taskDescriptionField.value = task.description;
  taskDescriptionField.setAttribute("placeholder", " add a description ...");

  taskElement.innerHTML = "";
  taskElement.appendChild(taskNameField);
  taskElement.appendChild(taskDeadlineField);
  taskElement.appendChild(taskDescriptionField);

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.onclick = function () {
    task.name = taskNameField.value;
    task.deadline = taskDeadlineField.value;
    task.description = taskDescriptionField.value;
    generateTasks();
  };

  taskElement.appendChild(saveButton);

  taskElement.style.padding = "20px";
  taskElement.style.minHeight = "auto";
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  generateTasks();
}

generateTasks();