import { config } from "dotenv";
config();
import { sign,verify } from "jsonwebtoken";

const getToken = function (data: string | object ) {
  const jwtSecretKey :string = process.env.JWT_KEY || "";
  const token = sign(data, jwtSecretKey,{expiresIn:"60d"});
  return token;
};

const getForgetToken = function (data: string | object ) {
  const jwtSecretKey :string = process.env.JWT_KEY || "";
  const token = sign(data, jwtSecretKey,{expiresIn:"10m"});
  return token;
};

const decodeToken=function(token:string){
  const jwtSecretKey :string = process.env.JWT_KEY || "";
  const decodedtoken=verify(token,jwtSecretKey);
  return decodedtoken;
}

export default {
  getToken,
  getForgetToken,
  decodeToken
};