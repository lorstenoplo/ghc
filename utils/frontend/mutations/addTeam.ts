export default async function addTeam(values: any) {
    const res = await fetch(`/api/addTeam`, {
        method: "POST",
        body: JSON.stringify(values),
    });
    return res.json();
}