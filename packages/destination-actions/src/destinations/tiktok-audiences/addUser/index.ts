import type { ActionDefinition } from '@segment/actions-core'
import type { Settings } from '../generated-types'
import type { Payload } from './generated-types'
import { processPayload } from '../functions'
import {
  selected_advertiser_id,
  custom_audience_name,
  id_type,
  email,
  advertising_id,
  send_email,
  send_advertising_id,
  event_name,
  enable_batching,
  personas_audience_key
} from '../properties'
import { TikTokAudiences } from '../api'

const action: ActionDefinition<Settings, Payload> = {
  title: 'Add Users',
  description: 'Add contacts from an Engage Audience to a TikTok Audience Segment.',
  defaultSubscription: 'event = "Audience Entered"',
  fields: {
    selected_advertiser_id: { ...selected_advertiser_id },
    custom_audience_name: { ...custom_audience_name },
    id_type: { ...id_type },
    email: { ...email },
    advertising_id: { ...advertising_id },
    send_email: { ...send_email },
    send_advertising_id: { ...send_advertising_id },
    event_name: { ...event_name },
    enable_batching: { ...enable_batching },
    personas_audience_key: { ...personas_audience_key }
  },
  dynamicFields: {
    selected_advertiser_id: async (request, { settings }) => {
      try {
        const tiktok = new TikTokAudiences(request)

        return tiktok.fetchAdvertisers(settings.advertiser_ids)
      } catch (err) {
        return {
          choices: [],
          error: {
            message: JSON.stringify(err),
            code: '500'
          }
        }
      }
    }
  },
  perform: async (request, { settings, payload }) => {
    return processPayload(request, settings, [payload], 'add')
  },
  performBatch: async (request, { settings, payload }) => {
    return processPayload(request, settings, payload, 'add')
  }
}

export default action
