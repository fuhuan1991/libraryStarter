import React, {
  PureComponent,
  SFC,
  ComponentType,
} from 'react';

type GetDisplayName = (x: ComponentType) => string;

export const getDisplayName: GetDisplayName = (Component) => Component.displayName || Component.name || 'Component';

export default function pure<P>(Component: SFC<P>) {
  class HOC extends React.PureComponent<P, undefined> {
    public static displayName: string
    public render() {
      return <Component {...this.props} />;
    }
  }
  HOC.displayName = `withPure(${getDisplayName(Component)})`;
  return HOC;
}
