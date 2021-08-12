import jwt from 'jsonwebtoken';

export const makeAccessToken = (data) => {
    const jwtSign = jwt.sign({ _id: data._id }, process.env.atPKey, { expiresIn: '15m' });
    return jwtSign;
};

export const makeRefreshToken = (data) => {
    const jwtSign = jwt.sign({ _id: data._id }, process.env.rtPkey, { expiresIn: '60d' });
    return jwtSign;
};