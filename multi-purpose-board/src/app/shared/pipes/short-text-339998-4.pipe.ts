import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText3399984'
})
export class ShortText3399984Pipe implements PipeTransform {
 transform(value: string): string {
    return value.length > 120 ? value.substr(120, 40) : '';
  }

}
