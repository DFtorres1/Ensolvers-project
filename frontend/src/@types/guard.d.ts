type RoutesType = {
  id: string;
  exact?: boolean;
  path?: string;
  guard?: React.FC;
  layout?: React.FC;
  // Disabled due to necessary any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: any;
  routes?: RoutesType[];
};

type GuardIdProps = () => React.FC<React.PropsWithChildren<unknown>>;
