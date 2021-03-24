import React, { useState } from "react";
//import "./styles.css";

 class ErrorBoundary extends  React.Component<{},any> {
  constructor(props:any) {
    super(props);
    this.state = { hasError: false } as any;
  }
  static getDerivedStateFromError(error:any) {
    return { hasError: true };
  }

  componentDidCatch(error:any, errorInfo:any) {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Some thing went wrong</h1>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary