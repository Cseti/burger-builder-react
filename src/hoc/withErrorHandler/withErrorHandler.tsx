import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent:any, axios:any ) => {
    return class extends Component {
        state = {
            showError: false,
            error: {
                message: [] as any[]
            }
        }

        reqInterceptor: any;
        resInterceptor: any;

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use((req:any) => {
                this.setState({showError: false});
                this.setState({error: {message: null}});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use((res:any) => res, (error:any) => {
                this.setState({showError: true});
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({showError: false});
            this.setState({error: {message: null}});
        }

        render () {
            return (
                <>
                    <Modal
                        show={this.state.showError}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.showError ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    }
}

export default withErrorHandler;
