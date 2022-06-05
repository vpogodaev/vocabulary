import React from 'react';

export type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type KeysWithValues<T> = { [key: string]: T };
export type KeysWithStringValues = KeysWithValues<string>;
