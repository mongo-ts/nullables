import "reflect-metadata";

import { Entity, NullableBoolean, NullableDate, NullableNumber, NullableString, Types } from "./structs";

export const reflectionKeys = {
  classKeys: "ts:nullables:keys",
};

export const Property: PropertyDecorator = (target, property) => {
  const existing = Reflect.getMetadata(reflectionKeys.classKeys, target) || [];
  Reflect.defineMetadata(reflectionKeys.classKeys, [...existing, property], target);
};

export const WithNullables: ClassDecorator = () => {
  return void 0;
};

export function getAllPropertyKeys(target: Object): string[] {
  return Reflect.getMetadata(reflectionKeys.classKeys, target) || [];
}

export function getTypeForProperty<T extends Entity, K extends keyof T>(
  target: T,
  property: K
): typeof Types[keyof typeof Types] {
  return Reflect.getMetadata("design:type", target, property as string);
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
