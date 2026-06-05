# Auth Validation Implementation - Test Plan

## Test Scenarios

### 1. Login Form - Frontend Validation

#### Test 1.1: Invalid Email - Missing @ symbol
- **Input:** 
  - Email: `user`
  - Password: `password123`
- **Expected:** Email error: "Please enter a valid email address."
- **API Call:** Should NOT be made

#### Test 1.2: Invalid Email - Missing domain
- **Input:**
  - Email: `user@`
  - Password: `password123`
- **Expected:** Email error: "Please enter a valid email address."
- **API Call:** Should NOT be made

#### Test 1.3: Invalid Email - Missing TLD
- **Input:**
  - Email: `user@gmail`
  - Password: `password123`
- **Expected:** Email error: "Please enter a valid email address."
- **API Call:** Should NOT be made

#### Test 1.4: Invalid Email - Only @ symbol
- **Input:**
  - Email: `@gmail.com`
  - Password: `password123`
- **Expected:** Email error: "Please enter a valid email address."
- **API Call:** Should NOT be made

#### Test 1.5: Invalid Email - No user part
- **Input:**
  - Email: `user@.com`
  - Password: `password123`
- **Expected:** Email error: "Please enter a valid email address."
- **API Call:** Should NOT be made

#### Test 1.6: Invalid Email - No @ symbol
- **Input:**
  - Email: `user gmail.com`
  - Password: `password123`
- **Expected:** Email error: "Please enter a valid email address."
- **API Call:** Should NOT be made

#### Test 1.7: Invalid Password - Too Short (7 chars)
- **Input:**
  - Email: `user@gmail.com`
  - Password: `pass123`
- **Expected:** Password error: "Password must be at least 8 characters long."
- **API Call:** Should NOT be made

#### Test 1.8: Invalid Password - Very Short (1 char)
- **Input:**
  - Email: `user@gmail.com`
  - Password: `1`
- **Expected:** Password error: "Password must be at least 8 characters long."
- **API Call:** Should NOT be made

#### Test 1.9: Both Email and Password Invalid
- **Input:**
  - Email: `user`
  - Password: `123`
- **Expected:** 
  - Email error: "Please enter a valid email address."
  - Password error: "Password must be at least 8 characters long."
- **API Call:** Should NOT be made

#### Test 1.10: Valid Email and Password Format
- **Input:**
  - Email: `user@gmail.com`
  - Password: `password123`
- **Expected:** No validation errors, API call made
- **Response:** 
  - If user exists: Login successful message or error from backend
  - If user doesn't exist: "User not found" message

### 2. Signup Form - Frontend Validation

#### Test 2.1: Invalid Email
- **Input:**
  - Name: `John Doe`
  - Company Name: (empty)
  - Email: `invalid-email`
  - Password: `password123`
  - Type: Individual
- **Expected:** Email error: "Please enter a valid email address."
- **API Call:** Should NOT be made

#### Test 2.2: Password Too Short
- **Input:**
  - Name: `John Doe`
  - Email: `john@gmail.com`
  - Password: `1234567` (7 chars)
  - Type: Individual
- **Expected:** Password error: "Password must be at least 8 characters long."
- **API Call:** Should NOT be made

#### Test 2.3: Company Type - Missing Company Name
- **Input:**
  - Name: `John Doe`
  - Company Name: (empty)
  - Email: `john@gmail.com`
  - Password: `password123`
  - Type: Company
- **Expected:** Company name error: "Company name is required."
- **API Call:** Should NOT be made

#### Test 2.4: Missing Name
- **Input:**
  - Name: (empty)
  - Email: `john@gmail.com`
  - Password: `password123`
  - Type: Individual
- **Expected:** Name error: "Full name is required."
- **API Call:** Should NOT be made

#### Test 2.5: All Valid - Individual Account
- **Input:**
  - Name: `John Doe`
  - Email: `john@gmail.com`
  - Password: `password123`
  - Type: Individual
- **Expected:** 
  - No validation errors
  - API call made
  - Success: Account created and logged in
  - Error: User already exists message

#### Test 2.6: All Valid - Company Account
- **Input:**
  - Name: `John Doe`
  - Company Name: `Acme Inc.`
  - Email: `john@acme.com`
  - Password: `password123`
  - Type: Company
- **Expected:** 
  - No validation errors
  - API call made
  - Success: Account created and logged in

### 3. Backend Validation - Login Endpoint (`POST /auth/login`)

#### Test 3.1: Invalid Email Format
- **Request Body:**
  ```json
  {
    "email": "invalid-email",
    "password": "password123"
  }
  ```
- **Expected Response:**
  - Status: 400
  - Body: `{ "success": false, "message": "Please enter a valid email address." }`
- **Database Query:** Should NOT be executed

#### Test 3.2: Password Too Short
- **Request Body:**
  ```json
  {
    "email": "user@gmail.com",
    "password": "1234567"
  }
  ```
- **Expected Response:**
  - Status: 400
  - Body: `{ "success": false, "message": "Password must be at least 8 characters long." }`
- **Database Query:** Should NOT be executed

#### Test 3.3: Valid Credentials - User Exists
- **Request Body:**
  ```json
  {
    "email": "user@gmail.com",
    "password": "password123"
  }
  ```
- **Expected Response (Success):**
  - Status: 200
  - Body includes: `{ "success": true, "message": "Login successful", "token": "...", "role": "CUSTOMER" }`

#### Test 3.4: Valid Format - User Not Found
- **Request Body:**
  ```json
  {
    "email": "nonexistent@gmail.com",
    "password": "password123"
  }
  ```
- **Expected Response:**
  - Status: 404
  - Body: `{ "success": false, "message": "User not found" }`

#### Test 3.5: Valid Format - Wrong Password
- **Request Body:**
  ```json
  {
    "email": "user@gmail.com",
    "password": "wrongpassword123"
  }
  ```
- **Expected Response:**
  - Status: 401
  - Body: `{ "success": false, "message": "Invalid credentials" }`

### 4. Backend Validation - Register Endpoint (`POST /auth/register`)

#### Test 4.1: Invalid Email Format
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "user@",
    "password": "password123",
    "accountType": "INDIVIDUAL"
  }
  ```
- **Expected Response:**
  - Status: 400
  - Body: `{ "success": false, "message": "Please enter a valid email address." }`

#### Test 4.2: Password Too Short
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@gmail.com",
    "password": "1234567",
    "accountType": "INDIVIDUAL"
  }
  ```
- **Expected Response:**
  - Status: 400
  - Body: `{ "success": false, "message": "Password must be at least 8 characters long." }`

#### Test 4.3: Valid Data - User Already Exists
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "existing@gmail.com",
    "password": "password123",
    "accountType": "INDIVIDUAL"
  }
  ```
- **Expected Response:**
  - Status: 400
  - Body: `{ "success": false, "message": "User already exists" }`

#### Test 4.4: Valid Data - New User
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@gmail.com",
    "password": "password123",
    "accountType": "INDIVIDUAL",
    "role": "CUSTOMER"
  }
  ```
- **Expected Response:**
  - Status: 201
  - Body includes: `{ "success": true, "message": "User registered successfully", "token": "...", "user": {...} }`

#### Test 4.5: Company Account - Missing Company Name
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@company.com",
    "password": "password123",
    "accountType": "COMPANY"
  }
  ```
- **Expected Response:**
  - Status: 400
  - Body: Validation error (company name validation)

#### Test 4.6: Company Account - Valid
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@company.com",
    "password": "password123",
    "accountType": "COMPANY",
    "companyName": "Acme Inc."
  }
  ```
- **Expected Response:**
  - Status: 201
  - Body includes: `{ "success": true, "message": "User registered successfully" }`

### 5. Edge Cases and Security

#### Test 5.1: Frontend Bypass Attempt - Using DevTools to Send Invalid Data
- **Scenario:** User manually modifies frontend validation by using browser DevTools
- **Expected:** Backend still validates and rejects invalid data with 400 status

#### Test 5.2: Email with Spaces
- **Input (Frontend):**
  - Email: ` user@gmail.com ` (with spaces)
- **Expected:** 
  - Frontend trims and validates correctly
  - Error: "Please enter a valid email address."

#### Test 5.3: Very Long Password
- **Input:**
  - Email: `user@gmail.com`
  - Password: (256+ characters)
- **Expected:** Should be accepted (no max length defined for password)
- **API Call:** Should succeed if other validations pass

#### Test 5.4: Special Characters in Email
- **Input:**
  - Email: `user+tag@gmail.com`
- **Expected:** Should be accepted (valid format)

#### Test 5.5: Multiple Dots in Email
- **Input:**
  - Email: `john.doe@gmail.co.uk`
- **Expected:** Should be accepted (valid format)

## Error Message Validation

### Messages should be:
- ✓ Clear and user-friendly
- ✓ Inline displayed in the form (frontend)
- ✓ Returned in API response (backend)
- ✓ Consistent between frontend and backend
- ✓ In red text color on the form

### Standard Messages:
- Email validation: "Please enter a valid email address."
- Password validation: "Password must be at least 8 characters long."
- Name validation: "Full name is required."
- Company name validation: "Company name is required."

## Code Quality Checklist

- ✓ No duplicate validation code
- ✓ Reusable validation logic in utility files
- ✓ Both frontend and backend validation present
- ✓ UI design unchanged
- ✓ Existing functionality preserved
- ✓ Clear error messages
- ✓ Consistent error handling
- ✓ Response format includes success flag

## Execution Instructions

### Manual Testing Steps:

1. **Test Frontend Validation:**
   - Open login/signup forms
   - Try invalid email formats
   - Try short passwords
   - Observe inline error messages
   - Verify API is not called when validation fails

2. **Test Backend Validation:**
   - Use Postman/curl to send requests
   - Send invalid email/password combinations
   - Verify 400 status codes and error messages
   - Test bypass attempts

3. **Test Success Cases:**
   - Submit valid credentials
   - Verify successful login/registration
   - Verify token is returned
   - Verify user is redirected to correct route

## Summary

Total Test Cases: 24 main scenarios + 5 edge cases = 29 test cases
All tests should pass before marking implementation as complete.
