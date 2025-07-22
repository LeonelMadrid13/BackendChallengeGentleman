import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const USERS_PATH = path.join(process.cwd(), 'users.json');

// Helper: Load users database (array of {username, passwordHash})
function loadUsers() {
    if (!fs.existsSync(USERS_PATH)) return [];
    return JSON.parse(fs.readFileSync(USERS_PATH, 'utf-8'));
}

// Helper: Save users database
function saveUsers(users) {
    fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

// Register user
export async function registerUser({ username, password, confirmPassword }) {
    if (!username || !password || !confirmPassword)
        return { error: 'All fields are required.' };
    if (password !== confirmPassword)
        return { error: 'Passwords do not match.' };
    if (password.length < 5)
        return { error: 'Password must be at least 5 characters.' };

    const users = loadUsers();
    if (users.find(u => u.username === username))
        return { error: 'Username already exists.' };

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    users.push({ username, passwordHash });
    saveUsers(users);
    return {};
}

// Login user
export async function loginUser({ username, password, req }) {
    if (!username || !password)
        return { error: 'All fields are required.' };

    const users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user)
        return { error: 'Username or password is incorrect.' };

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match)
        return { error: 'Username or password is incorrect.' };

    // (If using sessions)
    req.session.username = username;

    return {};
}
