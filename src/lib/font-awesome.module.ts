import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { 
  faCircle as farCircle,
  faFolderOpen as farFolderOpen,
  faEye as farEye,
  faEyeSlash as farEyeSlash,
  faCalendar as farCalendar,
  faClock as farClock
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
  faClock as fasClock
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
  fasClock
];

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule]
})
export class FontAwesomeSharedModule {
  constructor(library: FaIconLibrary) {
    // Adiciona os ícones à biblioteca no construtor do módulo
    library.addIcons(...icons);
  }
}
