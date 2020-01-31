import 'mocha'
import { expect } from 'chai'
import { context, section, option, sectionWithOverflow, divider, actionButton, actions, plainTextInput, actionSelectExternal, sectionWithFields, sectionWithButton, URLButton, sectionWithExternalSelect, sectionWithImage } from './block-builder'

describe('Block builder', () => {
    describe('sections', () => {
        describe('section', () => {
            it('returns a formatted section block containing the provided text', () => {
                const testText = 'test';
                const actualValue = section(testText);
                const expectedValue = {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: testText
                    }
                };
                expect(actualValue).to.eql(expectedValue);
            })
        })
        describe('sectionWithOverflow', () => {
            it('returns a formatted section block containing the provided text and an overflow', () => {
                const testText = 'test';
                const testValue = 'test-value';
                const actualValue = sectionWithOverflow(testText, [option(testText, testValue)], testValue);
                const expectedValue = {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: testText
                    },
                    accessory: {
                        type: "overflow",
                        options: [{
                            text: {
                                type: "plain_text",
                                text: testText,
                                emoji: true
                            },
                            value: testValue
                        }],
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        action_id: testValue
                    }
                };
                expect(actualValue).to.eql(expectedValue);
            })
        })
        describe('sectionWithImage', () => {
            it('returns a formatted section block containing the provided text and an image', () => {
                const testText = 'test';
                const testURL = 'https://api.slack.com/foo';
                const testAltText = 'A description of the image';
                const actualValue = sectionWithImage(testText, testURL, testAltText)
                const expectedValue = {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: testText
                    },
                    accessory: {
                        type: "image",
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        image_url: testURL,
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        alt_text: testAltText
                    }
                };
                expect(actualValue).to.eql(expectedValue);
            })
        })        
        describe('sectionWithButton', () => {
            it('returns a formatted section block containing the provided text and an overflow', () => {
                const testText = 'test';
                const testButtonText = 'testButton';
                const testButtonValue = 'TestValue';
                const testBlockID = 'blockid';
                const actualValue = sectionWithButton(testText, actionButton(testButtonText, undefined, undefined, testButtonValue), testBlockID);
                const expectedValue = {
                    type: 'section',
                    text: {
                      type: 'mrkdwn',
                      text: 'test'
                    },
                    accessory: {
                      type: 'button',
                      text: {
                        type: 'plain_text',
                        text: 'testButton',
                        emoji: true
                      },
                      value: 'TestValue'
                    },
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    block_id: testBlockID
                };
                expect(actualValue).to.eql(expectedValue);
            })
        })
        describe('sectionWithExternalSelect', () => {
            it('returns a formatted section block containing the provided text and an external select', () => {
                const testText = 'test';
                const testPlaceholder = 'Placeholder';
                const testActionID = 'action_id_123';
                const testInitialOption = 'Initial Option';
                const testBlockID = 'block_id_123';
                const testSelectExternal = actionSelectExternal(testPlaceholder, testActionID, testInitialOption);
                const actualValue = sectionWithExternalSelect(testText, testSelectExternal, testBlockID);
                const expectedValue = {
                    type: 'section',
                    text: {
                      type: 'mrkdwn',
                      text: 'test'
                    },
                    accessory: {
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        action_id: testActionID,
                        type: 'external_select',
                        placeholder: {
                          type: 'plain_text',
                          text: testPlaceholder
                        },
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        initial_option: {
                          "text": {
                            "type": "plain_text",
                            "text": testInitialOption
                          },
                          "value": testInitialOption
                        },
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        min_query_length: 1
                      },
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    block_id: testBlockID
                };
                expect(actualValue).to.eql(expectedValue);
            })
        })
        describe('sectionWithFields', () => {
            it('returns a formatted section block containing the provided fields', () => {
                const testField1 = 'foo';
                const testField2 = 'bar';
                const actualValue = sectionWithFields([testField1, testField2]);
                const expectedValue = {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: testField1
                        },
                        {
                            type: "mrkdwn",
                            text: testField2
                        },
                    ]
                };
                expect(actualValue).to.eql(expectedValue);
            })
        })
    })
    describe('context', () => {
        it('returns a formatted context block containing the provided text', () => {
            const testText = 'test';
            const actualValue = context(testText);
            const expectedValue = {
                type: "context",
                elements: [
                    {
                        type: "mrkdwn",
                        text: testText
                    }
                ]
            };
            expect(actualValue).to.eql(expectedValue);
        })
    })

    describe('option', () => {
        it('returns a formatted option', () => {
            const testText = 'test';
            const testValue = 'test-value';
            const actualValue = option(testText, testValue);
            const expectedValue = {
                text: {
                    type: "plain_text",
                    text: testText,
                    emoji: true
                },
                value: testValue,
            };
            expect(actualValue).to.eql(expectedValue);
        })
    })
    describe('divider', () => {
        it('returns a divider block', () => {
            const actualValue = divider();
            const expectedValue = {
                type: 'divider'
            };
            expect(actualValue).to.eql(expectedValue);
        })
    })
    describe('actionSelectExternal', () => {
        it('returns a externally powered select block', () => {
            const testPlaceholder = 'Placeholder';
            const testActionID = 'action_id_123';
            const actualValue = actionSelectExternal(testPlaceholder, testActionID);
            const expectedValue = {
                type: "external_select",
                // eslint-disable-next-line @typescript-eslint/camelcase
                action_id: testActionID,
                placeholder : {
                    type: "plain_text",
                    text: testPlaceholder
                },
                // eslint-disable-next-line @typescript-eslint/camelcase
                min_query_length: 1
            };
            expect(actualValue).to.eql(expectedValue);
        })
        it('returns a externally powered select block with the initial option set', () => {
            const testPlaceholder = 'Placeholder';
            const testActionID = 'action_id_123';
            const testInitialOption = 'Initial Option';
            const actualValue = actionSelectExternal(testPlaceholder, testActionID, testInitialOption);
            const expectedValue = {
                type: "external_select",
                // eslint-disable-next-line @typescript-eslint/camelcase
                action_id: testActionID,
                placeholder : {
                    type: "plain_text",
                    text: testPlaceholder
                },
                // eslint-disable-next-line @typescript-eslint/camelcase
                initial_option: {
                    text: {
                        type: "plain_text",
                        text: testInitialOption
                    },
                    value: testInitialOption
                },
                // eslint-disable-next-line @typescript-eslint/camelcase
                min_query_length: 1
            };
            expect(actualValue).to.eql(expectedValue);
        })    })
    describe('actionButton', () => {
        it('returns a button action block', () => {
            const testText = 'Test';
            const testValue = 'TestValue';
            const actualValue = actionButton(testText, testValue);
            const expectedValue = {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: testText,
                    emoji: true
                },
                // eslint-disable-next-line @typescript-eslint/camelcase
                action_id: testValue
            };
            expect(actualValue).to.eql(expectedValue);
        })
        it('returns a primary styled button action block', () => {
            const testText = 'Test';
            const testValue = 'TestValue';
            const actualValue = actionButton(testText, testValue, 'primary');
            const expectedValue = {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: testText,
                    emoji: true
                },
                style: 'primary',
                // eslint-disable-next-line @typescript-eslint/camelcase
                action_id: testValue
            };
            expect(actualValue).to.eql(expectedValue);
        })
    })
    describe('URLButton', () => {
        it('returns a URL button action block', () => {
            const testText = 'Test';
            const testValue = 'TestValue';
            const testURL = 'https://api.slack.com';
            const actualValue = URLButton(testText, testURL, testValue);
            const expectedValue = {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: testText,
                    emoji: true
                },
                // eslint-disable-next-line @typescript-eslint/camelcase
                action_id: testValue,
                url: testURL
            };
            expect(actualValue).to.eql(expectedValue);
        })
    })
    describe('actions', () => {
        it('returns an actions block', () => {
            const testText = 'Test';
            const testValue = 'TestValue';
            const testBlockID = 'TestBlockID';
            const testButton = actionButton(testText, testValue);
            const actualValue = actions([testButton], testBlockID)
            const expectedValue = {
                type: 'actions',
                // eslint-disable-next-line @typescript-eslint/camelcase
                block_id: testBlockID,
                elements: [
                    {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: testText,
                            emoji: true
                        },
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        action_id: testValue
                    }
                ]
            };
            expect(actualValue).to.eql(expectedValue);
        })
    })
    describe('input', () => {
        it('returns a single line input block', () => {
            const testTitle = 'Test';
            const testPlaceholder = 'TestValue';
            const testBlockID = 'TestBlockID';
            const actualValue = plainTextInput(testTitle, testBlockID, testPlaceholder)
            const expectedValue = {
                type: 'input',
                // eslint-disable-next-line @typescript-eslint/camelcase
                block_id: testBlockID,
                element: {
                    type: 'plain_text_input',
                    multiline: false,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    action_id: testBlockID,
                    placeholder : {
                        type: 'plain_text',
                        text: testPlaceholder
                    }
                },
                label: {
                    type: 'plain_text',
                    text: testTitle,
                    emoji: true
                }
            };
            expect(actualValue).to.eql(expectedValue);
        })
        it('returns a multiline line input block', () => {
            const testTitle = 'Test';
            const testPlaceholder = 'TestValue';
            const testBlockID = 'TestBlockID';
            const actualValue = plainTextInput(testTitle, testBlockID, testPlaceholder, true)
            const expectedValue = {
                type: 'input',
                // eslint-disable-next-line @typescript-eslint/camelcase
                block_id: testBlockID,
                element: {
                    type: 'plain_text_input',
                    multiline: true,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    action_id: testBlockID,
                    placeholder : {
                        type: 'plain_text',
                        text: testPlaceholder
                    }
                },
                label: {
                    type: 'plain_text',
                    text: testTitle,
                    emoji: true
                }
            };
            expect(actualValue).to.eql(expectedValue);
        })
    })
});