import axios, { AxiosResponse } from 'axios';
import axiosConfig from '../config/axiosConfig';
import { getApiUrlByResourceType, sendMultipartPostRequest } from '../utils/apiUtils';
import { PleiepengesøknadApiData } from '../types/PleiepengesøknadApiData';
import { PleiepengesøknadFormData } from '../types/PleiepengesøknadFormData';
import { ResourceType } from '../types/ResourceType';
import { Arbeidsgiver } from 'app/types/Søkerdata';
import { MellomlagringData } from '../types/storage';
import { StepID } from '../config/stepConfig';

export const persist = (formData: PleiepengesøknadFormData, lastStepID: StepID) => {
    const body: MellomlagringData = { formData, metadata: { lastStepID } };
    const url = `${getApiUrlByResourceType(ResourceType.MELLOMLAGRING)}?lastStepID=${encodeURI(lastStepID)}`;
    axios.post(url, { ...body }, axiosConfig);
};
export const rehydrate = () => axios.get(getApiUrlByResourceType(ResourceType.MELLOMLAGRING), axiosConfig);
export const purge = () => axios.delete(getApiUrlByResourceType(ResourceType.MELLOMLAGRING), {...axiosConfig, data: {}});

export const getBarn = () => axios.get(getApiUrlByResourceType(ResourceType.BARN), axiosConfig);
export const getSøker = () => axios.get(getApiUrlByResourceType(ResourceType.SØKER), axiosConfig);
export const getArbeidsgiver = (fom: string, tom: string): Promise<AxiosResponse<{ organisasjoner: Arbeidsgiver[] }>> =>
    axios.get(`${getApiUrlByResourceType(ResourceType.ARBEIDSGIVER)}?fra_og_med=${fom}&til_og_med=${tom}`, axiosConfig);

export const sendApplication = (data: PleiepengesøknadApiData) =>
    axios.post(getApiUrlByResourceType(ResourceType.SEND_SØKNAD), data, axiosConfig);

export const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('vedlegg', file);
    return sendMultipartPostRequest(getApiUrlByResourceType(ResourceType.VEDLEGG), formData);
};
export const deleteFile = (url: string) => axios.delete(url, axiosConfig);
