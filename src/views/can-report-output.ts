/* eslint-disable @typescript-eslint/camelcase */
import { section, divider, context } from '../block-kit/block-builder';
import { KnownBlock } from '@slack/bolt/node_modules/@slack/types'

export default {
  blocks: (authorID: string, conditions: string, actions: string, needs: string, nextReportTime: string, channelID: string): KnownBlock[] => {
    const currentTimeInMS = (Date.now() / 1000).toFixed(0); 
    const nextReportInMS = (+currentTimeInMS + (+nextReportTime * 60));
    return [
        section(`*CAN Report | <!date^${currentTimeInMS}^{date_short} {time}|${currentTimeInMS}>* | <#${channelID}>`),
        section(`*Incident Commander: *<@${authorID}>`),
        divider(),
        section(`*Conditions*\n${conditions}`),
        divider(),
        section(`*Actions*\n${actions}`),
        divider(),
        section(`*Needs*\n${needs}`),
        divider(),
        context(`Next update<!date^${nextReportInMS}^ is {date_short_pretty} at {time}| in ${nextReportTime} minutes>`)
      ];
    }
}