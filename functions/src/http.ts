import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

import * as express from "express";

import * as cors from "cors";
import * as bodyParser from "body-parser";
import { EmployerDataModel, StudentDataModel } from "./models/user";



const db = admin.firestore();

const app = express();
app.use(bodyParser.json());

const ALLOWED_ORIGINS = ['http://localhost:4200', 'https://schoolfair.us'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(new Error('The CORS policy for this site does not allow access with no origin.'), false);

        if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';  
            return callback(new Error(msg), false);
        }

        return callback(null, true);
    }
}));

app.post(`/user-data`, (req, res) => {

    let docref = db.doc(`user-data/${req.body.uid}`)

    let user;

    if (req.body.type.student) {
        user = req.body as StudentDataModel;
        db.doc(`users/${user.uid}`).update({roles: {student: true}}, )
    }

    else if (req.body.type.employer) {
        user = req.body as EmployerDataModel;
        db.doc(`users/${user.uid}`).update({roles: {employer: true}}, )
    }
    
    else {
        res.status(400);
        return res.end();
    }

    return docref.set(user).then((ref) => {
        res.status(200);
    }).catch((err) => {
        res.status(400);
    }).finally(() => {
        return res.end();
    });
   
});

export const api = functions.https.onRequest(app);

