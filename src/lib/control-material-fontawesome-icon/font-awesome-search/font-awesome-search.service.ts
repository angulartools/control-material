import { inject, Service } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Service({ autoProvided: false })
export class FontAwesomeSearchService {

  private library = inject(FaIconLibrary);

  async getIcons(search: string, qtd: number = 50) {
    const definitions = (this.library as any)['definitions']?.fas || {};
    let iconNames = Object.keys(definitions);

    if (search && search.trim() !== '') {
      const query = search.toLowerCase().trim();
      iconNames = iconNames.filter(name => name.toLowerCase().includes(query));
    }

    const limitedNames = iconNames.slice(0, qtd);

    return {
      data: {
        search: limitedNames.map(name => ({
          id: name,
          label: name,
          unicode: definitions[name]?.icon?.[3] || '',
          familyStylesByLicense: {
            pro: [{ family: 'classic', style: 'solid' }],
            free: [{ family: 'classic', style: 'solid' }]
          }
        }))
      }
    };
  }
}
