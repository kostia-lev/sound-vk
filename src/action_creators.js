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
            vote: {
                pair: ['Sunshine', '28 Days Later', 'Trainspotting'],
                tally: ['Sunshine', 2],
                authenticated: logged,
                winner: 'winner'
            }
        }
    }
}