import { Accessor } from 'apihive';

function healthcheck(accessor: Accessor) {
  accessor.response('response OK');
}

healthcheck.parameters = {};

healthcheck.response = {
  200: {
    type: 'object',
    properties: {
      hello: { type: 'string' }
    }
  }
};

export { healthcheck };
