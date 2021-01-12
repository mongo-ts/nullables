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
  const existing = Reflect.getMetadata(reflectionKeys.classKeys, target) || [];
  Reflect.defineMetadata(reflectionKeys.classKeys, [...existing, property], target);
};

export function getAllPropertyKeys<T extends Object>(target: T): (keyof T)[] {
  return Reflect.getMetadata(reflectionKeys.classKeys, target) || [];
}

export function getInstanceOfProperty<T extends Entity, K extends keyof T>(
  target: T,
  property: K
): typeof Types[keyof typeof Types] {
  return Reflect.getMetadata("design:type", target, property as string);
}

export function getTypeOfProperty<T extends Entity, K extends keyof T>(
  target: T,
  property: K
): typeof availableTypes[number] {
  const instance = getInstanceOfProperty(target, property);
  switch (instance.name as keyof typeof Types) {
    case "NullableBoolean":
      return "boolean";
    case "NullableDate":
      return "date";
    case "NullableNumber":
      return "number";
    case "NullableString":
      return "string";
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
