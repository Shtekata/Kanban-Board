import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTextTitle'
})
export class ShortTextTitlePipe implements PipeTransform {

  transform(value: string): string {
    return value.length > 35 ? value.substr(0, 35) : value;
  }

}
