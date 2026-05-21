const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const listUsers = async () => {
    try {
        const result = await admin.auth().listUsers(10);
        console.log('Users found:', result.users.length);
        result.users.forEach(u => console.log(u.email));
        process.exit(0);
    } catch (error) {
        console.error('List users failed:', error);
        process.exit(1);
    }
};

listUsers();
