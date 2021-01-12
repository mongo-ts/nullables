import {
  Entity,
  NullableDate,
  NullableNumber,
  NullableString,
  getInstanceOfProperty,
  NullableBoolean,
  Property,
  Types,
  RemapProperties,
  getAllPropertyKeys,
  getTypeOfProperty,
} from "../src";

class Person extends Entity {
  @Property
  name!: NullableString;

  @Property
  age!: NullableNumber;

  @Property
  birthday!: NullableDate;

  @Property
  is_admin!: NullableBoolean;

  @Property
  non_nullable_property!: string;
}

const person = new Person() as RemapProperties<Person>;

describe("Check types", () => {
  test("Correctly generate a class with a nullable string", () => {
    const type = new (getInstanceOfProperty(person, "name"))();
    expect(type).toBeInstanceOf(Types.NullableString);
  });

  test("Correctly generate a class with a nullable date", () => {
    const type = new (getInstanceOfProperty(person, "birthday"))();
    expect(type).toBeInstanceOf(Types.NullableDate);
  });

  test("Correctly generate a class with a nullable number", () => {
    const type = new (getInstanceOfProperty(person, "age"))();
    expect(type).toBeInstanceOf(Types.NullableNumber);
  });

  test("Correctly generate a class with a nullable bool", () => {
    const type = new (getInstanceOfProperty(person, "is_admin"))();
    expect(type).toBeInstanceOf(Types.NullableBoolean);
  });

  test("Correctly get the types of all properties", () => {
    const keys = getAllPropertyKeys(person);
    const [name, age, birthday, is_admin] = keys.map((key) => getTypeOfProperty(person, key)).map((t) => t.type);
    expect([name, age, birthday, is_admin]).toEqual(["string", "number", "date", "boolean"]);
  });

  test("Properties that aren't NullableX should still have correct types", () => {
    const type = getTypeOfProperty(person, "non_nullable_property");

    expect(type).toEqual({
      type: "string",
      nullable: false,
    });
  });
});

describe("Keys", () => {
  test("Keys have some length", () => {
    const keys = getAllPropertyKeys(person);
    expect(keys.length).toBeGreaterThan(0);
  });
});
