'use strict';

import paths from '../paths';
import del from 'del';

export default function clean() {
  return del(paths.clean);
};