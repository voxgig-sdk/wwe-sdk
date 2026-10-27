

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


describe('GalleryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WWE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WWE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WweSDK.test()
    const ent = testsdk.Gallery()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WweSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Gallery().load({"items_offset":"x","items_per_page":1,"node_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WWE_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'gallery.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"galleries":{"a":true,"h":"Galleries","n":"galleries","r":true,"t":"`$ARRAY`","key$":"galleries","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1}},"id":{"field":"id","name":"id","parts":["node_id","items_per_page","items_offset"],"sep":"/"},"name":"gallery","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/gallery-related/{nodeId}/{itemsPerPage}/{itemsOffset}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":0,"k":"param","n":"items_offset","or":"itemsOffset","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"ex":14,"k":"param","n":"items_per_page","or":"itemsPerPage","r":true,"t":"`$INTEGER`","index$":1},{"a":true,"ex":50011841,"k":"param","n":"node_id","or":"nodeId","r":true,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/api/gallery-related/{nodeId}/{itemsPerPage}/{itemsOffset}","q":{"exist":["items_offset","items_per_page","node_id"]},"r":{"param":{"itemsOffset":"items_offset","itemsPerPage":"items_per_page","nodeId":"node_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"gallery-related"},{"var":"node_id"},{"var":"items_per_page"},{"var":"items_offset"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"gallery","name__orig":"gallery","Name":"Gallery","name_":"gallery","name-":"gallery","NAME":"GALLERY","index$":0}, {"active":true,"entity":"gallery","key$":"BasicGalleryFlow","kind":"basic","name":"BasicGalleryFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"gallery_ref01","srcdatavar":"gallery_ref01_data","suffix":"_dt0"},"m":{"id":"gallery01","items_per_page":"items_per_page01","node_id":"node01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-gallery_ref01"}}],"unreachable":true}]}, 'Gallery', {"GET /api/gallery-related/{nodeId}/{itemsPerPage}/{itemsOffset}":{"protocol":"http","parameters":[{"name":"nodeId","in":"path","required":true,"description":"Drupal node id of a video or gallery.","schema":{"type":"integer"},"example":50011841,"index$":0},{"name":"itemsPerPage","in":"path","required":true,"description":"Number of galleries to return (the client's default is 14).","schema":{"type":"integer"},"example":14,"index$":1},{"name":"itemsOffset","in":"path","required":true,"description":"Number of galleries to skip.","schema":{"type":"integer"},"example":0,"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let gallery_ref01_data = Object.values(setup.data.existing.gallery)[0] as any

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
      '../../../../.sdk/test/entity/gallery/GalleryTestData.json')

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
    ['gallery01','gallery02','gallery03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WWE_TEST_GALLERY_ENTID': idmap,
    'WWE_TEST_LIVE': 'FALSE',
    'WWE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WWE_TEST_GALLERY_ENTID']

  const live = 'TRUE' === env.WWE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WWE_TEST_GALLERY_ENTID']
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
  
