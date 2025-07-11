import * as admin from 'firebase-admin';
import path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../firebase-service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccountPath)),
  });
}

export default admin;
