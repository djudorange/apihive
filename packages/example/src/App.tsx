import React from 'react';
import { Apihive, Middleware } from 'apihive';
import koaBodyParser from 'koa-bodyparser';
import koaLogger from 'koa-logger';
import Monitoring from './components/monitoring';

function App() {
  return (
    <Apihive port={3000}>
      <Middleware use={koaBodyParser()}>
        <Middleware use={koaLogger()}>
          <Monitoring />
        </Middleware>
      </Middleware>
    </Apihive>
  );
}

export default App;
