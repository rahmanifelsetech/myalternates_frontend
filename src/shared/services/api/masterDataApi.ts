import RtkQueryService from '../rtkService';

const masterDataApi = RtkQueryService.enhanceEndpoints({
    addTagTypes: ["Amcs", "Products", "Schemes", "Distributors", "Users", "FundManagers"],
}).injectEndpoints({
    endpoints: (builder) => ({
        getAmcList: builder.query<any, { productId?: string } | void>({
            query: (params) => ({
                url: '/amcs?limit=1000&isActive=true',
                method: 'GET',
                params: params || {},
            }),
            providesTags: [{ type: "Amcs", id: "LIST" }],
        }),
        getProductList: builder.query<any, void>({
            query: () => ({ url: '/products?limit=1000&isActive=true', method: 'GET' }),
            providesTags: [{ type: "Products", id: "LIST" }],
        }),
        getSchemeList: builder.query<any, { amcId?: string } | void>({
            query: (params) => ({
                url: '/schemes?limit=1000&isActive=true',
                method: 'GET',
                params: params || {},
            }),
            providesTags: [{ type: "Schemes", id: "LIST" }],
        }),
        getDistributorList: builder.query<any, void>({
            query: () => ({ url: '/distributors?limit=1000&isActive=true', method: 'GET' }),
            providesTags: [{ type: "Distributors", id: "LIST" }],
        }),
        getUserList: builder.query<any, void>({
            query: () => ({ url: '/users?limit=1000&isActive=true', method: 'GET' }),
            providesTags: [{ type: "Users", id: "LIST" }],
        }),
        getFundManagerList: builder.query<any, void>({
            query: () => ({ url: '/masters/fund-managers?limit=1000&isActive=true', method: 'GET' }),
            providesTags: [{ type: "FundManagers", id: "LIST" }],
        }),
    }),
});

export const {
    useGetAmcListQuery,
    useGetProductListQuery,
    useGetSchemeListQuery,
    useGetDistributorListQuery,
    useGetUserListQuery,
    useGetFundManagerListQuery,
} = masterDataApi;
