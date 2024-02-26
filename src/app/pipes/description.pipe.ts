import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description',
  standalone: true
})
export class DescriptionPipe implements PipeTransform {

  transform(description: string, nbChars: number): string {
    return description.substring(nbChars) + '...';
  }

}
