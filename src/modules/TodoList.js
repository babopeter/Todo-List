import Project from "./Project";
import Task from "./Task";

export default class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project("Daily Tasks"));
        this.projects.push(new Project("Weekly Tasks"));
        this.projects.push(new Project("Coding"));

        const task1 = new Task("Meditate", "Every morning for 10 minutes.", "2023-11-01", "Medium");
        const task2 = new Task("Exercise", "Every morning for 30 minutes.", "2023-11-01", "Medium");
        const task3 = new Task("Clean the house", "Every Saturday.", "2023-11-01", "Medium");
        const task4 = new Task("Do laundry", "Every Saturday.", "2023-11-01", "Medium");
        const task5 = new Task("Finish Odin Project", "Finish the curriculum.", "2023-11-01", "Medium");

        this.projects[0].addTask(task1);
        this.projects[0].addTask(task2);
        this.projects[1].addTask(task3);
        this.projects[1].addTask(task4);
        this.projects[2].addTask(task5);
    }

    getProjects() {
        return this.projects;
    }

    setProjects(newProjects) {
        this.projects = newProjects;
    }

    getProject(name) {
        return this.projects.find(project => project.getName() === name);
    }

    addProject(newProject) {
        this.projects.push(newProject);
    }

    deleteProject(project) {
        this.projects.splice(this.projects.indexOf(project), 1);
    }
}