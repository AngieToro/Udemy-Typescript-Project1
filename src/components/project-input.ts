import { Component } from './base-component';
//import { autobind } from '../decorators/autobind.js';
import { autobind as Autobind } from '../decorators/autobind';
//import { Validatable, validateData } from '../util/validation.js';
import * as Validation  from '../util/validation';
import { projectState } from '../state/project-state';


//ProjectInput class
// por aqui se comenzo el desarrollo
//renderiza el formulario y muestra: title, description, people, add project <- <template id="project-input">
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {

    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){

        super('project-input', 'app', true, 'user-input');
        
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
            
        this.configure();
        
    }

    configure(){
        //this.element.addEventListener('submit',this.submitHandler.bind(this));  //el bind permite aceptar las varibles de la clase
        //listener para los input del formulario y recogerlos cuando se seleccione el boton
        this.element.addEventListener('submit',this.submitHandler);  
    }

    renderContent(){
           
    };

    private collectUserInput() : [string, string, number] | void {

        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const entedredPeople = this.peopleInputElement.value;

        //valida nada mas que los valores no esten vacios pero no valida mas nada  
        /* if (enteredTitle.trim().length === 0 || enteredDescription.trim.length === 0 || entedredPeople.trim.length === 0) {
            alert("Invalid input, please try again");
            return;
        }  else {
            return [enteredTitle, enteredDescription, +entedredPeople]
        }*/

        const titleValidate: Validation.Validatable = {
            value: enteredTitle,
            required: true
        };

        const descriptionValidate: Validation.Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };

        const peopleValidate: Validation.Validatable = {
            value: +entedredPeople,
            required: true,
            minNumber: 1,
            maxNumber: 5
        }

        if (!Validation.validateData(titleValidate) || !Validation.validateData(descriptionValidate) ||  
            !Validation.validateData(peopleValidate)) {

                alert("Invalid input. Try again");
                return; //por esto se coloca el void
        
        } else {

            return [enteredTitle, enteredDescription, +entedredPeople];

        }
    }

    private clearInputs(){

        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }

    //debe activarse siempre que el formulario envie data
    @Autobind 
    private submitHandler(event: Event){

        event.preventDefault();
        //console.log(this.titleInputElement.value);
        const userInput = this.collectUserInput();

        //validar si la tupla [title, description, people] existe 
        if (Array.isArray(userInput)){

            const [title, description, people] = userInput;
            console.log("title= " + title);
            console.log("Description= " + description);
            console.log("People= ", people);

            //agregar el proyecto a la lista de proyectos
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }
}