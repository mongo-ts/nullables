export class NullableDate extends Date {}
export class NullableString extends String {}
export class NullableNumber extends Number {}
export class NullableBoolean extends Boolean {}

export const Types = {
  NullableDate,
  NullableString,
  NullableNumber,
  NullableBoolean,
} as const;

export const availableTypes = ["date", "string", "number", "boolean"] as const;
