'use strict';

import { tooltip } from './tooltip';
import { indicator } from './indicator';
import { toggleHelp } from './help-overlay';

export { toggleHelp, tooltip, indicator };

indicator.addEventListener('mouseenter', e => tooltip.reveal(e));
tooltip.addEventListener('click', () => toggleHelp(true));
