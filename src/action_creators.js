export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function auth(logged) {
    return {
        type: 'AUTH',
        state: {
                authenticated: logged,
        }
    }
}
export function receiveFriendsGroups(friends, groups) {
    return {
        type: 'SET_STATE',
        state: {
                friends: friends,
                groups: groups
        }
    }
}