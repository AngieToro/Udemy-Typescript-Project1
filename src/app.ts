import { ProjectInput } from './components/project-input';
import { ProjectList } from './components/project-list';

console.log("Hello");

//mostrar el form de Project Input 
new ProjectInput();

//mostrar las secctions de Project List
new ProjectList('active');
new ProjectList('finished');