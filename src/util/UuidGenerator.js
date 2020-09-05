import uuid from 'react-native-uuid';

class UuidGenerator {
    static async generateUuid() {
        return uuid.v4();
    }
}

export default UuidGenerator;
