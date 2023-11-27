import {
  createRecords,
  deleteSpace,
  getRecords,
  setupListener,
  setupSimpleWorkbook,
  setupSpace,
} from '@flatfile/utils-testing'

import { bulkRecordHook } from '..'

import {
  defaultObjectValueData,
  defaultObjectValueSchema,
} from './objectTestData'

jest.setTimeout(10_000)

const enumValue = 'secondValue'
const badEnumValue = 'badValue'

describe('bulkRecordHook() object data modification e2e', () => {
  const listener = setupListener()

  let spaceId
  let sheetId

  beforeAll(async () => {
    const space = await setupSpace()
    spaceId = space.id
    const workbook = await setupSimpleWorkbook(
      space.id,
      defaultObjectValueSchema
    )
    sheetId = workbook.sheets[0].id
  })

  afterAll(async () => {
    await deleteSpace(spaceId)
  })

  describe('Assigns a valid value to an enum', () => {
    beforeEach(async () => {
      listener.use(
        bulkRecordHook('test', (records) =>
          records.map((record) => {
            record.set('array', enumValue)
          })
        )
      )
    })

    it('correctly modifies Object values', async () => {
      await createRecords(sheetId, defaultObjectValueData)

      await listener.waitFor('commit:created')
      const records = await getRecords(sheetId)
      expect(records[records.length - 1].valid).toBeTruthy()
    })
  })
  describe('Assigns an invalid value to an enum', () => {
    beforeEach(async () => {
      listener.use(
        bulkRecordHook('test', (records) =>
          records.map((record) => {
            record.set('array', badEnumValue)
          })
        )
      )
    })

    it('correctly modifies Object values', async () => {
      await createRecords(sheetId, defaultObjectValueData)

      await listener.waitFor('commit:created')
      const records = await getRecords(sheetId)
      expect(records[records.length - 1].valid).toBeFalsy()
    })
  })
})
