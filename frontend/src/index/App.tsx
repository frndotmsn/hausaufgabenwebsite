import { Component, createEffect, createMemo, createResource, createSignal, Resource, Suspense, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import Datebar from './Datebar';
import HeaderComponent from './HeaderComponent';
import HomeworkTasks from './HomeworkTasks';
import { Task } from '../models/Task';
import { gql } from '@merged/solid-apollo'
import { OperationVariables, QueryOptions, TypedDocumentNode, WatchQueryOptions } from '@apollo/client';
import { BaseOptions } from 'solid-js/types/reactive/signal';
import { OwnQuery } from '../helpers/OwnQuery';
import { rawArray } from '../helpers/proxies';
import { client } from '.';


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
  const [currentDate, setCurrentDate] = createSignal(new Date(2032, 1, 5));
  const [to, setTo] = createSignal(true);
  const [verified, setVerified] = createSignal(true);

  const [tasks, { mutate, refetch }] = OwnQuery<Task[]>(TaskQuery, [], { variables: { date: currentDate, toOrFrom: to, verified: verified } });

  return (
    <>
      <div class="grid">
        <HeaderComponent currentDate={currentDate()} setCurrentDate={setCurrentDate}/>
        <Suspense fallback={<h1>Tasks are currently loading...</h1>}>
          <HomeworkTasks to={to} setTo={setTo} verified={verified} setVerified={setVerified} tasks={rawArray(tasks(), "tasks")} currentDate={currentDate()} refetch={refetch} />
        </Suspense>
      </div>
      <Datebar currentDate={currentDate()} setCurrentDate={setCurrentDate} />
    </>
  );
};

export default App;
