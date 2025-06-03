import type { Config } from '@wdio/sync';

export const config: Config = {
  runner: 'local',

  specs: ['./test/specs/**/*.spec.ts'],
  maxInstances: 1,

  capabilities: [
    {
      platformName: 'Android',
      'appium:platformVersion': '13.0',
      'appium:deviceName': 'SM_A515F',
      'appium:udid': '192.168.15.3:5037',
      'appium:automationName': 'UiAutomator2',
      'appium:appPackage': 'br.tv.watch.watchbrasil',
      'appium:appActivity': 'br.tv.watch.android.activities.MainActivity',
      'appium:noReset': false,
    }
  ],

  logLevel: 'info',
  bail: 0,
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: ['appium'],

  framework: 'mocha',

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  /**
   * Captura print em caso de falha e salva na pasta do Allure
   */
  afterTest: async function (test, context, { error }) {
    if (error) {
      const filename = test.title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '') + '.png';
      await browser.saveScreenshot(`./allure-results/${filename}`);
    }
  },

  autoCompileOpts: {
    tsNodeOpts: {
      transpileOnly: true,
      project: './tsconfig.json',
    }
  }
};