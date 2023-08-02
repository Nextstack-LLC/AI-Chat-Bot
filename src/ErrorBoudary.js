import { Component } from "react";

class ErrorBoundary extends Component {
  static getDerivedStateFromError(error) {
    this.props.chatchError(error)
  }

  componentDidCatch(error, errorInfo) {
    this.props.chatchError(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
