import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import config from './config';

firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

export {
    db,
    auth,
    storage
}