export default function createNewUserData(wallet: string) {
    return {
        wallet: wallet,
        userdata: {
            created: new Date().toISOString(),
        },
        haspaid: false
    }
}