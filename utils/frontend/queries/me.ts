export default async function me(token: string) {
    if (!token) {
        return null;
    }

    const response = await fetch(`/api/me/${token}`)

    const user = await response.json()

    console.log(user);
    return user;
}