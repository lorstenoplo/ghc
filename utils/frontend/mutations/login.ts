export default async function login(values: any) {
    const res = await fetch(`/api/login`, {
        method: "POST",
        body: JSON.stringify(values),
    });
    return res.json();
}