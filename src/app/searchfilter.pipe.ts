import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter',
})
export class SearchfilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items; // Return original items if either is not provided
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter(item => {
      // Check if any property of the item contains the search term
      return Object.keys(item).some(key => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm);
        }
        return false;
      });
    });
  }
}
