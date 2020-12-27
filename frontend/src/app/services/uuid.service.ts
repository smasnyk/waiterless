import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UuidService {

  constructor() { }

  generateName(file: File): string {
    let name = uuid();
    const strings = file.name.split('.');
    return name + '.' + strings.pop();
  }
}
