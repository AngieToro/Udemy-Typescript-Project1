 //Drag & Drop Interfaces

//todo elemento que puede moverse
export interface Draggable {

    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;

}

 //la caja sobre la cual se puede arrastrar algo
export interface DragTarget{

    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHander(event: DragEvent): void;

}