/* eslint-disable @typescript-eslint/camelcase */
import { section, plainTextInput, plainTextElement, option, actionStaticSelect, inputBlock } from '../block-kit/block-builder';
import { View } from '@slack/bolt/node_modules/@slack/types'

export default {
  display: (privateMetadata: string): View => {
    return {
      title: {
        type: 'plain_text',
        text: 'CAN Report'
      },
      type: 'modal',
      blocks: [
        section("It looks like you want to declare an incident"),
        plainTextInput('Conditions', 'conditions', undefined, true),
        plainTextInput('Actions', 'actions', undefined, true),
        plainTextInput('Needs', 'needs', undefined, true),
        inputBlock(
          'Time to next report...',
          'next-report',
          actionStaticSelect(
            'Select a deadline',
            'next-report',
            [
              option('5 minutes', '5'),
              option('10 minutes', '10'),
              option('15 minutes', '15'),
              option('30 minutes', '30'),
              option('60 minutes', '60'),
            ]
          )
        )
      ],
      submit: plainTextElement('Submit'),
      callback_id: 'can-report-modal',
      private_metadata: privateMetadata
    }
  }
}

