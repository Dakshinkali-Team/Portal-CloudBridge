import jwt from "jsonwebtoken"; //import the jsonwebtoken library to create and verify JWT tokens

const generateToken = (userId) => {    //function to generate a JWT token for a given user ID
  return jwt.sign(                   //sign the token with the user ID and a secret key
    { id: userId },                     //the payload of the token contains the user ID
    process.env.JWT_SECRET,            //the secret key is stored in an environment variable for security
    {
      expiresIn: "7d",                  //the token will expire in 7 days
    }
  );
};

export default generateToken;          //export the generateToken function as the default export of this module