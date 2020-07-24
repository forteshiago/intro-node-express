const express = require("express"); //common js - uma especificação do javascript pra node

const { uuid } = require("uuidv4") // importa apenas a funcao uuid da lib

const app = express();

app.use(express.json()); //executar sempre antes das rotas

// ------------------------------------------------------------------------------

const projects = [];

// ------------------------------------------------------------------------------

app.get("/projects", (request, response) => {

    return response.json(projects);
});

app.post("/projects", (request, response) => {

    const {title, owner} = request.body;

    const project = {id: uuid(), title, owner};

    projects.push(project);

    return response.json(project);
}); 

app.put("/projects/:id", (request, response) => {

    const { id } = request.params;

    const { title, owner } = request.body;

    const projectIndex = projects.findIndex((project) => project.id == id);

    if(projectIndex < 0){
        //informar status de nao encontrado!
        return response.status(400).json({"error update":"Projeto nao encontrado!"});
    };

    const project = {
        id, 
        title, 
        owner,
    };

    projects[projectIndex] = project;

    return response.json (project);
});

app.delete("/projects/:id", (request, response) => {

    const { id } = request.params;

    const projectIndex = projects.findIndex((project) => project.id == id);

    if(projectIndex < 0){
        //informar status de nao encontrado!
        return response.status(400).json({"error delete":"Projeto nao encontrado!"});
    };

    return response.json(projects.splice(projectIndex, 1));
});

//http://localhost:3333/projects/1

const port = 3333;

app.listen(3333, () => {
    console.log(`==> Server up and running on PORT ${port} <==`);
});