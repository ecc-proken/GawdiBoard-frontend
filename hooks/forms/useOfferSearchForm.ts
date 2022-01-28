import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import type { DefaultValues, NestedValue, Resolver } from 'react-hook-form';
import * as yup from 'yup';

type FormValue = {
  offer_tag_ids: NestedValue<number[]>;
};

const schema = yup.object({
  offer_tag_ids: yup
    .array(yup.number())
    .required()
    .transform((value) => value.filter(Boolean)),
});

function useOfferSearchForm(defaultValues?: DefaultValues<FormValue>) {
  return useForm<FormValue>({
    resolver: yupResolver(schema) as Resolver<FormValue>,
    defaultValues: { offer_tag_ids: [], ...defaultValues },
  });
}

export { useOfferSearchForm };
