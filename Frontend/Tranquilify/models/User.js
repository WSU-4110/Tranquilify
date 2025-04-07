// models/User.js
class User {
  /**
   * Creates a new User instance
   * @param {string} id - The user's unique ID
   * @param {string} username - The user's username
   * @param {string} role - The user's role (default: 'user')
   * @param {Date} createdAt - The date when the user was created (default: current date)
   */
  constructor(id, username, role = 'user', createdAt = new Date()) {
    this.id = id;
    this.username = username;
    this.role = role;
    this.createdAt = createdAt;
  }

  /**
   * Checks if the user is a therapist
   * @returns {boolean} True if the user is a therapist, false otherwise
   */
  isTherapist() {
    return this.role === 'therapist';
  }

  /**
   * Returns the user's creation date in a formatted string (MM/DD/YYYY)
   * @returns {string} The formatted date
   */
  getFormattedCreationDate() {
    return this.createdAt.toLocaleDateString('en-US');
  }

  /**
   * Returns a string representation of the user
   * @returns {string} A string representation of the user
   */
  toString() {
    return `User: ${this.username} (${this.role})`;
  }
  
  /**
   * Returns the account age in days
   * @returns {number} The account age in days
   */
  getAccountAgeInDays() {
    const now = new Date();
    const diffTime = Math.abs(now - this.createdAt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  
  /**
   * Checks if the user is allowed to perform a specific action
   * @param {string} action - The action to check
   * @returns {boolean} True if the user is allowed to perform the action, false otherwise
   */
  canPerformAction(action) {
    const therapistOnlyActions = ['diagnose', 'prescribe', 'approve_content'];
    
    if (therapistOnlyActions.includes(action)) {
      return this.isTherapist();
    }
    
    return true; // All users can perform other actions
  }
}

export default User;
