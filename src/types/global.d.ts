declare namespace JSX {
    interface IntrinsicElements {
      "my-vue-component": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
  

  interface Window {
    Vue: any;
  }