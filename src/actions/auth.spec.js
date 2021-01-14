import { login, logout } from './auth';

test('should genrate login actions object', () => {
    const uid = 'abc123'
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

test('should genrate logout actions object', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});