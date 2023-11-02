export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }

    getTasks() {
        return this.tasks;
    }

    setTasks(newTasks) {
        this.tasks = newTasks;
    }

    addTask(newTask) {
        this.tasks.push(newTask);
    }

    deleteTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
    }
}