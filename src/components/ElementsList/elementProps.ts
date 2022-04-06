interface IElementPropsBase {
  primaryText: string;
  secondaryText?: string;
}

export type TElementProps = IElementPropsBase

export type TElementPropsWithId = {
  id: string;
} & IElementPropsBase