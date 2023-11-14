import { Webhook } from 'svix'
import { buffer } from 'micro'


export const config = {
  api: {
    bodyParser: false,
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405);
  }
  
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Error occurred -- no svix headers' });
  }

//   console.log('headers', req.headers, svix_id, svix_signature, svix_timestamp);

  // Get the body
  const body = (await buffer(req)).toString();

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return res.status(400).json({ 'Error': err });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

//   console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
//   console.log('Webhook body:', body);

  return res.status(200).json({ response: 'Success' });
}
