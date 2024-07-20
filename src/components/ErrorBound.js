import React, { Component } from "react";
import Error404 from './Error404'; // Adjust the import path as necessary

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Error404 errorType="error" errorMessage={this.state.error.message} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
