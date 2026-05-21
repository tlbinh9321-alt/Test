const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const createUser = async () => {
    try {
        const user = await admin.auth().createUser({
            email: 'test_auth_enabled@example.com',
            password: 'Password123!'
        });
        console.log('User created:', user.uid);
        // Clean up
        await admin.auth().deleteUser(user.uid);
        console.log('User deleted.');
        process.exit(0);
    } catch (error) {
        console.error('Create user failed:', error);
        process.exit(1);
    }
};

createUser();
