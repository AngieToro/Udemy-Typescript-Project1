import { Project, ProjectStatus } from '../models/project';

//Project State Managment
//singleton
type Listener<T> = (items: T[]) => void;

class State<T> {

    protected listeners: Listener<T>[] = [];

    //Se encarga de escuchar cuando hubo un cambio, para poder agregar el proyecto a la lista
    addListener(listenerFn: Listener<T>) {

        this.listeners.push(listenerFn);
    }
}

export class ProjectState extends State<Project> {
    
    private projects: Project[] = [];
    private static instance: ProjectState;  //singleton
    
    private constructor() { 

        super();
    }

    static getInstance(){
            
        //si se tiene, se obtiene
        if (this.instance) {
            return this.instance;
        }

        //sino se crea
        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number){

        const id = Math.random.toString();
        const newProject = new Project(id, title, description,
        numOfPeople, ProjectStatus.Active);

        this.projects.push(newProject);
        this.updateListerners();
            
    }


    //mover el iteem y cambiar el estado de un proyecto this.updateListerners();
    moveProjectAndChangeState(projectId: string, newStatus: ProjectStatus){

        const project = this.projects.find(prj => prj.id === projectId);

        //si projecto existe y si projecto no tiene su mismo estado
        //esto es por si el item se mueve en su propia caja y asi evitar una renderizacion extra  
        if (project && project.status !== newStatus) {

            project.status = newStatus;
            this.updateListerners();
        }
    }

    private updateListerners() {

        for (const listenerFn of this.listeners){

            listenerFn(this.projects.slice())   //extrae la seccion especificada en () y retorna un nuevo array. en este caso es completo
        }
    }
}

    //enlazar la creacion del Proyecto con la Lista de Proyectos Activos
    //se asegura tener siempre el mismo objeto tipo Project en toda la aplicacion 
    export const projectState = ProjectState.getInstance();