/**
 * @jest-environment jsdom
 */
import axios from 'axios';
import { Login, SignUp } from '../app/Services/LoginService';

jest.mock('axios');

describe('LoginService', () => {
  afterEach(() => {
    jest.clearAllMocks(); // reset calls after each test
  });

  describe('Login', () => {
    it('should return data on successful login', async () => {
      const mockResponse = {
        status: 200,
        message: 'Login successful',
        data: 'JWT_TOKEN'
      };
      axios.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await Login('test@example.com', 'mypassword');

      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.API_URL}/login/sign_in`, 
        { email: 'test@example.com', password: 'mypassword' }
      );

      expect(result).toEqual(mockResponse);
    });

    it('should handle login error (e.g. wrong password)', async () => {
      // If the server returns a 400 or 401, axios throws
      const mockError = {
        response: {
          status: 400,
          data: {
            status: 400,
            message: 'Email or password is incorrect'
          }
        }
      };
      axios.post.mockRejectedValueOnce(mockError);

      // Attempt to call login
      try {
        await Login('test@example.com', 'wrongpass');
        throw new Error('Should have thrown error but did not');
      } catch (err) {
        // Check we got the right error
        expect(err).toBe(mockError);
      }
    });
  });

  describe('SignUp', () => {
    it('should return data on successful signup', async () => {
      // Suppose the server returns 201 with a success message
      const mockResponse = {
        status: 201,
        message: 'User registered successfully.'
      };
      axios.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await SignUp('fresh@example.com', 'mypassword', 'John', 'Doe');

      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.API_URL}/login/sign_up`,
        {
          email: 'fresh@example.com',
          password: 'mypassword',
          firstName: 'John',
          lastName: 'Doe'
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle signup error (email already exists, etc.)', async () => {
      const mockError = {
        response: {
          status: 400,
          data: {
            status: 400,
            message: 'Email already exists.'
          }
        }
      };
      axios.post.mockRejectedValueOnce(mockError);

      try {
        await SignUp('used@example.com', 'somepass', 'Jane', 'Smith');
        throw new Error('Should have thrown error but did not');
      } catch (err) {
        expect(err).toBe(mockError);
      }
    });
  });
});
