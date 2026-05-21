const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase Admin initialized successfully!');
  process.exit(0);
} catch (error) {
  console.error('Initialization failed:', error);
  process.exit(1);
}
