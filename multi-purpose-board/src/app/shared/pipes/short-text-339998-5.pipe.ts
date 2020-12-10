import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText3399985'
})
export class ShortText3399985Pipe implements PipeTransform {

  transform(value: string): string {
    return value.length > 160 ? value.substr(160, 40) : '';
  }

}
