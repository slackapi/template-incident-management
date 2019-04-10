import express from 'express';
import { WebClient } from '@slack/web-api';

const client = new WebClient();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const router = express.Router();

router.get('/', (req, res) => {
  const code = req.query.code;
  const error = req.query.error;
  if (code !== undefined) {
    client.oauth.access({
      code,
      client_id: clientId as string,
      client_secret: clientSecret as string,
    }).then((apiResult: any) => {
      res.send(apiResult);
    }).catch((oAuthError) => {
      console.error(oAuthError.message);
      res.send(oAuthError);
    });
  } else {
    res.send(error);
  }

});

export default router;
