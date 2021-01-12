import "reflect-metadata";

import { availableTypes, NullableBoolean, NullableDate, NullableNumber, NullableString } from "./structs";

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

export function getDesignOfProperty<T extends Object, K extends keyof T>(target: T, property: K) {
  return Reflect.getMetadata("design:type", target, property as string);
}

export function getTypeOfProperty<T extends Object, K extends keyof T>(
  target: T,
  property: K
): { type: typeof availableTypes[number]; nullable: true } | { type: string; nullable: false } {
  const instance = getDesignOfProperty(target, property);

  switch (instance.name) {
    case NullableBoolean.name: {
      return {
        type: "boolean",
        nullable: true,
      };
    }

    case NullableDate.name: {
      return {
        type: "date",
        nullable: true,
      };
    }

    case NullableNumber.name: {
      return {
        type: "number",
        nullable: true,
      };
    }

    case NullableString.name: {
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

export type RemapProperties<T extends Object> = {
  [Key in keyof T]: ParsePotentiallyNullableType<T[Key]>;
};

export * from "./structs";
