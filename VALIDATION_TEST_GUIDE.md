# Quick Reference - Validation Examples

## Email Validation Test Cases

### ✅ Valid Emails (Will Be Accepted)
```
user@gmail.com
john.doe@yahoo.com
test123@outlook.com
user+tag@gmail.com
john.doe@domain.co.uk
a@b.co
user_name@example.org
first.last@company.email.org
```

### ❌ Invalid Emails (Will Be Rejected)
```
user (no @)
user@ (no domain)
user@domain (no TLD)
@domain.com (no user)
user@.com (empty domain)
user domain.com (no @)
user@@domain.com (double @)
.user@domain.com (starts with dot)
user.@domain.com (ends with dot before @)
user@domain (single letter TLD - fails regex)
```

---

## Password Validation Test Cases

### ✅ Valid Passwords (8+ characters)
```
password123
MyPassword1
SecurePass!
12345678
abcdefghij
MyP@ssw0rd!
correct-horse-battery
very-long-password-with-many-characters
```

### ❌ Invalid Passwords (Less than 8 characters)
```
1 (1 char)
12 (2 chars)
123 (3 chars)
1234 (4 chars)
12345 (5 chars)
123456 (6 chars)
1234567 (7 chars)
pass (4 chars)
pwd (3 chars)
```

---

## Frontend Validation Testing Steps

### Test 1: Invalid Email
**Steps:**
1. Open Login page
2. Enter email: `user`
3. Enter password: `password123`
4. Click "Sign in"
5. **Expected:** Error "Please enter a valid email address." shown below email field
6. **Expected:** No API call made

**Code to check in browser DevTools:**
```javascript
// Console: 
// Should show the error object has email property
// errors.email === "Please enter a valid email address."
```

---

### Test 2: Invalid Password (Too Short)
**Steps:**
1. Open Login page
2. Enter email: `user@gmail.com`
3. Enter password: `1234567` (7 chars)
4. Click "Sign in"
5. **Expected:** Error "Password must be at least 8 characters long." shown below password field
6. **Expected:** No API call made

---

### Test 3: Both Email and Password Invalid
**Steps:**
1. Open Login page
2. Enter email: `invalid` (missing @)
3. Enter password: `123` (too short)
4. Click "Sign in"
5. **Expected:** Both error messages shown
6. **Expected:** No API call made

---

### Test 4: Valid Credentials
**Steps:**
1. Open Login page
2. Enter email: `test@gmail.com`
3. Enter password: `password123`
4. Click "Sign in"
5. **Expected:** No validation errors shown
6. **Expected:** API call is made
7. **Expected:** If user exists: Login successful
8. **Expected:** If user doesn't exist: "User not found" message

---

## Backend Validation Testing Steps

### Using curl or Postman

#### Test 1: Invalid Email Format
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "invalid-email", "password": "password123"}'
```
**Expected Response:**
```json
{
  "success": false,
  "message": "Please enter a valid email address."
}
```
**Expected Status:** 400

---

#### Test 2: Password Too Short
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@gmail.com", "password": "1234567"}'
```
**Expected Response:**
```json
{
  "success": false,
  "message": "Password must be at least 8 characters long."
}
```
**Expected Status:** 400

---

#### Test 3: Valid Format - User Not Found
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "nonexistent@gmail.com", "password": "password123"}'
```
**Expected Response:**
```json
{
  "success": false,
  "message": "User not found"
}
```
**Expected Status:** 404

---

#### Test 4: Valid Credentials - Success
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@gmail.com", "password": "password123"}'
```
**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "role": "CUSTOMER",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@gmail.com",
    "role": "CUSTOMER"
  }
}
```
**Expected Status:** 200

---

## Registration API Testing

### Test 1: Invalid Email in Registration
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "user@",
    "password": "password123",
    "accountType": "INDIVIDUAL",
    "role": "CUSTOMER"
  }'
```
**Expected Response:**
```json
{
  "success": false,
  "message": "Please enter a valid email address."
}
```
**Expected Status:** 400

---

### Test 2: Valid Registration
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@gmail.com",
    "password": "password123",
    "accountType": "INDIVIDUAL",
    "role": "CUSTOMER"
  }'
```
**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "role": "CUSTOMER",
  "user": {
    "id": "...",
    "name": "Jane Doe",
    "email": "jane@gmail.com",
    "role": "CUSTOMER"
  }
}
```
**Expected Status:** 201

---

## Browser DevTools Testing

### Check Network Tab

1. Open Browser DevTools (F12)
2. Go to Network tab
3. Fill form and submit
4. Look for requests to `/auth/login` or `/auth/register`

**Invalid Submission (Should NOT appear):**
```
❌ No POST request to /auth/login
```

**Valid Submission (Should appear):**
```
✓ POST http://localhost:5000/auth/login
  Status: 200 (success) or 404/401 (user/password error)
```

---

### Check Console for Validation Errors

1. Open Browser DevTools (F12)
2. Go to Console tab
3. Fill form with invalid data
4. Submit form
5. Check errors object:

```javascript
// Console output example:
{
  email: "Please enter a valid email address.",
  password: "Password must be at least 8 characters long."
}
```

---

## Edge Cases to Test

### 1. Email with Spaces (Should Be Trimmed)
**Input:** ` user@gmail.com `
**Result:** Should work (frontend trims)

### 2. Very Long Password (Should Be Accepted)
**Input:** Password with 100+ characters
**Result:** Should be accepted (no max length)

### 3. Special Characters in Email
**Input:** `user+tag@gmail.com`
**Result:** Should be accepted (valid format)

### 4. Subdomain Email
**Input:** `user@sub.domain.co.uk`
**Result:** Should be accepted (valid format)

### 5: Clearing Errors
**Steps:**
1. Enter invalid email: `user`
2. See error message
3. Start typing a valid email: `user@`
4. **Expected:** Error message should disappear

---

## Checklist for Complete Testing

### Frontend
- [ ] Invalid email shows error message
- [ ] Invalid password shows error message  
- [ ] Both invalid shows both errors
- [ ] Valid data allows API call
- [ ] Error messages are in red
- [ ] Error messages appear below field
- [ ] Errors clear when user types
- [ ] UI design unchanged
- [ ] Validation works on Login page
- [ ] Validation works on Signup page
- [ ] Company name validation works (Signup company type)

### Backend
- [ ] Invalid email returns 400 status
- [ ] Invalid password returns 400 status
- [ ] Error messages are clear
- [ ] Valid login with existing user returns 200
- [ ] Valid registration with new user returns 201
- [ ] User already exists returns 400
- [ ] Invalid credentials returns 401
- [ ] User not found returns 404
- [ ] All responses have success field
- [ ] All responses have message field

### Security
- [ ] Frontend bypass attempt is caught by backend
- [ ] Direct API calls with invalid data are rejected
- [ ] Email is trimmed before database query
- [ ] Password validation cannot be bypassed

---

## Success Criteria

✅ All validation checks pass
✅ Error messages are clear and helpful
✅ No API calls with invalid data
✅ Backend validates all requests
✅ Frontend and backend validation consistent
✅ No duplicate code
✅ Existing functionality preserved
✅ UI design unchanged
✅ Code is maintainable

