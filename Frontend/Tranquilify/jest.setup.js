import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';

// Mock Expo's Constants
jest.mock('expo-constants', () => ({
  Constants: { manifest: { extra: { apiUrl: 'https://example.com/api' } } }
}));
