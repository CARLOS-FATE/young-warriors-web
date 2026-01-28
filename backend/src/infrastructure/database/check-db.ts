import mysql from 'mysql2/promise';

const combinations = [
    { user: 'root', password: '' },
    { user: 'root', password: 'root' },
    { user: 'root', password: 'password' },
    { user: 'admin', password: 'password' },
];

async function check() {
    console.log('Checking DB credentials...');
    for (const cred of combinations) {
        try {
            console.log(`Trying user: ${cred.user}, pass: "${cred.password}"`);
            const conn = await mysql.createConnection({
                host: '127.0.0.1',
                port: 3306,
                user: cred.user,
                password: cred.password
            });
            console.log(`SUCCESS! Connected with user: ${cred.user}, pass: "${cred.password}"`);
            await conn.end();
            process.exit(0);
        } catch (err: any) {
            console.log(`Failed (${err.code}): ${err.message}`);
        }
    }
    console.log('All attempts failed.');
    process.exit(1);
}

check();
