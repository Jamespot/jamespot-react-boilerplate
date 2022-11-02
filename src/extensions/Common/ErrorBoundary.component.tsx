import React from 'react';
import styled from 'styled-components';

type Props = {
    children: React.ReactNode;
};

const ErrorMessage = styled.div`
    height: 40px;
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
    border-radius: 10px;
    padding: 8px;
    margin: 5px;
`;

class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_error: Error) {
        return { hasError: true };
    }
    override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error(error, errorInfo);
    }
    override render() {
        if (this.state.hasError) {
            return <ErrorMessage>Oups, une erreur est survenue</ErrorMessage>;
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
