import { Component, createEffect, createMemo, createResource, createSignal, Resource, Suspense, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import Datebar from './Datebar';
import HeaderComponent from './HeaderComponent';
import HomeworkTasks from './HomeworkTasks';
import { Task } from '../models/Task';
import { gql, createQuery, useApollo } from '@merged/solid-apollo'
import { OperationVariables, TypedDocumentNode, WatchQueryOptions } from '@apollo/client';
import { BaseOptions } from 'solid-js/types/reactive/signal';
import { OwnQuery } from '../helpers/OwnQuery';
import { rawArray } from '../helpers/proxies';


const TaskQuery = gql`
query TaskQuery($date: DateTime!, $toOrFrom: Boolean!, $verified: Boolean!) {
  tasks(date: $date, toOrFrom: $toOrFrom, verified: $verified) {
    id,
    issuedAt,
    dueTo,
    subject,
    title,
    verified,
    createdAt,
    updatedAt,
    creatorId,
    updaterId,
  }
}`;

const App: Component = () => {
  const [dates, setDates] = createSignal([ new Date() ]);
  const [currentDate, setCurrentDate] = createSignal(new Date(2032, 1, 5));
  const [to, setTo] = createSignal(true);
  const [verified, setVerified] = createSignal(true);
  //const [tasks, setTasks] = createSignal<Task[]>([
  //  { verified: false, id: 'test', issuedAt: new Date(2022, 1, 25), dueTo: new Date(), subject: 'Latein', title: 'S.99 Nr 1+3', createdAt: new Date(), creatorId: 1 },
  //  { verified: true, id: 'test', issuedAt: new Date(2022, 1, 25), dueTo: new Date(), subject: 'Mathe', title: 'S.99 Nr 1+3', createdAt: new Date(), creatorId: 1 }
  //])

  const [tasks, { mutate, refetch }] = OwnQuery<Task[]>(TaskQuery, [], { variables: { date: currentDate, toOrFrom: to, verified: verified } });

  return (
    <>
      <div class="grid">
        <HeaderComponent currentDate={currentDate()} setCurrentDate={setCurrentDate}/>
        <Suspense fallback={<h1>Tasks are currently loading...</h1>}>
          <HomeworkTasks to={to} setTo={setTo} verified={verified} setVerified={setVerified} tasks={rawArray(tasks(), "tasks")} currentDate={currentDate()} refetch={refetch} />
        </Suspense>
      </div>
      <Datebar dates={dates} setCurrentDate={setCurrentDate} />
    </>
  );
};

export default App;
