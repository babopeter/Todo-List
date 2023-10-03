import { create } from "lodash";
import Project from "./Project";
import Task from "./Task";
import TodoList from "./TodoList";

export default class UI {
    constructor() {
        this.todoList = new TodoList();
        this.projects = this.todoList.getProjects();
    }

    load() {
        this.loadHomepage();
        this.loadEventListeners();
    }

    loadHomepage() {
        const page = document.createElement('div');
        page.classList.add('page');

        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        page.appendChild(this.createTitles());
        page.appendChild(this.createProjects());
        page.appendChild(this.createTasks());

        document.body.appendChild(page);
    }

    loadEventListeners() {
        this.projectButtonListener();
        this.taskButtonListener();
        this.addProjectFormListener();
        this.addTaskFormListener();
    }

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

    createProjects() {
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        this.projects.forEach((project) => {
            const projectItem = document.createElement('button');
            projectItem.classList.add('project-item');
            projectItem.innerHTML = project.getName();
            projectContainer.appendChild(projectItem);
        });
        projectContainer.appendChild(this.addProjectForm());
        return projectContainer;
    }

    addProjectForm() {
        const addProjectForm = document.createElement('form');
        addProjectForm.classList.add('add-project-form');

        const projectNameInput = document.createElement('input');
        projectNameInput.required = true;
        projectNameInput.classList.add('project-name-input');
        projectNameInput.setAttribute('type', 'text');
        projectNameInput.setAttribute('placeholder', 'Project Name');

        const submitProjectButton = document.createElement('button');
        submitProjectButton.classList.add('submit-project-button');
        submitProjectButton.innerHTML = "Create Project";

        addProjectForm.appendChild(projectNameInput);
        addProjectForm.appendChild(submitProjectButton);

        return addProjectForm;
    }

    addProjectFormListener() {
        const addProjectForm = document.querySelector('.add-project-form');
        addProjectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const projectName = addProjectForm.querySelector('.project-name-input').value;
            const project = new Project(projectName);
            this.projects.push(project);
            const projectContainer = document.querySelector('.project-container');
            const projectItem = document.createElement('button');
            projectItem.classList.add('project-item');
            projectItem.innerHTML = projectName;
            projectContainer.appendChild(projectItem);
            addProjectForm.querySelector('.project-name-input').value = "";
            this.refreshProjects();
            console.log(this.projects);
        });
    }

    addTaskForm() {
        const addTaskForm = document.createElement('form');
        addTaskForm.classList.add('add-task-form');

        const taskNameInput = document.createElement('input');
        taskNameInput.required = true;
        taskNameInput.classList.add('task-name-input');
        taskNameInput.setAttribute('type', 'text');
        taskNameInput.setAttribute('placeholder', 'Task Name');

        const taskDescriptionInput = document.createElement('input');
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
        submitTaskButton.innerHTML = "Create Task";

        addTaskForm.appendChild(taskNameInput);
        addTaskForm.appendChild(taskDescriptionInput);
        addTaskForm.appendChild(taskDueDateInput);
        addTaskForm.appendChild(taskPriorityInput);
        addTaskForm.appendChild(submitTaskButton);

        return addTaskForm;
    }

    addTaskFormListener() {
        const addTaskForm = document.querySelector('.add-task-form');
        addTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const taskName = addTaskForm.querySelector('.task-name-input').value;
            const taskDescription = addTaskForm.querySelector('.task-description-input').value;
            const taskDueDate = addTaskForm.querySelector('.task-due-date-input').value;
            const taskPriority = addTaskForm.querySelector('.task-priority-input').value;
            const task = new Task(taskName, taskDescription, taskDueDate, taskPriority);
            const project = this.projects[0];
            project.addTask(task);
            const taskContainer = document.querySelector('.task-container');
            const taskItem = this.createTaskItem(task);
            taskContainer.appendChild(taskItem);
            addTaskForm.querySelector('.task-name-input').value = "";
            addTaskForm.querySelector('.task-description-input').value = "";
            addTaskForm.querySelector('.task-due-date-input').value = "";
            addTaskForm.querySelector('.task-priority-input').value = "";
            this.refreshTasks();
            console.log(this.projects);
        });
    }

    createTasks() {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        const task1 = new Task("Task 1", "This is task 1", "2021-09-01", "High");
        this.projects[0].addTask(task1);

        const task2 = new Task("Task 2", "This is task 2", "2021-09-02", "Medium");
        this.projects[1].addTask(task2);

        const task3 = new Task("Task 3", "This is task 3", "2021-09-03", "Low");
        this.projects[2].addTask(task3);

        const taskItem = this.createTaskItem(task1);

        taskContainer.appendChild(taskItem);
        taskContainer.appendChild(this.addTaskForm());

        return taskContainer;
    }

    createTaskItem(task) {
        const taskItem = document.createElement('button');
        taskItem.classList.add('task-item');

        const taskName = document.createElement('div');
        taskName.classList.add('task-name');
        taskName.innerHTML = task.getName();

        taskItem.appendChild(taskName);

        const taskDueDate = document.createElement('div');
        taskDueDate.classList.add('task-due-date');
        taskDueDate.innerHTML = task.getDueDate();
        taskItem.appendChild(taskDueDate);
        

        return taskItem;
    }

    projectButtonListener() {
        const projectButtons = document.querySelectorAll('.project-item');
        projectButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const projectName = button.innerHTML;
                let project;
                this.projects.forEach((proj) => {
                    if (proj.getName() === projectName) {
                        project = proj;
                        this.switchProject(project);
                    }
                });
                console.log(project); // log project name
            });
        });
    }

    taskButtonListener() {
        const taskButtons = document.querySelectorAll('.task-item');
        taskButtons.forEach((button) => {
            button.addEventListener('click', () => {
                console.log("clicked");
            });
        });
    }

    switchProject(project) {
        const taskContainer = document.querySelector('.task-container');
        taskContainer.innerHTML = "";
        const projectTasks = project.getTasks();
        projectTasks.forEach((task) => {
            const taskItem = this.createTaskItem(task);
            taskContainer.appendChild(taskItem);
        });
        taskContainer.appendChild(this.addTaskForm());
    }

    refreshProjects() {
        const projectContainer = document.querySelector('.project-container');
        projectContainer.innerHTML = "";
        this.projects.forEach((project) => {
            const projectItem = document.createElement('button');
            projectItem.classList.add('project-item');
            projectItem.innerHTML = project.getName();
            projectContainer.appendChild(projectItem);
        });
        projectContainer.appendChild(this.addProjectForm());
        this.loadEventListeners();
    }

    refreshTasks() {
        const taskContainer = document.querySelector('.task-container');
        taskContainer.innerHTML = "";
        const project = this.projects[0];
        const projectTasks = project.getTasks();
        projectTasks.forEach((task) => {
            const taskItem = this.createTaskItem(task);
            taskContainer.appendChild(taskItem);
        });
        taskContainer.appendChild(this.addTaskForm());
        this.loadEventListeners();
    }
}