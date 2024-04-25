import React from 'react';
import WebcamCapture from './webcamCapture';
import PinEntry from '../../components/PinEntry';
import UserData from '../../components/UserData';



const appScreen = {
    RECOGNITION: 'RECOGNITION',
    PIN: 'PIN',
    USER_SUCCESS: 'USER_SUCCESS'
}

const ATM = ({ screen, onUpdateScreen }) => {

    switch (screen) {
        case appScreen.PIN:
            return <PinComponent onUpdateScreen={onUpdateScreen}/>;
        case appScreen.USER_SUCCESS:
            return <UserSuccessComponent />;
        default:
            return <RecognitionComponent onUpdateScreen={onUpdateScreen}/>;;
    }
}

const RecognitionComponent = ({onUpdateScreen}) => {
    return (
        //   <div style={{margin: '0px 0px 0px 180px'}}>
        //     <img src={require('./pnc_back.png')}/>
        // <WebcamCapture onUpdateScreen={onUpdateScreen}/>
        // </div>

        <WebcamCapture onUpdateScreen={onUpdateScreen}/>
        // <div style={{ borderRadius: '10px' }}>
        //     <WebcamCapture onUpdateScreen={onUpdateScreen} />
        // </div>


    );
}

const PinComponent = ({onUpdateScreen}) => {
    return (
        <div>
            <PinEntry  onUpdateScreen={onUpdateScreen}/>
        </div>
    );
}

const UserSuccessComponent = () => {
    return (
        <div>
            <UserData/>
        </div>
    );
}

export default ATM;
