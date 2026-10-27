
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { WweSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = WweSDK.test()
    equal(testsdk instanceof WweSDK, true,
      'WweSDK.test() must return a client synchronously')
  })

})
