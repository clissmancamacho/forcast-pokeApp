import { Person } from './person';
export interface User {
  email: string;
  password?: string;
  person?: Person;
  _id?: string;
}

// Interface Methods
function fullName() {
  return `${this.person.firstName} ${this.person.lastName}`;
}
