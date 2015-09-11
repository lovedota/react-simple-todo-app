interface Presets {
  noWobble: number[];
  gentle: number[];
  wobbly: number[];
  stiff: number[];
}

interface Spring {
  TransitionMotion: React.Component<any, any>;
  spring(val, config?);
}

declare module 'react-motion' {
  export var TransitionSpring: any;
  export var Spring: Spring;
  export var presets: Presets;
}
