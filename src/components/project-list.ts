
import { DragTarget } from '../models/drag-drop-interfaces';
import { Component } from './base-component';
import { Project, ProjectStatus } from '../models/project';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { ProjectItem } from './project-item';

//ProjectList Class
//primer parametro -> donde se quiere renderizar
//segundo parametro -> el elemento que se quiere mostrar 
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

    assignedProjects: Project[];

    constructor(private typeProyect: 'active' | 'finished'){

      super('project-list', 'app', false, `${typeProyect}-projects`);

        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent) {

        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){

            //permitri que para este elemento moverlo
            event.preventDefault();

            //cambiar de color el area en donde se puede hacer un drop
            const listElement = this.element.querySelector('ul')!;
            listElement.classList.add('droppable');

        }        
    }

    @autobind
    dropHandler(event: DragEvent) {

        const projectId = event.dataTransfer!.getData('text/plain');

        projectState.moveProjectAndChangeState(projectId, 
            this.typeProyect === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
            
    }

    @autobind
    dragLeaveHander(_: DragEvent) {
          
        //cambiar de color el area donde estaba el elemento 
        const listElement = this.element.querySelector('ul')!;
        listElement.classList.remove('droppable');
    }

    configure(){

        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHander);
        this.element.addEventListener('drop', this.dropHandler);


        //aplicar si hubo algun cambio
        projectState.addListener((listProjects: Project[]) => {
        //se filtran los proyectos segun el estatus para saber en que lista van en la interfaz grafica
            const relevantProjects = listProjects.filter(project => {

                if (this.typeProyect === 'active'){

                    return project.status === ProjectStatus.Active;
                }
                
                return project.status === ProjectStatus.Finished;
            });

            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    //llenar las etiquetas que estan dentro del <section>, como <ul> la lista y <h2> el titulo
    renderContent(){
            
        const listId = `${this.typeProyect}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.typeProyect.toUpperCase() + ' PROJECTS';
    }

    private renderProjects(){
        const listElement = document.getElementById(`${this.typeProyect}-projects-list`)! as HTMLUListElement;

        //eliminar todo lo que esta en pantalla y volver a renderizar
        //esto para evitar los duplicados
        listElement.innerHTML = '';

        for (const prjItem of this.assignedProjects){
            /* creacion de la lista de forma manualmente 
            const listItem = document.createElement('li');
            listItem.textContent = projectItem.title; // + " " + projectItem.description;
            listElement.appendChild(listItem); */

            //creacion de la lista de manera automatica
            //new ProjectItem(this.element.id, prjItem); //lo crea por fuera de la raiz de <ul>
            new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        }
    }
}