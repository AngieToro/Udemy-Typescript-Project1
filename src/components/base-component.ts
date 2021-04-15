//Component Base Class
//no se instancia 
export abstract class Component<T extends HTMLElement, U extends HTMLElement>{

    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateIdElement: string, hostElementId: string, 
            insertAtStart: boolean, newElementId?: string){
                    
        this.templateElement = document.getElementById(templateIdElement)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;

        //agregar propiedades 
        if (newElementId){

            this.element.id = newElementId; //colocarle un id a la etiqueta

        }

        this.attach(insertAtStart);
    }

    //lo del plantilla en Form lo adjunta en <div id="app"></div> y es renderizado
    private attach(insertAtBeginning: boolean) {

        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin': 'beforeend', this.element)

    }

    //obliga a que todas las clases que hereden deben tener esos metodos 
    abstract configure(): void;
    abstract renderContent(): void;
}