import {
  NullableDate,
  NullableNumber,
  NullableString,
  getDesignOfProperty,
  NullableBoolean,
  Property,
  Types,
  RemapProperties,
  getAllPropertyKeys,
  getTypeOfProperty,
} from "../src";

class Person {
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

  @Property
  array!: string[];
}

const person = (new Person() as unknown) as RemapProperties<Person>;

describe("Check types", () => {
  test("Correctly generate a class with a nullable string", () => {
    const type = new (getDesignOfProperty(person, "name"))();
    expect(type).toBeInstanceOf(Types.NullableString);
  });

  test("Correctly generate a class with a nullable date", () => {
    const type = new (getDesignOfProperty(person, "birthday"))();
    expect(type).toBeInstanceOf(Types.NullableDate);
  });

  test("Correctly generate a class with a nullable number", () => {
    const type = new (getDesignOfProperty(person, "age"))();
    expect(type).toBeInstanceOf(Types.NullableNumber);
  });

  test("Correctly generate a class with a nullable bool", () => {
    const type = new (getDesignOfProperty(person, "is_admin"))();
    expect(type).toBeInstanceOf(Types.NullableBoolean);
  });

  test("Correctly get the types of all properties", () => {
    const keys = getAllPropertyKeys(person);

    const propertyTypes = keys.map((key) => {
      return getTypeOfProperty(person, key);
    });

    const expectedTypes = ["string", "number", "date", "boolean", "string", "array"];

    expect(propertyTypes.map((t) => t.type)).toEqual(expectedTypes);
  });

  test("Properties that aren't Nullable(Something) should still have correct types", () => {
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
