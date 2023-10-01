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
        // page.appendChild(this.createProjectButton());
        page.appendChild(this.addProjectForm());

        document.body.appendChild(page);
    }

    loadEventListeners() {
        this.projectButtonListener();
        this.taskButtonListener();
        // this.addProjectListener();
        this.addProjectFormListener();
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

        return projectContainer;
    }

    // createProjectButton() {
    //     const addProjectButton = document.createElement('button');
    //     addProjectButton.classList.add('add-project-button');
    //     addProjectButton.innerHTML = "Add Project";
    //     return addProjectButton;
    // }

    addProjectForm() {
        const addProjectForm = document.createElement('form');
        addProjectForm.classList.add('add-project-form');

        const projectNameInput = document.createElement('input');
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
    }

    // addProjectListener() {
    //     const addProjectButton = document.querySelector('.add-project-button');
    //     addProjectButton.addEventListener('click', () => {
    //         const projectContainer = document.querySelector('.project-container');
    //         const projectItem = document.createElement('button');
    //         projectItem.classList.add('project-item');
    //         projectItem.innerHTML = "New Project";
    //         projectContainer.appendChild(projectItem);
    //     });
    // }
}