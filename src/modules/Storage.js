import Project from "./Project";
import Task from "./Task";
import TodoList from "./TodoList";

export default class Storage {
    saveTodoList(todoList) {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }

    loadTodoList() {
        const todoList = Object.assign(new TodoList(), 
        JSON.parse(localStorage.getItem("todoList")));

        todoList.setProjects(todoList.getProjects().map(project =>
            Object.assign(new Project(), project)));

        todoList.getProjects().forEach(project => {
            project.setTasks(project.getTasks().map(task =>
                Object.assign(new Task(), task)));
        });

        return todoList;
    }

    addProject(project) {
        const todoList = this.loadTodoList();
        todoList.addProject(project);
        this.saveTodoList(todoList);
    }

    deleteProject(project) {
        const todoList = this.loadTodoList();
        todoList.getProjects().forEach(projectInList => {
            if (projectInList.getName() === project.getName()) {
                todoList.deleteProject(projectInList);
            }
        });
        this.saveTodoList(todoList);
    }

    addTask(project, task) {
        const todoList = this.loadTodoList();
        todoList.getProject(project.getName()).addTask(task);
        this.saveTodoList(todoList);
    }

    deleteTask(task) {
        const todoList = this.loadTodoList();
        todoList.getProjects().forEach(project => {
            project.getTasks().forEach(taskInProject => {
                if (taskInProject.getName() === task.getName()) {
                    project.deleteTask(taskInProject);
                }
            });
        });
        this.saveTodoList(todoList);
    }
}