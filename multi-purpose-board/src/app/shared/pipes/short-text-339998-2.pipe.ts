import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText3399982'
})
export class ShortText3399982Pipe implements PipeTransform {

   transform(value: string): string {
    return value.length > 40 ? value.substr(40, 40) : '';
  }

}
