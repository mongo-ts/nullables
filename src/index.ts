import "reflect-metadata";

import {
  availableTypes,
  Entity,
  NullableBoolean,
  NullableDate,
  NullableNumber,
  NullableString,
  Types,
} from "./structs";

export const reflectionKeys = { classKeys: "ts:nullables:keys" };

export const Property: PropertyDecorator = (target, property) => {
  const { type, nullable } = getTypeOfProperty(target, property as keyof typeof target);

  if (nullable && !((availableTypes as unknown) as string[]).includes(type)) {
    throw new Error(`You must use either ${availableTypes.join(", ")}. You passed ${type}`);
  }

  const existing = Reflect.getMetadata(reflectionKeys.classKeys, target) || [];
  Reflect.defineMetadata(reflectionKeys.classKeys, [...existing, property], target);
};

export function getAllPropertyKeys<T extends Object>(target: T): (keyof T)[] {
  return Reflect.getMetadata(reflectionKeys.classKeys, target) || [];
}

export function getInstanceOfProperty<T extends Entity, K extends keyof T>(target: T, property: K) {
  return Reflect.getMetadata("design:type", target, property as string);
}

export function getTypeOfProperty<T extends Entity, K extends keyof T>(
  target: T,
  property: K
):
  | {
      type: typeof availableTypes[number];
      nullable: true;
    }
  | {
      type: string;
      nullable: false;
    } {
  const instance = getInstanceOfProperty(target, property);
  switch (instance.name as keyof typeof Types) {
    case "NullableBoolean": {
      return {
        type: "boolean",
        nullable: true,
      };
    }

    case "NullableDate": {
      return {
        type: "date",
        nullable: true,
      };
    }

    case "NullableNumber": {
      return {
        type: "number",
        nullable: true,
      };
    }

    case "NullableString": {
      return {
        type: "string",
        nullable: true,
      };
    }

    default: {
      return {
        type: instance.name.toLowerCase(),
        nullable: false,
      };
    }
  }
}

export type ParsePotentiallyNullableType<T> = T extends NullableBoolean
  ? boolean | null
  : T extends NullableNumber
  ? number | null
  : T extends NullableString
  ? string | null
  : T extends NullableDate
  ? Date | null
  : T;

export type RemapProperties<T extends Entity> = {
  [Key in keyof T]: ParsePotentiallyNullableType<T[Key]>;
};

export * from "./structs";
