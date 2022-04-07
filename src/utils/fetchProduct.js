import { client, Query } from "@tilework/opus";

client.setEndpoint("http://localhost:4000/");

export default function fetchProduct(id, success, error, signal) {
  const product = new Query("product")
    .addArgument("id", "String!", id)
    .addFieldList([
      "id",
      "name",
      "gallery",
      "inStock",
      "description",
      "category",
      "brand",
      // "attributes{id, name, type, items{displayValue, value, id}}",
      // "prices{amount, currency{label, symbol}}",
    ]);

  client
    .post(product, signal)
    .then((data) => success(data))
    .catch((err) => error(err));
}
