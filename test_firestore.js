const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const testFirestore = async () => {
    try {
        const collections = await db.listCollections();
        console.log('Collections found:', collections.map(c => c.id));
        process.exit(0);
    } catch (error) {
        console.error('Firestore failed:', error);
        process.exit(1);
    }
};

testFirestore();
