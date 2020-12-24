import React, {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import './App.css'

const tasks = [
  {
    id: '0',
    name: 'Сделать лабораторную работу по Информационной безопасности',
  },
  {
    id: '1',
    name: 'Отредактировать курсовую работу',
  }
] 

let columnsAll = [
  {
    name: "To do", 
    items: tasks
  },
  {
    name: "In process", 
    items: []
  },
  {
    name: "Done", 
      items: []
  },
  {
    name: "Basket", 
    items: []
  }
];

const onDragEnd = (result, columns, setColumns) => {
  if(!result.destination) return;
  const {source, destination} = result;
  if(source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destinationItems = [...destinationColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destinationColumn,
        items: destinationItems
      }
    })
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    })
  }
}    
    
function addColumn(e) {
  tasks.push(2, 'NEW!');
  //window.location.reload(); 
}

function App() {
  const [columns, setColumns] = useState(columnsAll);
  

  return (
    <div>
      <h1>Board</h1>
      <p><button onClick={addColumn}>Add column</button></p>
      <p className="App" style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([id, column]) => {
            return(
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2>{column.name}</h2>
                <div style={{margin: 5}}>
                  <Droppable droppableId={id} key={id}>
                    {(provided, snapshot) => {
                      return(
                        <div {...provided.droppableProps} ref={provided.innerRef} style={{background: snapshot.isDraggingOver ? '#4C4C4C' : '#85EB6A', padding: 4, width: 400, minHeight: 650 }}>
                          {column.items.map((item, index) => {
                            return(
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => {
                                  return(
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{userSelect: 'none', padding: 16, margin: '0 0 8px 0', minHeight: '50px', backgroundColor: snapshot.isDragging ? '#9D9D9D' : '#41DB00', color: 'black', borderColor: 'black', borderWidth: '4px', borderStyle: 'double', ...provided.draggableProps.style}}>
                                    {item.name}
                                    </div>
                                  )
                                }}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                        </div>
                      )
                    }}
                  </Droppable>
                </div>
              </div>
            )
          })}
        </DragDropContext>
      </p>
    </div>
  );
}

export default App;
