const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');

const email = process.argv[2];
const role = process.argv[3] || 'admin';

if (!email) {
    console.error('Vui lòng cung cấp Email!');
    process.exit(1);
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const setRole = async () => {
    try {
        const user = await admin.auth().getUserByEmail(email);
        await admin.auth().setCustomUserClaims(user.uid, { role });
        console.log(`Thành công! Đã cấp quyền ${role} cho ${email} (UID: ${user.uid})`);
        process.exit(0);
    } catch (error) {
        console.error('Lỗi chi tiết:', error);
        process.exit(1);
    }
};

setRole();
