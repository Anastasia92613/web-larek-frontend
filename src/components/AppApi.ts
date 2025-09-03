import { ApiListResponse, ApiPostMethods, IApi, IOrder, IProduct, UUID } from "../types";

export class AppApi {
    private _baseApi: IApi;

    constructor(api: IApi) {
        this._baseApi = api;
    }

    getCards(): Promise<IProduct[]>{
        return this._baseApi.get<ApiListResponse<IProduct>>(`product/`)
            .then((response) => response.items as IProduct[]);
    }

    getCard(id: UUID): Promise<IProduct>{
        return this._baseApi.get(`product/${id}`)
        .then((item => item as IProduct));
    }

    postOrder(order: IOrder): Promise<{ id: string, total: number}> {
        return this._baseApi.post<{ id: string, total: number, method: ApiPostMethods}>('order', order, 'POST');
    }
}