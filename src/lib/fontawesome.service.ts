// fontawesome.service.ts
import { Injectable, inject } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import {
  faCircle as farCircle,
  faFolderOpen as farFolderOpen,
  faEye as farEye,
  faEyeSlash as farEyeSlash,
  faCalendar as farCalendar,
  faClock as farClock,
} from '@fortawesome/free-regular-svg-icons';

import {
  faXmark,
  faFolder as fasFolder,
  faCheck,
  faSearch,
  faTimes,
  faCaretDown,
  faCaretUp,
  faCalendarAlt,
  faClock as fasClock,
  faIcons,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';

const icons = [
  farCircle,
  farFolderOpen,
  farEye,
  farEyeSlash,
  farCalendar,
  farClock,
  faXmark,
  fasFolder,
  faCheck,
  faSearch,
  faTimes,
  faCaretDown,
  faCaretUp,
  faCalendarAlt,
  fasClock,
  faIcons,
  faCircleInfo,
];

@Injectable({ providedIn: 'root' })
export class FontAwesomeService {
  private library = inject(FaIconLibrary);

  constructor() {
    this.library.addIcons(...icons);
  }
}
