'use strict'

const assert = require('assert')
const clearModule = require('clear-module')

// On Github Actions, building a PR
{
  process.env.GITHUB_ACTIONS = 'true'
  process.env.GITHUB_EVENT_NAME = 'pull_request'

  const isPR = require('./')
  assert.strictEqual(isPR, true)

  clearModule('./')
  clearModule('ci-info')
}

// On Github Actions, not building a PR
{
  process.env.GITHUB_EVENT_NAME = 'pusg'

  const isPR = require('./')
  assert.strictEqual(isPR, false)

  clearModule('./')
  clearModule('ci-info')
}

// On a generic CI server
{
  delete process.env.GITHUB_EVENT_NAME
  delete process.env.GITHUB_ACTIONS
  process.env.CI = 'true'

  const isPR = require('./')
  assert.strictEqual(isPR, null)

  clearModule('./')
  clearModule('ci-info')
}

// Not on a CI server
{
  delete process.env.CI
  delete process.env.CONTINUOUS_INTEGRATION
  delete process.env.BUILD_NUMBER
  delete process.env.GITHUB_ACTIONS
  delete process.env.GITHUB_EVENT_NAME

  const isPR = require('./')
  assert.strictEqual(isPR, null)
}
