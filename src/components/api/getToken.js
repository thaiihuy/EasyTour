import { AsyncStorage } from 'react-native';

const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@token');
        if (value !== null) {
            return Promise.resolve(value);
        }
        return Promise.reject(value);
    } catch (error) {
    // Error retrieving data
    return Promise.reject(error);
    }
};

export default getToken;