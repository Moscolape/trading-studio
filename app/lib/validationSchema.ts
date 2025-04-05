import * as yup from 'yup';

export const strategySchema = yup.object().shape({
  scanner: yup.object().shape({
    ruleKey: yup
      .string()
      .required('Rule key is required')
      .test('scanner-rule', 'Invalid scanner rule', (value) => {
        const validRules = [
          'last 300 days price growth is greater than 0%',
          'price of the instrument is greater than 99',
          'instrument is among the top 10% instruments when ranked by market capitalization',
          'instrument\'s 90 day average daily transaction value is greater than 300000000',
        ];
        return validRules.some((rule) => value?.includes(rule));
      }),
  }),
  buy: yup.object().shape({
    ruleKey: yup.string().required('Rule key is required').test(
      'valid-buy-rule',
      'Invalid buy rule',
      (value) => {
        return value === 'last price is greater than or equal to last 30 day close AND last price is greater than or equal to last 30 day moving average';
      }
    ),
  }),
  sell: yup.object().shape({
    ruleKey: yup
      .string()
      .required('Rule key is required')
      .test('valid-sell-rule', 'Invalid sell rule', (value) => {
        const validSellRules = [
          'trailing stoploss is greater than or equal to 10% AND hold positions for at least 5 days',
        ];
        return validSellRules.includes(value);
      }),
  }),
  simulation: yup.object().shape({
    ruleKey: yup
      .string()
      .required('Rule key is required')
      .test('valid-simulation-rule', 'Invalid simulation rule', (value) => {
        const validSimulationRules = [
          'start_margin = 100000 AND simulation_start_date = \'01/01/2000\' AND simulation_end_date = \'20/03/2025\' AND max_positions = 20 AND max_positions_per_instrument = 1 AND order_sorting_type = 300-days-top-gainer-first',
        ];
        return validSimulationRules.includes(value);
      }),
  }),
});