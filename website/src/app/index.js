"use server";

async function fetchItems() {
  const items = [];
  await fetch("/api", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json().then(console.log(response)))
    .then((data) => items.push(data))
    .catch((error) => console.log("Error fetching data: ", error, items));
  console.log(items);
  return items;
}
export default fetchItems;
