// build your `Project` model here
const db = require('../../data/dbConfig')

async function getProjects() {
    const results = await db('projects as p')
        .select('p.project_id', 'p.project_name', 'p.project_description', 'p.project_completed')
        
    const projects = []

    results.forEach(result => {
        projects.push({
            project_id: result.project_id,
            project_name: result.project_name,
            project_description: result.project_description,
            project_completed: Boolean(result.project_completed)
        })
    });
    
    return projects
}

async function addProject(project) {
    const results = await db('projects as p').insert(project)

    let newProject = await db('projects as p')
    .select(
        'p.project_id', 
        'p.project_name', 
        'p.project_description', 
        'p.project_completed'
        )
    .where('p.project_id', results)
    .first()

    newProject = {
        ...newProject,
        project_completed: Boolean(newProject.project_completed)
    }
    
    return newProject
}

module.exports = {
    getProjects,
    addProject,
};