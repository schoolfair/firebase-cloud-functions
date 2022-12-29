import * as admin from 'firebase-admin';

admin.initializeApp();

import * as functions from 'firebase-functions';
import { UserRecord } from 'firebase-functions/v1/auth';
import { User } from './models/user';

export { api } from './http';

const db = admin.firestore();

export const newUserCreated = functions.auth.user().onCreate((user: UserRecord) => {
    
    let uid = user.uid

    let userModel: User = {
        uid: uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
    };

    db.collection(`users`).doc(uid).set(userModel).then((ref) => {
        functions.logger.info("Created User");
    }).catch((err) => {
        functions.logger.error(err);
    });
})


