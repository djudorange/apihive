import * as infos from '../../package.json';

export function init() {
  console.info(`\n  ▄▀█ █▀█ █ █ █ █ █ █ █▀▀ 
  █▀█ █▀▀ █ █▀█ █ ▀▄▀ ██▄  v${(<any>infos).version} \n`);
}

export function create(
  name: string = 'N/A',
  description: string = 'N/A',
  version: string = 'N/A'
) {
  console.info(`Application ${name} v${version}`);
  console.info(`Description: ${description}`);
}

export function listen(port: number) {
  console.info(
    `listening on port ${port}. You can access on http://127.0.0.1:${port}`
  );
}
