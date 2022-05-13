import * as Comlink from 'comlink';

import { markdown } from './markdown';
import { task } from './task';

Comlink.expose({ markdown, task });
