import React from 'react';
import runSandbox from './sandbox';

const styles = {
    container: {
        position: 'inherit',
    },
    canvas: {
        overflow: 'hidden',
        position: 'absolute',
    }
}

class WebGLContainer extends React.Component {

    componentDidMount() {
        runSandbox();
    }

    render() {
        return (
            <div style={styles.container}>
                
                <canvas id={'canvas'} width={window.innerWidth} height={window.innerHeight - 70} style={styles.canvas}>
                    {this.props.children}
                </canvas>
            </div>
        )
    }
};

export default WebGLContainer;