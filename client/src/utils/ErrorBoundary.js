import React, { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: '' };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true , error: error };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong : {this.state.error.message}</h1>;
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary;