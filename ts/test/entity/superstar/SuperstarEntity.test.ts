

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { WweSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('SuperstarEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WWE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WWE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WweSDK.test()
    const ent = testsdk.Superstar()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('superstar hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of WweSDK.test(offline).Superstar().stream('list')) { }
    }, /offline/)

    for await (const _item of WweSDK.test(offline).Superstar()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = WweSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Superstar().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of WweSDK.test().Superstar().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new WweSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Superstar().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Superstar().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WweSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Superstar().list({"url":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WWE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'superstar.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"Site-relative profile path, e.g.","t":"`$STRING`","key$":"url","index$":0},"value":{"a":true,"h":"Value","n":"value","r":true,"sh":"Superstar display name in upper case, e.g.","t":"`$STRING`","key$":"value","index$":1}},"name":"superstar","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /superstar/talent","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/superstar/talent","q":{"$action":"talent"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"superstar"},{"lit":"talent"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"superstar","name__orig":"superstar","Name":"Superstar","name_":"superstar","name-":"superstar","NAME":"SUPERSTAR","index$":1}, {"active":true,"entity":"superstar","key$":"BasicSuperstarFlow","kind":"basic","name":"BasicSuperstarFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"superstar_ref01"}}],"index$":0}]}, 'Superstar', {"GET /superstar/talent":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let superstar_ref01_data = Object.values(setup.data.existing.superstar)[0] as any

    // LIST
    const superstar_ref01_ent = client.Superstar()
    const superstar_ref01_match: any = {}

    const superstar_ref01_list = (await superstar_ref01_ent.list(superstar_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/superstar/SuperstarTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = WweSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['superstar01','superstar02','superstar03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WWE_TEST_SUPERSTAR_ENTID': idmap,
    'WWE_TEST_LIVE': 'FALSE',
    'WWE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WWE_TEST_SUPERSTAR_ENTID']

  const live = 'TRUE' === env.WWE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WWE_TEST_SUPERSTAR_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new WweSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.WWE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
