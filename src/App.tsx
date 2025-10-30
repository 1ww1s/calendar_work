import { useEffect, useState } from 'react';
import './App.css';
import { Calendar } from './ui/calendar';
import { List } from './ui/list/List';
import { AddList } from './ui/addList/AddList';
import { IData } from './model/types';
import { MyButton } from './ui/button';
import { Import } from './ui/import';
import { ExportComponent } from './ui/export';
import { ImportBackImage } from './ui/importBackImage';

function App() {

  const listInit: IData[] = JSON.parse(localStorage.getItem('list') || '[]')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [list, setList] = useState<IData[]>(listInit)

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  useEffect(() => {
    if(!localStorage.getItem('calendar_work')){
      localStorage.setItem('calendar_work', "{}")
    }
  }, [])

  return (
    <section className="App">
      <main className="main">
        <section className="calendar">
          <Calendar 
            list={list} 
            selectedId={selectedId} 
          />
          {
            selectedId
              &&
            <MyButton 
              onClick={() => setSelectedId(null)}
            >
              Убрать режим выделения
            </MyButton>
          }
        </section>
        <section className="right">
          <section className="list">
            <List 
              list={list} 
              setList={setList} 
              selectedId={selectedId} 
              setSelectedId={setSelectedId} 
            />
          </section>
          <section>
            <AddList 
              list={list} 
              setList={setList}
            />
          </section>
          <section className="files">
            <ExportComponent />
            <Import
              setList={setList} 
            />
            <ImportBackImage />
          </section>
        </section>
      </main>
    </section>
  );
}

export default App;
