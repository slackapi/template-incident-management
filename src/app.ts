import dotenv from 'dotenv';
dotenv.config();

import { App } from '@slack/bolt'

import canReportModal from './views/can-report-modal';
import canReportOutput from './views/can-report-output';

const botToken = process.env.BOT_TOKEN;

const app = new App({
    signingSecret: process.env.SIGNING_SECRET,
    token: botToken
});

export interface ModalStatePayload {
    values: {
        [key: string]: {
            [key: string]: {
                type: string,
                value?: string,
                selected_option?: {
                    value: string
                }
            }
        }
    }
}

app.command(`/incident-declare`, ({ command, ack, say }) => {
    ack();
    app.client.conversations.create({
        token: botToken,
        name: ''
    })
});

app.command(`/incident-can-report`, ({ command, ack, say }) => {
    ack();
    if (!command.channel_name.startsWith('incd')) {
        say('Sorry, you should only do CAN reports in an incident channel!');
        return;
    }
    app.client.views.open({
        token: botToken,
        // eslint-disable-next-line @typescript-eslint/camelcase
        trigger_id: command.trigger_id,
        view: canReportModal.display(command.channel_id),
    }).catch(error => {
        console.error(JSON.stringify(error, null, 2));
    });
});

// eslint-disable-next-line @typescript-eslint/camelcase
app.view({callback_id: 'can-report-modal', type: 'view_submission'}, ({ ack, body, context }) => {
    ack();
    const responses = (body.view.state as ModalStatePayload).values;
    console.log(JSON.stringify(responses, null, 2));
    app.client.chat.postMessage({
        token: botToken,
        channel: body.view.private_metadata,
        text: 'CAN Report',
        blocks: canReportOutput.blocks(
            body.user.id,
            responses['conditions']['conditions'].value!,
            responses['actions']['actions'].value!,
            responses['needs']['needs'].value!,
            responses['next-report']['next-report'].selected_option!.value
        )
    })
});

(async (): Promise<void> => {
    // Start your app
    await app.start(process.env.PORT || 3000);
    console.log('IncidentBot is ready and waiting...');
})();