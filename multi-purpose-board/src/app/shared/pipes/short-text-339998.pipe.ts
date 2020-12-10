import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText339998'
})
export class ShortText339998Pipe implements PipeTransform {

  transform(value: string): string {
    return value.length > 40 ? value.substr(0, 40) : value;
  }

}
