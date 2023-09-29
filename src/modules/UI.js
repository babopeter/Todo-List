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

        page.appendChild(this.createTitles());
        page.appendChild(this.createProjects());
        page.appendChild(this.createTasks());

        document.body.appendChild(page);
    }

    loadEventListeners() {
        this.projectButtonListener();
        this.taskButtonListener();
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

    createTasks() {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        const task1 = new Task("Task 1", "This is task 1", "2021-09-01", "High");
        this.projects[0].addTask(task1);

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
}