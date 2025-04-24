import bcrypt from "bcryptjs";

// hash password saat register
const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashingPass = await bcrypt.hash(password, salt);
    return hashingPass;
};

// compare password saat login
const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

export { hashedPassword, comparePassword };