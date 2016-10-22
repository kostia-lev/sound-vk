export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function auth(logged, user) {
    return {
        type: 'AUTH',
        state: {
                authenticated: logged,
                loggedInUser: user
        }
    }
}

export function friendGroupSearchOntype(txt) {
    return {
        type: 'FRIEND_GROUP_SEARCH',
        state: {
            friendGroupSearch: txt
        }
    }
}

export function tabChangeFriendsGroups(tabName) {
    return {
        type: 'FRIEND_TAB_CHANGE',
        state: {
            tabListActive: tabName
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