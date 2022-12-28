/* eslint-disable import/no-anonymous-default-export */
import firebaseAdmin from './firebase-config.mjs';

export default async function (req, res, next) {
    try{
        const firebaseToken = req.headers.authorization?.split(' ')[1];

        let firebaseUser
        if(firebaseToken){
            firebaseUser = await firebaseAdmin.auth.verifyIdToken(firebaseToken);
        }

        
        
        if(!firebaseUser){
            return res.sendStatus(401)
        }else{
            console.log("firebase user:", firebaseUser)
        }

        const userCollection = req.app.locals.db.collection("users")

        const user = await userCollection.findOne({firebaseId: firebaseUser.user_id})

        if(!user){
            return res.sendStatus(401)
        }else{
            console.log("user", user)
        }

        req.user = user

        next()
    }catch(error){
        console.log(error)
        res.sendStatus(401)
    }
}