import { authenticate } from "../shopify.server";
import db from "../db.server";
import { ActionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionArgs) => {
  const { topic, shop, session } = await authenticate.webhook(request);

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }
      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    case "ORDERS_CREATE":
      if (session) {
        const { payload } = await authenticate.webhook(request);
        console.log(payload);
      }
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
