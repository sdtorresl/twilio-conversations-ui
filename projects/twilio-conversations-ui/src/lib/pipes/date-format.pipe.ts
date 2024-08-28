import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | string | null): string {
    if (!value) return '';

    const date = new Date(value);
    const now = new Date();

    const isSameDay = date.toDateString() === now.toDateString();

    if (isSameDay) {
      return formatDate(date, 'h:mm', 'en-US');
    } else {
      return formatDate(date, 'MM/dd/yyyy', 'en-US');
    }
  }
}
