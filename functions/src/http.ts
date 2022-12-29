// import * as functions from "firebase-functions";
// import * as admin from 'firebase-admin';

// import * as express from "express";

// import * as cors from "cors";
// import * as bodyParser from "body-parser";
// import { User } from "./models/user";



// const db = admin.firestore();

// const app = express();
// app.use(bodyParser.json());
// app.use(cors({origin: true}));

// app.post(`/users`, (req, res) => {

//     functions.logger.info("Posted!");

//     let user = req.body;

//     const userData: User = {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName,
//         photoURL: user.photoURL,
//         emailVerified: user.emailVerified,
//     };

//     db.doc(`users/${user.uid}`).set(userData).then((ref) => {
//         return res.status(200);
//     }).catch((err) => {
//         return res.status(400);
//     })

//     return res.status(200);
// });

// export const httpTest = functions.https.onRequest(app);

