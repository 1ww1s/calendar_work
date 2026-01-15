import { useEffect, useState } from 'react';
import './App.css';
import { Calendar } from './ui/calendar';
import { List } from './ui/list/List';
import { AddList } from './ui/addList/AddList';
import { IData } from './model/types';
import { MyButton } from './ui/button';
import { Record } from './ui/record/Record';

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
    <main className="main">
      <section className="calendar">
        <Calendar 
          list={list} 
          selectedId={selectedId} 
          setList={setList} 
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
        <section className="users">
          <section className="list">
            <List 
              list={list} 
              setList={setList} 
              selectedId={selectedId} 
              setSelectedId={setSelectedId} 
            />
          </section>
          <section className="add">
            <AddList 
              list={list} 
              setList={setList}
            />
          </section>
        </section>
        <Record list={list} />
      </section>
    </main>
  );
}

export default App;
