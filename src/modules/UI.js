import { add, create, forEach } from "lodash";
import Project from "./Project";
import Task from "./Task";
import TodoList from "./TodoList";
import { el } from "date-fns/locale";
import Storage from "./Storage";

const storage = new Storage();

export default class UI {
    
    constructor() {
        this.initializeTodoList();
    }

    initializeTodoList() {
        if (localStorage.getItem("todoList")) {
            this.todoList = storage.loadTodoList();
            this.projects = this.todoList.getProjects();
            this.currentProject = this.projects[0];
        } else {
            this.todoList = new TodoList();
            this.projects = this.todoList.getProjects();
            this.currentProject = this.projects[0];
            storage.saveTodoList(this.todoList);
        }
    }

    load() {
        this.createHomepage();
        this.setupEventListeners();
        this.highlightCurrentProject();
    }

    // Create the main UI components and append them to the page element
    createHomepage() {
        const page = document.createElement('div');
        page.classList.add('page');

        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        page.appendChild(this.createTitles());
        page.appendChild(this.createProjects());
        page.appendChild(this.createTasks());
        page.appendChild(this.createResetButton());
        
        document.body.appendChild(page);
    }

    // Add event listeners for project and task actions
    setupEventListeners() {
        this.projectButtonListener();
        this.taskButtonListener();
        this.addProjectFormListener();
        this.addTaskFormListener();
        this.deleteProjectListener();
        this.deleteTaskListener();
        this.resetButtonListener();
    }

    // Create the title elements for the project and task columns
    createTitles() {
        const title = document.createElement('div');
        title.classList.add('title');

        const projectTitle = document.createElement('div');
        projectTitle.classList.add('project-title');
        projectTitle.innerHTML = "Projects";

        const taskTitle = document.createElement('div');
        taskTitle.classList.add('task-title');
        taskTitle.innerHTML = "Tasks";

        title.appendChild(projectTitle);
        title.appendChild(taskTitle);

        return title;
    }

    // Create the project elements and append them to the project container
    // Also append the add project form to the project container
    createProjects() {
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        this.projects.forEach((project, index) => {

            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');
            projectItem.classList.add(`project-item-${index}`); // add index for easier access

            const projectName = document.createElement('div');
            projectName.classList.add('project-name');
            projectName.innerHTML = project.getName();
            projectItem.appendChild(projectName);

            this.addDeleteProjectButton(projectItem);

            projectContainer.appendChild(projectItem);
        });

        projectContainer.appendChild(this.addProjectForm());

        return projectContainer;
    }

    // Add delete project button to the given project
    addDeleteProjectButton(project) {
        const deleteProjectButton = document.createElement('div');
        deleteProjectButton.classList.add('delete-project-button');
        // deleteProjectButton.classList.add("fa-regular", "fa-trash-can");
        project.appendChild(deleteProjectButton);
    }

    toggleDeleteProjectButton(project) {
        const deleteProjectButton = project.querySelector('.delete-project-button');
        deleteProjectButton.classList.toggle('hidden');
    }

    // Create the add project form
    addProjectForm() {
        const addProjectFormContainer = document.createElement('div');
        addProjectFormContainer.classList.add('add-project-form-container');

        const addProjectForm = document.createElement('form');
        addProjectForm.classList.add('add-project-form');

        const projectNameInput = document.createElement('input');
        projectNameInput.maxLength = 40;
        projectNameInput.required = true;
        projectNameInput.classList.add('project-name-input');
        projectNameInput.setAttribute('type', 'text');
        projectNameInput.setAttribute('placeholder', 'Project Name');

        const submitProjectButton = document.createElement('button');
        submitProjectButton.classList.add('submit-project-button');
        submitProjectButton.innerHTML = "+Add";

        addProjectForm.appendChild(projectNameInput);
        addProjectForm.appendChild(submitProjectButton);
        addProjectFormContainer.appendChild(addProjectForm);

        return addProjectFormContainer;
    }

    // Add event listener for the add project form
    addProjectFormListener() {
        const addProjectForm = document.querySelector('.add-project-form');
        addProjectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const projectNameInput = addProjectForm.querySelector('.project-name-input').value;
            const projectName = projectNameInput.charAt(0).toUpperCase() + projectNameInput.slice(1);

            if (this.projectNameExists(projectName)) {
                alert("Project name already exists!");
                return;
            }

            const project = new Project(projectName);
            this.todoList.addProject(project);
            storage.addProject(project); // store the project in local storage

            const projectContainer = document.querySelector('.project-container');
            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');
            projectItem.classList.add(`project-item-${this.projects.length - 1}`); // add index for easier access
            projectItem.innerHTML = projectName;
            projectContainer.appendChild(projectItem);


            this.refreshProjects();
            console.log(this.projects);
        });

        addProjectForm.querySelector('.project-name-input').value = "";

    }

    // Check if a project with the given name already exists
    projectNameExists(name) {
        return this.projects.some((project) => project.getName() === name);
    }

    // Create the add task form
    addTaskForm() {
        const addTaskForm = document.createElement('form');
        addTaskForm.classList.add('add-task-form');

        const taskNameInput = document.createElement('input');
        taskNameInput.maxLength = 60;
        taskNameInput.required = true;
        taskNameInput.classList.add('task-name-input');
        taskNameInput.setAttribute('type', 'text');
        taskNameInput.setAttribute('placeholder', 'Task Name');

        const taskDescriptionInput = document.createElement('input');
        taskDescriptionInput.maxLength = 60;
        taskDescriptionInput.classList.add('task-description-input');
        taskDescriptionInput.setAttribute('type', 'text');
        taskDescriptionInput.setAttribute('placeholder', 'Task Description');

        const taskDueDateInput = document.createElement('input');
        taskDueDateInput.required = true;
        taskDueDateInput.classList.add('task-due-date-input');
        taskDueDateInput.setAttribute('type', 'date');

        const taskPriorityInput = document.createElement('select');
        taskPriorityInput.classList.add('task-priority-input');

        const highPriority = document.createElement('option');
        highPriority.setAttribute('value', 'High');
        highPriority.innerHTML = "High";

        const mediumPriority = document.createElement('option');
        mediumPriority.setAttribute('value', 'Medium');
        mediumPriority.innerHTML = "Medium";

        const lowPriority = document.createElement('option');
        lowPriority.setAttribute('value', 'Low');
        lowPriority.innerHTML = "Low";

        taskPriorityInput.appendChild(highPriority);
        taskPriorityInput.appendChild(mediumPriority);
        taskPriorityInput.appendChild(lowPriority);

        const submitTaskButton = document.createElement('button');
        submitTaskButton.classList.add('submit-task-button');
        submitTaskButton.innerHTML = "+Add";

        addTaskForm.appendChild(taskNameInput);
        addTaskForm.appendChild(taskDueDateInput);
        addTaskForm.appendChild(submitTaskButton);
        addTaskForm.appendChild(taskDescriptionInput);
        addTaskForm.appendChild(taskPriorityInput);


        return addTaskForm;
    }

    // Add event listener for the add task form
    addTaskFormListener() {
        const addTaskForm = document.querySelector('.add-task-form');
        addTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const taskName = addTaskForm.querySelector('.task-name-input').value;
            const taskDescription = addTaskForm.querySelector('.task-description-input').value;
            const taskDueDate = addTaskForm.querySelector('.task-due-date-input').value;
            const taskPriority = addTaskForm.querySelector('.task-priority-input').value;

            const task = new Task(taskName, taskDescription, taskDueDate, taskPriority);

            this.currentProject.addTask(task);
            storage.addTask(this.currentProject, task); // store the task in local storage
            console.log(this.currentProject);

            const taskContainer = document.querySelector('.task-container');
            const taskItem = this.createTaskItem(task);
            taskContainer.appendChild(taskItem);

            addTaskForm.querySelector('.task-name-input').value = "";
            addTaskForm.querySelector('.task-description-input').value = "";
            addTaskForm.querySelector('.task-due-date-input').value = "";
            addTaskForm.querySelector('.task-priority-input').value = "";

            this.refreshTasks();
            this.addTaskFormListener();
            console.log(this.projects);
        });
    }

    // Create the default task elements and append them to the task container
    
    // createDefaultTasks() {
    //     const taskContainer = document.createElement('div');
    //     taskContainer.classList.add('task-container');

    //     // Create a demo daily task
    //     const task1 = new Task("Meditate", "Every morning for 10 minutes.", "2023-11-01", "Medium");
    //     // this.projects[0].addTask(task1);
    //     storage.addTask(this.projects[0], task1); // store the task in local storage

    //     // Create a demo weekly task
    //     const task2 = new Task("Vacuum", "Clean the whole apartment", "2024-10-28", "High");
    //     // this.projects[1].addTask(task2);
    //     storage.addTask(this.projects[1], task2); // store the task in local storage

    //     // Create a demo monthly task
    //     const task3 = new Task("Todo List", "Finish the application", "2023-11-05", "Low");
    //     // this.projects[2].addTask(task3);
    //     storage.addTask(this.projects[2], task3); // store the task in local storage

    //     const taskItem = this.createTaskItem(task1);

    //     taskContainer.appendChild(taskItem);
    //     taskContainer.appendChild(this.addTaskForm());

    //     return taskContainer;
    // }

    createTasks() {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        // create a task item for each task in the existing projects
        this.currentProject.getTasks().forEach((task) => {
            const taskItem = this.createTaskItem(task);
            taskContainer.appendChild(taskItem);
        });

        taskContainer.appendChild(this.addTaskForm());

        return taskContainer;
    }

    // Create the task element for a given task
    createTaskItem(task) {
        const index = this.currentProject.getTasks().indexOf(task);
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.classList.add(`task-item-${index}`); // add index for easier access

        const taskName = document.createElement('div');
        taskName.classList.add('task-name');
        taskName.innerHTML = task.getName();
        taskItem.appendChild(taskName);

        const taskDueDate = document.createElement('div');
        const clockIcon = document.createElement('i');
        taskDueDate.classList.add('task-due-date');
        taskDueDate.classList.add(task.evaluateDate());
        clockIcon.classList.add('fa-regular', 'fa-calendar');
        taskDueDate.innerHTML = task.getDueDate();
        taskDueDate.prepend(clockIcon);
        taskItem.appendChild(taskDueDate);

        const deleteTaskButton = document.createElement('div');
        deleteTaskButton.classList.add('delete-task-button');
        deleteTaskButton.classList.add("fa-regular", "fa-trash-can");
        taskItem.appendChild(deleteTaskButton);


        const taskDescription = document.createElement('div');
        taskDescription.classList.add('task-description');
        taskDescription.innerHTML = task.getDescription();
        taskItem.appendChild(taskDescription);


        const taskPriority = document.createElement('div');
        taskPriority.classList.add('task-priority');
        taskPriority.innerHTML = task.getPriority();
        taskItem.appendChild(taskPriority);

        return taskItem;
    }

    // Add event listener for the project buttons
    projectButtonListener() {
        const projectButtons = document.querySelectorAll('.project-item');
        projectButtons.forEach((button) => {
            button.addEventListener('click', () => { // changed to mouseup to prevent double click
                const projectIndex = parseInt(button.classList[1].split('-')[2]); // Extract project index from class
                const project = this.projects[projectIndex];

                this.currentProject = project;
                console.log(this.currentProject);
                console.log(`Clicked ${project.getName()}`); // log clicked project
                this.switchProject(this.currentProject);
                console.log(`The current project is ${this.currentProject.getName()}`); // log current project
                this.highlightCurrentProject();
            });
        });
    }

    // Add event listener for the task buttons
    taskButtonListener() {
        const taskButtons = document.querySelectorAll('.task-item');
        taskButtons.forEach((button) => {
            button.addEventListener('click', () => {
                console.log("clicked");
            });
        });
    }

    // Switch the current project to the given project
    switchProject(project) {
        const taskContainer = document.querySelector('.task-container');
        taskContainer.innerHTML = "";
        const projectTasks = project.getTasks();
        projectTasks.forEach((task) => {
            const taskItem = this.createTaskItem(task);
            taskContainer.appendChild(taskItem);
        });
        taskContainer.appendChild(this.addTaskForm());

        this.currentProject = project;
        this.highlightCurrentProject();
        this.addTaskFormListener();
        this.deleteTaskListener();

        console.log(`Switched to ${project.getName()}`); // log switched to project
    }

    // Refresh the project elements
    refreshProjects() {
        const projectContainer = document.querySelector('.project-container');
        projectContainer.innerHTML = "";
        this.projects.forEach((project, index) => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');
            projectItem.classList.add(`project-item-${index}`)
            projectItem.innerHTML = project.getName();

            this.addDeleteProjectButton(projectItem);

            projectContainer.appendChild(projectItem);
        });
        projectContainer.appendChild(this.addProjectForm());
        console.log("Refreshed projects"); // log refreshed projects
        this.projectButtonListener();
        this.deleteProjectListener();
        this.addProjectFormListener();
        this.deleteTaskListener();
    }

    // Refresh the task elements
    refreshTasks() {
        const taskContainer = document.querySelector('.task-container');
        taskContainer.innerHTML = "";

        this.currentProject.getTasks().forEach((task) => {
            const taskItem = this.createTaskItem(task);
            taskContainer.appendChild(taskItem);
        });

        taskContainer.appendChild(this.addTaskForm());
        this.taskButtonListener();
        this.deleteTaskListener();
    }

    // Highlight the current project
    highlightCurrentProject() {
        const projectButtons = document.querySelectorAll('.project-item');

        projectButtons.forEach((button) => {
            const projectIndex = parseInt(button.classList[1].split('-')[2]); // Extract project index from class
            const project = this.projects[projectIndex];
            const deleteProjectButton = button.querySelector('.delete-project-button');

            if (project.getName() === this.currentProject.getName()) {
                button.classList.add('current-project');
                deleteProjectButton.classList.add('fa-regular', 'fa-trash-can');

            } else {
                button.classList.remove('current-project');
                deleteProjectButton.classList.remove('fa-regular', 'fa-trash-can');
            }
        });
    }

    //Delete the given project
    deleteProjectListener() {
        const deleteProjectButtons = document.querySelectorAll('.delete-project-button');
        deleteProjectButtons.forEach((button) => {
            button.addEventListener('click', () => {

                console.log("Delete project clicked"); // log delete project clicked
                const projectIndex = parseInt(button.parentElement.classList[1].split('-')[2]); // Extract project index from class
                const project = this.projects[projectIndex];
                this.todoList.deleteProject(project);
                storage.deleteProject(project); // delete the project from local storage
                this.refreshProjects();
                this.currentProject = this.projects[0];
                this.refreshTasks();
                this.highlightCurrentProject();
            });
        });
    }

    // Delete the given task
    deleteTaskListener() {
        const deleteTaskButtons = document.querySelectorAll('.delete-task-button');
        deleteTaskButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const taskIndex = parseInt(button.parentElement.classList[1].split('-')[2]); // Extract task index from class
                const task = this.currentProject.getTasks()[taskIndex];
                this.currentProject.deleteTask(task);
                storage.deleteTask(this.currentProject, task); // delete the task from local storage
                this.refreshTasks();
            });
        });
    }

    createResetButton() {
        const resetButton = document.createElement('button');
        resetButton.classList.add('reset-button');
        resetButton.innerHTML = "Clear Local Storage";

        return resetButton;
    }

    resetButtonListener() {
        const resetButton = document.querySelector('.reset-button');
        resetButton.addEventListener('click', () => {
            localStorage.clear();
            console.log("Local storage cleared");
        });
    }
}