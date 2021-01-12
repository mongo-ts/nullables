export interface INullable {
  _no: string;
}

export class NullableDate extends Date implements INullable {
  _no = "date";
}

export class NullableString extends String implements INullable {
  _no = "string";
}

export class NullableNumber extends Number implements INullable {
  _no = "number";
}

export class NullableBoolean extends Boolean implements INullable {
  _no = "boolean";
}

export const Types = {
  NullableDate,
  NullableString,
  NullableNumber,
  NullableBoolean,
} as const;

export const availableTypes = ["date", "string", "number", "boolean"] as const;
