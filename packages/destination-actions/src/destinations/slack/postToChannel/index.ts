import type { ActionDefinition } from '@segment/actions-core'
import type { Settings } from '../generated-types'
import type { Payload } from './generated-types'
import { noop } from 'lodash'

const action: ActionDefinition<Settings, Payload> = {
  title: 'Post Message',
  description: 'Post a message to a Slack channel.',
  fields: {
    url: {
      label: 'Webhook URL',
      description: 'Slack webhook URL.',
      type: 'string',
      required: true,
      format: 'uri'
    },
    text: {
      label: 'Message',
      required: true,
      description:
        "The text message to post to Slack. You can use [Slack's formatting syntax.](https://api.slack.com/reference/surfaces/formatting)",
      type: 'text'
    },
    channel: {
      label: 'Channel',
      description: 'Slack channel to post message to.',
      type: 'string'
    },
    username: {
      label: 'User',
      description: 'User name to post messages as.',
      type: 'string',
      default: 'Segment'
    },
    icon_url: {
      label: 'Icon URL',
      description: 'URL for user icon image.',
      type: 'string',
      default: 'https://logo.clearbit.com/segment.com'
    }
  },

  perform: (request, { payload }) => {
    noop() // here to test bundled deps
    return request(payload.url, {
      method: 'post',
      json: {
        _version: '1.0.1',
        channel: payload.channel,
        text: payload.text,
        username: payload.username,
        icon_url: payload.icon_url
      }
    })
  }
}

export default action
