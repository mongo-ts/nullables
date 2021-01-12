import {
  Entity,
  NullableDate,
  NullableNumber,
  NullableString,
  getTypeForProperty,
  NullableBoolean,
  Property,
  Types,
  WithNullables,
  RemapProperties,
  getAllPropertyKeys,
} from "../src";

@WithNullables
class Person extends Entity {
  @Property
  name!: NullableString;

  @Property
  age!: NullableNumber;

  @Property
  birthday!: NullableDate;

  @Property
  is_admin!: NullableBoolean;
}

const person = new Person() as RemapProperties<Person>;

describe("Check types", () => {
  test("Correctly generate a class with a nullable string", () => {
    const type = new (getTypeForProperty(person, "name"))();
    expect(type).toBeInstanceOf(Types.NullableString);
  });

  test("Correctly generate a class with a nullable date", () => {
    const type = new (getTypeForProperty(person, "birthday"))();
    expect(type).toBeInstanceOf(Types.NullableDate);
  });

  test("Correctly generate a class with a nullable number", () => {
    const type = new (getTypeForProperty(person, "age"))();
    expect(type).toBeInstanceOf(Types.NullableNumber);
  });

  test("Correctly generate a class with a nullable bool", () => {
    const type = new (getTypeForProperty(person, "is_admin"))();
    expect(type).toBeInstanceOf(Types.NullableBoolean);
  });
});

describe("Keys", () => {
  test("Keys have some length", () => {
    const keys = getAllPropertyKeys(person);
    expect(keys.length).toBeGreaterThan(0);
  });
});
