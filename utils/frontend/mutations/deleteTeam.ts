export default async function deleteTeam(values: any) {
    const res = await fetch(`/api/deleteTeam`, {
        method: "POST",
        body: JSON.stringify(values),
    });

    return res.json();
}