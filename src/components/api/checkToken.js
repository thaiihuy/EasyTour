import { AsyncStorage } from 'react-native';

// AsyncStorage.getItem('@token').then(data => {
//     alert(data);
// });
const checkToken = () => {
   return AsyncStorage.getItem('@token').then(data => {
        return Promise.resolve(data);
    }).catch(err=> Promise.reject(err));
};


export default checkToken;