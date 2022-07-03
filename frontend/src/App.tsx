import { Component, createSignal } from 'solid-js';
import Datebar from './Datebar';
import HeaderComponent from './HeaderComponent';
import HomeworkTasks from './HomeworkTasks';
import { Task } from './models/Task';

const App: Component = () => {
  const [dates, setDates] = createSignal([ new Date() ]);
  const [currentDate, setCurrentDate] = createSignal(new Date(2032, 1, 5));

  const [tasks, setTasks] = createSignal<Task[]>([
    { verified: false, id: 1, issuedAt: new Date(2022, 1, 25), dueTo: new Date(), subject: 'Latein', title: 'S.99 Nr 1+3', createdAt: new Date(), creatorId: 1 },
    { verified: true, id: 2, issuedAt: new Date(2022, 1, 25), dueTo: new Date(), subject: 'Mathe', title: 'S.99 Nr 1+3', createdAt: new Date(), creatorId: 1 }
  ])

  return (
    <>
      <div class="grid">
        <HeaderComponent currentDate={currentDate}/>
        <HomeworkTasks tasks={tasks()} currentDate={currentDate()} />
      </div>
      <Datebar dates={dates} setCurrentDate={setCurrentDate} />
    </>
  );
};

export default App;
