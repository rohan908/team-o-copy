import {ReactNode} from "react";

export type reactContent = {
  reactContent: ReactNode | ReactNode[]
}

export type WithChildren<T = Record<string, unknown>> = T & {
  children?: ReactNode | ReactNode[]
};

