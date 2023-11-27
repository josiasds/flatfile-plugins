import {
  createRecords,
  deleteSpace,
  getRecords,
  setupListener,
  setupSimpleWorkbook,
  setupSpace,
} from '@flatfile/utils-testing'

import { recordHook } from '..'

import {
  defaultSimpleValueData,
  defaultSimpleValueSchema,
} from './simpleTestData'

const stringValue = 'bulk'
const intValue = 27
const booleanValue = false

jest.setTimeout(10_000)

describe('recordHook() simple data modification e2e', () => {
  const listener = setupListener()

  let spaceId
  let sheetId

  beforeAll(async () => {
    const space = await setupSpace()
    spaceId = space.id
    const workbook = await setupSimpleWorkbook(
      space.id,
      defaultSimpleValueSchema
    )
    sheetId = workbook.sheets[0].id
  })

  afterAll(async () => {
    await deleteSpace(spaceId)
  })

  describe.each([
    recordHook('test', (record) => {
      record.set('name', stringValue)
      record.set('age', intValue)
      record.set('alive', booleanValue)
    }),
    recordHook('test', async (record) => {
      await record.set('name', stringValue)
      await record.set('age', intValue)
      await record.set('alive', booleanValue)
    }),
  ])('Modifies Records', (fn) => {
    beforeEach(async () => {
      listener.use(fn)
    })

    it('correctly modifies simple values', async () => {
      await createRecords(sheetId, defaultSimpleValueData)

      await listener.waitFor('commit:created')
      const records = await getRecords(sheetId)

      expect(records[records.length - 2].values['name']).toMatchObject({
        value: stringValue,
      })
      expect(records[records.length - 1].values['name']).toMatchObject({
        value: stringValue,
      })

      expect(records[records.length - 2].values['age']).toMatchObject({
        value: intValue,
      })
      expect(records[records.length - 1].values['age']).toMatchObject({
        value: intValue,
      })

      expect(records[records.length - 2].values['alive']).toMatchObject({
        value: booleanValue,
      })
      expect(records[records.length - 1].values['alive']).toMatchObject({
        value: booleanValue,
      })
    })
  })

  describe('Assigns an invalid value and adds an error', () => {
    it('correctly assigns null and adds error', async () => {
      listener.use(
        recordHook('test', (record) => {
          record.set('name', null)
          if (record.get('name') === null) {
            record.addError('name', 'Name is null')
          }
        })
      )
      await createRecords(sheetId, defaultSimpleValueData)

      await listener.waitFor('commit:created')
      const records = await getRecords(sheetId)

      const errors = records.map((r) => {
        return r.values['name'].messages.filter((m) => m.type === 'error')
      })
      errors.forEach((e, i) => (e.length === 0 ? errors[i].splice(i, 1) : null))

      expect(records[records.length - 2].values['name']).toMatchObject({
        value: undefined,
      })
      expect(records[records.length - 1].values['name']).toMatchObject({
        value: undefined,
      })

      expect(errors.length).toBe(records.length)
    })
  })

  describe('recordHook errors', () => {
    const logErrorSpy = jest.spyOn(global.console, 'error')
    beforeEach(async () => {
      listener.use(
        recordHook('test', (record) => {
          throw new Error('oops')
        })
      )
      await createRecords(sheetId, [
        {
          name: 'John Doe',
          email: 'john@doe.com',
          notes: 'foobar',
        },
      ])
    })
    it('returns readable error', async () => {
      await listener.waitFor('commit:created')
      expect(logErrorSpy).toHaveBeenCalledWith(
        'An error occurred while running the handler: oops'
      )
    })
    afterEach(() => {
      logErrorSpy.mockClear()
    })
  })
})
