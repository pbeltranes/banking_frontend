import type { NextApiRequest, NextApiResponse } from "next";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import Cookies from "js-cookie";
import { BACKEND_BASEPATH } from "../../lib/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = req.body;
    const service = new Service();

    const {
      data: { initial_balance, account_id },
    } = await service.create(data);

    Cookies.set("account_id", account_id, { expires: 3600 });
    res.setHeader("Set-Cookie", [
      `account_id=${account_id}; Path=/;  HttpOnly; Max-Age=3600`,
      `balance=${Number(initial_balance)}; Path=/;   HttpOnly; Max-Age=3600`,
    ]);

    res.status(200).json({ account_id, initial_balance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
class Service {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
      baseURL: BACKEND_BASEPATH,
      timeout: 3000,
    });
    // this.instance.interceptors.request.use(this.onRequestError);
    this.instance.interceptors.response.use(
      this.onResponse,
      this.onResponseError
    );
  }

  onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
  };

  onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${error}]`);
    return Promise.reject(error);
  };

  onResponse = (response: AxiosResponse): AxiosResponse => {
    console.info(`[response] [${JSON.stringify(response.data)}]`);
    return response;
  };

  onResponseError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[response error] [${error}]`);
    return Promise.reject(error);
  };

  create = async (body: any) => {
    return await this.instance.request({
      url: `/accounts`,
      method: "POST",
      data: body,
    });
  };
}
