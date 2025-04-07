import User from '../models/User';
// Test suite for the User class

describe('User Model', () => {
  // Test 1: Testing object creation with default values
  test('creates a user with default values', () => {
    const user = new User('test-id', 'testuser');
    
    expect(user.id).toBe('test-id');
    expect(user.username).toBe('testuser');
    expect(user.role).toBe('user'); // default role is 'user'
    expect(user.createdAt).toBeInstanceOf(Date);
  });
  
  // Test 2: Testing object creation with custom values
  test('creates a user with custom values', () => {
    const createdAt = new Date('2023-01-01');
    const user = new User('test-id', 'testuser', 'therapist', createdAt);
    
    expect(user.id).toBe('test-id');
    expect(user.username).toBe('testuser');
    expect(user.role).toBe('therapist');
    expect(user.createdAt).toBe(createdAt);
  });
  
  // Test 3: Testing isTherapist method
  test('isTherapist returns correct boolean based on role', () => {
    const therapist = new User('test-id-1', 'therapist_user', 'therapist');
    const regularUser = new User('test-id-2', 'regular_user', 'user');
    
    expect(therapist.isTherapist()).toBe(true);
    expect(regularUser.isTherapist()).toBe(false);
  });
  
  // Test 4: Testing the getFormattedCreationDate method
  test('getFormattedCreationDate returns correctly formatted date', () => {
    const createdAt = new Date('2023-01-01T12:00:00');
    const user = new User('test-id', 'testuser', 'user', createdAt);
    
    // This will format based on locale, but for en-US should be MM/DD/YYYY
    expect(user.getFormattedCreationDate()).toBe('1/1/2023');
  });
  
  // Test 5: Testing the toString method
  test('toString returns the expected string representation', () => {
    const user = new User('test-id', 'testuser', 'therapist');
    
    expect(user.toString()).toBe('User: testuser (therapist)');
  });
  
  // Test 6: Testing the canPerformAction method
  test('canPerformAction correctly determines permissions', () => {
    const therapist = new User('test-id-1', 'therapist_user', 'therapist');
    const regularUser = new User('test-id-2', 'regular_user', 'user');
    
    // Therapist-only actions
    expect(therapist.canPerformAction('diagnose')).toBe(true);
    expect(regularUser.canPerformAction('diagnose')).toBe(false);
    
    expect(therapist.canPerformAction('prescribe')).toBe(true);
    expect(regularUser.canPerformAction('prescribe')).toBe(false);
    
    // Common actions that all users can perform
    expect(therapist.canPerformAction('view_profile')).toBe(true);
    expect(regularUser.canPerformAction('view_profile')).toBe(true);
  });
});
