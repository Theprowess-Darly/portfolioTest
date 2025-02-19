// Charger les projets depuis le stockage local
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = ''; // Réinitialiser la liste

    projects.forEach((project, index) => {
        const li = document.createElement('li');
        li.className = 'project-item';
        li.innerHTML = `
            <div>
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <p><strong>Date:</strong> ${project.date}</p>
            </div>
            <div>
                <button style="background-color:orange;" onclick="editProject(${index})">Modifier</button>
                <button onclick="deleteProject(${index})">Supprimer</button>
            </div>
        `;
        projectsList.appendChild(li);
    });
}

// Ajouter un nouveau projet
function addProject() {
    const name = document.getElementById('projectName').value;
    const description = document.getElementById('projectDescription').value;
    const date = document.getElementById('projectDate').value;

    if (name && description && date) {
        const newProject = { name, description, date };
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.push(newProject);
        localStorage.setItem('projects', JSON.stringify(projects));

        // Réinitialiser les champs du formulaire
        document.getElementById('projectName').value = '';
        document.getElementById('projectDescription').value = '';
        document.getElementById('projectDate').value = '';

        loadProjects();
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}

// Modifier un projet
function editProject(index) {
    const projects = JSON.parse(localStorage.getItem('projects'));
    const project = projects[index];

    const newName = prompt("Modifier le nom du projet", project.name);
    const newDescription = prompt("Modifier la description du projet", project.description);
    const newDate = prompt("Modifier la date du projet", project.date);

    if (newName && newDescription && newDate) {
        projects[index] = { name: newName, description: newDescription, date: newDate };
        localStorage.setItem('projects', JSON.stringify(projects));
        loadProjects();
    }
}

// Supprimer un projet
function deleteProject(index) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
        const projects = JSON.parse(localStorage.getItem('projects'));
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        loadProjects();
    }
}

// Événement pour ajouter un projet
document.getElementById('addProjectBtn').addEventListener('click', addProject);

// Charger les projets à l'initialisation
loadProjects();