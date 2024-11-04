import { authenticate } from "../shopify.server.js";

export const action = async ({ request }) => {
  
    const { session, admin } = await authenticate.public.appProxy(request);
    console.log("COMING HERE.......................", session);
  
    const body = await request.json();
    const customerId = body.customerId;

    if (!customerId) {
      throw new Error("Customer ID is missing");
    }

    const customer = await admin.rest.resources.Customer.orders({
      session: session,
      id: customerId,
    });

   
    let res = false;

    
    console.log("Customers---------------",customer);
    
    
    customer.orders.forEach(order => {
      order.line_items.forEach(line_item => {
        console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",line_item)

        if (line_item.product_id === 9637064835355) {

          res = true;
        }
      });
    });
    
    console.log("Match found:", res);  


    
    

  return res
};
