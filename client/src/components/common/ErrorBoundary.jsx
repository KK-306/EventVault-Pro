import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>EventVault hit an unexpected UI error.</h1>
          <p>Refresh the page, then retry the workflow.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
