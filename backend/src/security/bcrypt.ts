import bcrypt from "bcrypt";

const saltRounds = 10;

//encryption
const Encrypt = async (Epassword: string) => {
  const hash = await bcrypt.hash(Epassword, saltRounds);
  return hash;
};

//Decryption
const Decrypt = async (Dpassword: string, foundPassword: string) => {
  const result = await bcrypt.compare(Dpassword, foundPassword);
  return result;
};

export default {
  Encrypt,
  Decrypt,
};
