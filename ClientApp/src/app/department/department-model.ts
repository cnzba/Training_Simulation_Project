
//Created client side class same as server side.
export interface IDepartment {
  name: string,
  description: string
}

export class Department implements IDepartment {
  name: string;
  description: string;
}
