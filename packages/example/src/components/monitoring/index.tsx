import React from 'react';
import { Router, Route, Response, ErrorResponse } from 'apihive';
import { healthcheck } from './monitoringController';

function Monitoring() {
  return (
    <Router>
      <Route method="get" path="/monitoring/status" controller={healthcheck}>
        <Response status={204} />
        <ErrorResponse name="StopMachine" status={403}>
          Stop the machine down !
        </ErrorResponse>
      </Route>

      <Route method="get" path="/monitoring/healthcheck">
        <Response status={200}>Yess</Response>
      </Route>
    </Router>
  );
}

export default Monitoring;
