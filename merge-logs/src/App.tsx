import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LogSource from './logsource';
import { LinkedList, LogValue } from './linkedlist';
import { IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import 'bootstrap/dist/css/bootstrap.css';




function createLogSources(logsSize: number) : Map<number, LogSource> {

  let logSources = new Map<number, LogSource>();


  for (let i = 0; i < logsSize; i++) {
    logSources.set(i, new LogSource());
  } 

  
  return logSources;

 
}


function createLinkedList(logsSize: number) {

  debugger;
  for (let i = 0; i < logsSize; i++) {
    let logSource = logSources?.get(i);
    let poppedValue = logSource?.pop() as LogValue;

    if (typeof(poppedValue) === "boolean"){
      // do nothing
    } else {
      poppedValue.index = i;
  
      if (linkedList === undefined){
        linkedList = new LinkedList(poppedValue);
      } else {
        linkedList.add(poppedValue);
      }
    }
  } 
  
}


var logSources: undefined | Map<number, LogSource> = undefined;
var linkedList: LinkedList | undefined = undefined;

function App() {
  const [logSourcesNumber, setLogSourcesNumber] = useState(1);
  const [isDone, setIsDone] = useState(false);
  
  
  function mergeSync() {
    logSources = createLogSources(logSourcesNumber);
    createLinkedList(logSourcesNumber);
    linkedList?.print();
  
  
    while ((linkedList as LinkedList).length > 0) {
  
      let minNode = linkedList?.popHead();
      console.info(minNode?.value?.date);
  
      let logSourceIndex = minNode?.value?.index as number;
      let logSource = logSources.get(logSourceIndex);
      
      if (!logSource?.drained){
        let poppedLog = logSource?.pop();
  
  
        if (poppedLog !== false){
          (poppedLog as LogValue).index = minNode?.value?.index;
          linkedList?.add(poppedLog as LogValue);
        } else {
          console.log(`Drainned LogSource ${logSourceIndex}`);
  
        }
      } else {
        console.log(`Drainned LogSource ${logSourceIndex}`);
      }
    }

    setIsDone(true);
  }

  return (
    <div className="px-4 py-5 my-5 text-center">
    <h1 className="display-5 fw-bold">Diego's Merge Logs assignement</h1>
    <div className="col-lg-6 mx-auto">
      <p className="lead mb-4">Merge N ordered LogSources. Sync and Asynch versions </p>
      <p className="lead mb-4">Linked List used to keep all popped values in order. 
      Min value always comes from linkedList head node.
      
      </p>

      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <IonInput type="number" value={logSourcesNumber} placeholder="Enter Number" onIonChange={e => setLogSourcesNumber(parseInt(e.detail.value!, 10))}></IonInput>
        <button type="button" onClick={()=> mergeSync()} className="btn btn-primary btn-lg px-4 gap-3">Merge Sync</button>
        <button type="button" className="btn btn-outline-secondary btn-lg px-4">Merge Async</button>
      </div>
      <div style={{visibility: isDone ? 'visible' : 'hidden' }} className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        Work here is done! Check logs to see ordered items
      </div>
    </div>

  </div>
  );
}

export default App;
