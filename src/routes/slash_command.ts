import express from 'express';
import { WebClient, Dialog } from '@slack/web-api';

const router = express.Router();

router.post('/', (req, res) => {
  res.send();
  const web = new WebClient(process.env.BOT_TOKEN);
  let title = '';
  if (req.body.text !== '') {
    title = req.body.text;
  }

  const dialog: Dialog = {
    callback_id: 'dialog_create_new',
    title: 'Create incident',
    submit_label: 'Create',
    notify_on_cancel: true,
    elements: [
      {
        label: 'Incident title',
        name: 'title',
        type: 'text',
        placeholder: 'Title for this incident',
        value: title,
      },
      {
        label: 'SEV',
        name: 'importance',
        type: 'select',
        options: [
          {
            label: 'SEV0 - All hands on deck',
            value: '0',
          },
          {
            label: 'SEV1 - Critical impact to many users',
            value: '1',
          },
          {
            label: 'SEV2 - Minor issue that impacts ability to use product',
            value: '2',
          },
          {
            label: 'SEV3 - Minor issue not impacting ability to use product',
            value: '3',
          },
        ],
        placeholder: 'Set the severity level',
      },
      {
        label: 'Product',
        name: 'product',
        type: 'select',
        options: [
          {
            label: 'Calls',
            value: 'calls',
          },
          {
            label: 'Platform',
            value: 'platform',
          },
          {
            label: 'Desktop Client',
            value: 'desktop',
          },
          {
            label: 'Mobile App',
            value: 'mobile',
          },
        ],
        placeholder: 'Choose the impacted product',
      },
      {
        label: 'Incident Commander',
        name: 'commander',
        type: 'select',
        data_source: 'users',
      },
      {
        label: 'Comment',
        name: 'comment',
        type: 'textarea',
        optional: true,
      },
    ],
  };
  web.dialog.open({ dialog, trigger_id: req.body.trigger_id }).catch((reason) => { console.log(reason); });
});

export default router;
