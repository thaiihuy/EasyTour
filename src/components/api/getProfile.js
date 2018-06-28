import {AsyncStorage} from 'react-native';
const GetProfile = (token) => (
    fetch('http://easytour.tk/api/user-info',
    {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            token: token,
        },
    })
    .then(res => res.id)
);

export default GetProfile;