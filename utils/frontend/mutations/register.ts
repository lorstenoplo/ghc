export default async function register(values: any) {
    const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(values),
    }).then(response => response.json()).catch(err => console.log(err));


    return res;
}