import { create } from "lodash";
import Project from "./Project";
import Task from "./Task";
import TodoList from "./TodoList";

export default class UI {

    static load() {
        UI.loadHomepage();
        UI.loadEventListeners();
    }

    static loadHomepage() {
        const page = document.createElement('div');
        page.classList.add('page');
        
        page.appendChild(UI.createTitles());
        page.appendChild(UI.createProjects());
        page.appendChild(UI.createTasks());

        document.body.appendChild(page);
    }

    static loadEventListeners() {
        UI.projectButtonListener();
        UI.taskButtonListener();
    }

    static createTitles() {
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

    static createProjects() {
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        const defaultList = new TodoList();
        const defaultProjects = defaultList.getProjects();

        defaultProjects.forEach((project) => {
            const projectItem = document.createElement('button');
            projectItem.classList.add('project-item');
            projectItem.innerHTML = project.getName();
            projectContainer.appendChild(projectItem);
        });

        return projectContainer;
    }

    static createTasks() {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        const task1 = new Task("Task 1", "This is task 1", "2021-09-01", "High");

        const taskItem = document.createElement('button');
        taskItem.classList.add('task-item');

        const taskName = document.createElement('div');
        taskName.classList.add('task-name');
        taskName.innerHTML = task1.getName();

        taskItem.appendChild(taskName);


        const taskDueDate = document.createElement('div');
        taskDueDate.classList.add('task-due-date');
        taskDueDate.innerHTML = task1.getDueDate();
        taskItem.appendChild(taskDueDate);

        taskContainer.appendChild(taskItem);

        return taskContainer;
    }

    static projectButtonListener() {
        const projectButtons = document.querySelectorAll('.project-item');
        projectButtons.forEach((button) => {
            button.addEventListener('click', () => {
                console.log("clicked");
            });
        });
    }

    static taskButtonListener() {
        const taskButtons = document.querySelectorAll('.task-item');
        taskButtons.forEach((button) => {
            button.addEventListener('click', () => {
                console.log("clicked");
            });
        });
    }

}