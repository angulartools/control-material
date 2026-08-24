import { inject, Service } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Service({ autoProvided: false })
export class FontAwesomeSearchService {

  private library = inject(FaIconLibrary);

  async getIcons(search: string, qtd: number = 50) {
    const definitions = (this.library as any)['definitions'] || {};
    const prefixToStyle: { [key: string]: string } = {
      // fas: 'solid'
      // far: 'regular',
      fal: 'light'
      // fat: 'thin',
      // fad: 'duotone',
      // fab: 'brands'
    };

    const iconsMap: { [name: string]: { styles: string[], unicode: string } } = {};

    for (const prefix of Object.keys(definitions)) {
      const style = prefixToStyle[prefix] || prefix;
      const prefixIcons = definitions[prefix] || {};
      for (const name of Object.keys(prefixIcons)) {
        if (!iconsMap[name]) {
          iconsMap[name] = {
            styles: [],
            unicode: prefixIcons[name]?.icon?.[3] || ''
          };
        }
        if (!iconsMap[name].styles.includes(style)) {
          iconsMap[name].styles.push(style);
        }
      }
    }

    let iconNames = Object.keys(iconsMap);

    if (search && search.trim() !== '') {
      const query = search.toLowerCase().trim();
      iconNames = iconNames.filter(name => name.toLowerCase().includes(query));
    }

    const limitedNames = iconNames.slice(0, qtd);

    return {
      data: {
        search: limitedNames.map(name => {
          const iconData = iconsMap[name];
          const stylesList = iconData.styles.map(style => ({
            family: 'classic',
            style: style
          }));
          return {
            id: name,
            label: name,
            unicode: iconData.unicode,
            familyStylesByLicense: {
              pro: stylesList,
              free: stylesList
            }
          };
        })
      }
    };
  }
}
