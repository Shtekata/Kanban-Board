import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText3399983'
})
export class ShortText3399983Pipe implements PipeTransform {

  transform(value: string): string {
    return value.length > 80 ? value.substr(80, 40) : '';
  }

}
