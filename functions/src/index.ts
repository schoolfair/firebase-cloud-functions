import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

import { UserRecord } from "firebase-functions/v1/auth";
import { User } from "./models/user";

admin.initializeApp();

const db = admin.firestore();

export const newUserCreated = functions.auth.user().onCreate((user: UserRecord) => {
    
    //functions.logger.info("New User Created");
    
    let uid = user.uid

    let userModel: User = {
        uid: uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        roles: {}
    };

    db.collection(`users`).doc(uid).set(userModel).then((ref) => {
        functions.logger.info("Created User");
    }).catch((err) => {
        functions.logger.error(err);
    });
})


