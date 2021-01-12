## `nullables`

A way to specify nullable types in TypeScript whilst still getting the correct data at runtime.

#### Usage

```ts
import { Property, NullableString, RemapProperties } from 'nullables';

class Person {
  @Property
  email!: string;

  @Property
  age!: number;

  @Property
  first_name!: NullableString;
}

// Remap properties to now have correct types at compile/dev time
// but maintain String at runtime (with the knowledge of it being nullable)
const person = new Person() as RemapProperties<Person>;

person.age; // => number
person.first_name; // => string | null
person.email; // => string
```
