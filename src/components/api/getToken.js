import { AsyncStorage } from 'react-native';

const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@token');
        if (value !== null) {
            let res= JSON.parse(value);
            return Promise.resolve(res);
        }
        return Promise.reject(value);
    } catch (error) {
    // Error retrieving data
    return Promise.reject(error);
    }
};

export default getToken;