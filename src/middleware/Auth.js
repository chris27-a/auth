import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
   try {
    const authHeader = req.headers.authorization;
    if( !authHeader || !authHeader.startsWidth('Bearer ')) {
        return res.status(401).json({ message: `Login to perform this action`});
    }

    const token = authHeader.split('')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET) 
    (req).user = decoded;
    const { userId } = req.params;
    if(userId && decoded.id != parseInt(userId)) {
        if(decoded.type !== 'admin') {
            return res.status(403).json({ message: "Unauthorised access"})
        }
    }
    next();
   } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
   }
}

export const checkType = (requiredType = string) => {
  return async (req, res, next) =>{
    try {
        const user = (req).user;
        if (user?.email !== requiredType) {
            return res.status(403).json({ message: `Unauthorised access`}) 
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: `Authentication failed, Login to perform this action hhhhhhhh`});
    }
  }
}