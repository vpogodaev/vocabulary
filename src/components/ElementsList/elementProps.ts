interface IElementPropsBase {
  primaryText: string;
  secondaryText?: string;
}

//TODO: make generic?
export type TElementProps = {
  onClick?: () => void;
} & IElementPropsBase

export type TElementPropsWithId = {
  id: string;
} & IElementPropsBase