import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preparationTime'
})
export class PreparationTimePipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    let result = '';

    if (hours > 0) {
      result += hours + ' שעות ';
    }

    if (minutes > 0) {
      result += minutes + ' דקות';
    }

    return result.trim();
  }
}
