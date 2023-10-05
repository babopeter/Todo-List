import { add, create } from "lodash";
import Project from "./Project";
import Task from "./Task";
import TodoList from "./TodoList";

export default class UI {
    constructor() {
        this.initializeTodoList();
    }

    initializeTodoList() {
        this.todoList = new TodoList();
        this.projects = this.todoList.getProjects();
        this.currentProject = this.projects[0];
    }

    load() {
        this.createHomepage();
        this.setupEventListeners();
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

        document.body.appendChild(page);
    }

    // Add event listeners for project and task actions
    setupEventListeners() {
        this.projectButtonListener();
        this.taskButtonListener();
        this.addProjectFormListener();
        this.addTaskFormListener();
        this.deleteProjectListener();
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
            const projectItem = document.createElement('button');
            projectItem.classList.add('project-item');
            projectItem.classList.add(`project-item-${index}`); // add index for easier access
            projectItem.innerHTML = project.getName();
            

            const deleteProjectButton = document.createElement('button');
            deleteProjectButton.classList.add('delete-project-button');
            deleteProjectButton.innerHTML = "X";
            projectItem.appendChild(deleteProjectButton);

            projectContainer.appendChild(projectItem);
        });

        projectContainer.appendChild(this.addProjectForm());

        return projectContainer;
    }

    // Create the add project form
    addProjectForm() {
        const addProjectFormContainer = document.createElement('div');
        const toggleProjectFormButton = document.createElement('button');
        toggleProjectFormButton.classList.add('toggle-project-form-button');
        toggleProjectFormButton.innerHTML = "+";

        const addProjectForm = document.createElement('form');
        addProjectForm.classList.add('add-project-form');

        toggleProjectFormButton.addEventListener('click', () => {
            addProjectForm.classList.toggle('hidden');
        });
        

        const projectNameInput = document.createElement('input');
        projectNameInput.required = true;
        projectNameInput.classList.add('project-name-input');
        projectNameInput.setAttribute('type', 'text');
        projectNameInput.setAttribute('placeholder', 'Project Name');

        const submitProjectButton = document.createElement('button');
        submitProjectButton.classList.add('submit-project-button');
        submitProjectButton.innerHTML = "Create Project";


        addProjectFormContainer.appendChild(toggleProjectFormButton);
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

            const projectContainer = document.querySelector('.project-container');
            const projectItem = document.createElement('button');
            projectItem.classList.add('project-item');
            projectItem.classList.add(`project-item-${this.projects.length - 1}`); // -1 might not work
            projectItem.innerHTML = projectName;
            projectContainer.appendChild(projectItem);

            addProjectForm.querySelector('.project-name-input').value = "";
            
            this.refreshProjects();
            this.addProjectFormListener();
            console.log(this.projects);
        });

        
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

    // Create the task element for a given task
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

    // Add event listener for the project buttons
    projectButtonListener() {
        const projectButtons = document.querySelectorAll('.project-item');
        projectButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const projectIndex = parseInt(button.classList[1].split('-')[2]); // Extract project index from class
                const project = this.projects[projectIndex];
                
                this.currentProject = project;
                console.log(this.currentProject);
                this.switchProject(this.currentProject);
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
    }

    // Refresh the project elements
    refreshProjects() {
        const projectContainer = document.querySelector('.project-container');
        projectContainer.innerHTML = "";
        this.projects.forEach((project, index) => {
            const projectItem = document.createElement('button');
            projectItem.classList.add('project-item');
            projectItem.classList.add(`project-item-${index}`)
            projectItem.innerHTML = project.getName();

            const deleteProjectButton = document.createElement('button');
            deleteProjectButton.classList.add('delete-project-button');
            deleteProjectButton.innerHTML = "X";
            projectItem.appendChild(deleteProjectButton);

            projectContainer.appendChild(projectItem);
        });
        projectContainer.appendChild(this.addProjectForm());
        this.projectButtonListener();
        this.deleteProjectListener();
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
    }

    // Highlight the current project
    highlightCurrentProject() {
        const projectButtons = document.querySelectorAll('.project-item');
        



        projectButtons.forEach((button) => {
            const projectIndex = parseInt(button.classList[1].split('-')[2]); // Extract project index from class
            const project = this.projects[projectIndex];

            if (project.getName() === this.currentProject.getName()) {
                button.classList.add('current-project');
            } else {
                button.classList.remove('current-project');
            }
        });
    }

    //Delete the given project
    deleteProjectListener() {
        const deleteProjectButtons = document.querySelectorAll('.delete-project-button');
        deleteProjectButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const projectIndex = parseInt(button.parentElement.classList[1].split('-')[2]); // Extract project index from class
                const project = this.projects[projectIndex];
                this.todoList.deleteProject(project);
                this.refreshProjects();
                this.switchProject(this.projects[0]);
            });
        });
    }
}