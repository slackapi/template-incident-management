import { PlainTextElement, Overflow, Datepicker, Select, StaticSelect, MultiSelect, ImageElement, ContextBlock, SectionBlock, Option, DividerBlock, Action, ActionsBlock, Button, InputBlock, PlainTextInput, ExternalSelect, MrkdwnElement } from '@slack/bolt/node_modules/@slack/types'

export function plainTextElement(text: string): PlainTextElement {
    return {
        type: 'plain_text',
        text,
        emoji: true
    }
}

export function context(text: string): ContextBlock {
    return {
        type: "context",
        elements: [
            {
                type: "mrkdwn",
                text
            }
        ]
    }
}

export function option(text: string, value: string): Option {
    return {
        text: {
            type: "plain_text",
            text,
            emoji: true
        },
        value
    }
}

export function divider(): DividerBlock {
    return {
        type: 'divider'
    }
}

export function actionButton(text: string, actionID?: string, style?: 'primary' | 'danger', value?: string): Button {
    const payload: Button = {
        type: 'button',
        text: {
            type: 'plain_text',
            text,
            emoji: true
        },
    }
    if (actionID) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        payload.action_id = actionID;
    }
    if (style) {
        payload.style = style;
    }

    if (value) {
        payload.value = value;
    }

    return payload;
}

export function URLButton(text: string, url: string, actionId: string): Button {
    return {
        type: 'button',
        text: {
            type: 'plain_text',
            text,
            emoji: true
        },
        // eslint-disable-next-line @typescript-eslint/camelcase
        action_id: actionId,
        url
    }

}

export function actionStaticSelect(placeholder: string, actionID: string, options: Option[]): StaticSelect {
    return {
        type: 'static_select',
        placeholder: plainTextElement(placeholder),
        // eslint-disable-next-line @typescript-eslint/camelcase
        action_id: actionID,
        options
    }
}

export function actionSelectExternal(placeholder: string, actionID: string, initialOption?: string) : ExternalSelect {
    const payload: ExternalSelect =  {
        // eslint-disable-next-line @typescript-eslint/camelcase
        action_id: actionID,
        type: "external_select",
        placeholder: {
            type: "plain_text",
            text: placeholder
        },
        // eslint-disable-next-line @typescript-eslint/camelcase
        min_query_length: 1
    }

    if (initialOption) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        payload.initial_option = {
            text: {
                type: 'plain_text',
                text: initialOption
            },
            value: initialOption
        }
    }

    return payload;
}

export function actions(actions: Action[], blockID?: string): ActionsBlock {
    const payload: ActionsBlock = {
        type: 'actions',
        elements: actions
    }

    if (blockID) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        payload.block_id = blockID;
    }

    return payload;
}

export function section(text: string): SectionBlock {
    return {
        type: "section",
        text: {
            type: "mrkdwn",
            text
        }
    }
}

export function sectionWithAccessory(text: string, accessory: Button | Overflow | Datepicker | Select | MultiSelect | Action | ImageElement, blockID?: string): SectionBlock {
    const payload: SectionBlock =  {
        type: "section",
        text: {
            type: "mrkdwn",
            text,
        },
        accessory
    }

    if (blockID) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        payload.block_id = blockID;
    }

    return payload;
}

export function sectionWithExternalSelect(text: string, externalSelect: ExternalSelect, blockID: string): SectionBlock {
    return sectionWithAccessory(text, externalSelect, blockID)
}

export function sectionWithImage(text:string, imageURL: string, altText: string): SectionBlock {
    // eslint-disable-next-line @typescript-eslint/camelcase
    return sectionWithAccessory(text, { type : 'image', image_url: imageURL, alt_text: altText});
}

export function sectionWithOverflow(text: string, options: Option[], actionID: string): SectionBlock {
    return sectionWithAccessory(
        text,
        {
            type: "overflow",
            options,
            // eslint-disable-next-line @typescript-eslint/camelcase
            action_id: actionID
        }
    )
}

export function sectionWithFields(fields: string[]): SectionBlock {
    const fieldBlocks: MrkdwnElement[] = [];
    for (const field of fields) {
        fieldBlocks.push({
            type: 'mrkdwn',
            text: field
        });
    }
    return {
        type: "section",
        fields: fieldBlocks 
    }
}

export function sectionWithButton(text: string, button: Button, blockID?: string): SectionBlock {
    const payload: SectionBlock = sectionWithAccessory(text, button);

    if (blockID) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        payload.block_id = blockID;
    }

    return payload;
}

export function plainTextInput(title: string, actionID: string, placeholder = ' ', multiline = false, initialValue?: string):  InputBlock {

    const element: PlainTextInput = {
        type: 'plain_text_input',
        multiline,
        // eslint-disable-next-line @typescript-eslint/camelcase
        action_id: actionID,
        placeholder : {
            type: 'plain_text',
            text: placeholder
        }
    }
    if (initialValue) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        element.initial_value = initialValue
    }

    const blockPayload: InputBlock = {
        type: 'input',
        // eslint-disable-next-line @typescript-eslint/camelcase
        block_id: actionID,
        element,
        label: {
            type: 'plain_text',
            text: title,
            emoji: true
        }
    }

    return blockPayload;
}

export function inputBlock(title: string, actionID: string, element: Select | MultiSelect | Datepicker | PlainTextInput): InputBlock {
    return {
        type: 'input',
        // eslint-disable-next-line @typescript-eslint/camelcase
        block_id: actionID,
        element,
        label: {
            type: 'plain_text',
            text: title,
            emoji: true
        }
    }
}
