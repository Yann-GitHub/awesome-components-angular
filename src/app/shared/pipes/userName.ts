import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userName',
  standalone: true,
})
export class UserNamePipe implements PipeTransform {
  transform(
    value: { lastName: string; firstName: string },
    locale: 'en' | 'fr' = 'fr'
  ): string {
    return locale === 'fr'
      ? `${value.lastName.toUpperCase()} ${this.capitalize(value.firstName)}`
      : `${this.capitalize(value.firstName)} ${value.lastName.toUpperCase()}`;
  }

  private capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
