import RtkQueryService from '../rtkService';

const masterDataApi = RtkQueryService.enhanceEndpoints({
    addTagTypes: ["Amcs", "Products", "Schemes", "Distributors", "Users", "FundManagers"],
}).injectEndpoints({
    endpoints: (builder) => ({
        getAmcList: builder.query<any, { productId?: string } | void>({
            query: (params) => ({
                url: '/amcs/code/all',
                method: 'GET',
                params: params || {},
            }),
            providesTags: [{ type: "Amcs", id: "AMCSLIST" }],
        }),
        getProductList: builder.query<any, void>({
            query: () => ({ url: '/products/code/all', method: 'GET' }),
            providesTags: [{ type: "Products", id: "PRODUCTSLIST" }],
        }),
        getSchemeList: builder.query<any, { amcId?: string } | void>({
            query: (params) => ({
                url: '/schemes/code/all',
                method: 'GET',
                params: params || {},
            }),
            providesTags: [{ type: "Schemes", id: "SCHEMESLIST" }],
        }),
        getDistributorList: builder.query<any, void>({
            query: () => ({ url: '/distributors/code/all', method: 'GET' }),
            providesTags: [{ type: "Distributors", id: "DISTRIBUTORSLIST" }],
        }),
        getUserList: builder.query<any, void>({
            query: () => ({ url: '/users/code/all', method: 'GET' }),
            providesTags: [{ type: "Users", id: "USERSLIST" }],
        }),
        getFundManagerList: builder.query<any, void>({
            query: () => ({ url: '/masters/fund-managers/code/all', method: 'GET' }),
            providesTags: [{ type: "FundManagers", id: "FUNDMANAGERSLIST" }],
        }),
    }),
});

export const {
    useGetAmcListQuery,
    useLazyGetAmcListQuery,
    useGetProductListQuery,
    useLazyGetProductListQuery,
    useGetSchemeListQuery,
    useLazyGetSchemeListQuery,
    useGetDistributorListQuery,
    useLazyGetDistributorListQuery,
    useGetUserListQuery,
    useLazyGetUserListQuery,
    useGetFundManagerListQuery,
    useLazyGetFundManagerListQuery,
} = masterDataApi;
