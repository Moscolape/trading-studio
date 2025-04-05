import * as yup from 'yup';

export const strategySchema = yup.object().shape({
  scanner: yup.object().shape({
    ruleKey: yup.mixed<string | number | boolean>().required('Rule key is required'),
  }),
  buy: yup.object().shape({
    ruleKey: yup.mixed<string | number | boolean>().required('Rule key is required'),
  }),
  sell: yup.object().shape({
    ruleKey: yup.mixed<string | number | boolean>().required('Rule key is required'),
  }),
  simulation: yup.object().shape({
    ruleKey: yup.mixed<string | number | boolean>().required('Rule key is required'),
  }),
});
