import RtkQueryService from "@shared/services/rtkService";
import { SchemeListResponse, SchemeResponse, CreateSchemePayload, UpdateSchemePayload, SchemeFilters } from "../types/scheme";

const schemeApiWithTags = RtkQueryService.enhanceEndpoints({
    addTagTypes: ["Schemes", "Scheme", "Amcs", "Categories", "AssetClasses", "BenchmarkIndices", "FundManagers"],
});

const schemeApi = schemeApiWithTags.injectEndpoints({
    endpoints: (builder) => ({
        getSchemes: builder.query<SchemeListResponse, SchemeFilters>({
            query: (params) => ({
                url: '/schemes',
                method: 'GET',
                params
            }),
            providesTags: ["Schemes"],
        }),
        getSchemeById: builder.query<SchemeResponse, string>({
            query: (id) => ({
                url: `/schemes/${id}`,
                method: 'GET',
            }),
            providesTags: (_result, _error, id) => [{ type: "Scheme", id }],
        }),
        createScheme: builder.mutation<SchemeResponse, CreateSchemePayload>({
            query: (body) => ({
                url: '/schemes',
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Schemes"],
        }),
        updateScheme: builder.mutation<SchemeResponse, UpdateSchemePayload>({
            query: ({ id, ...body }) => ({
                url: `/schemes/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => ["Schemes", { type: "Scheme", id }],
        }),
        deleteScheme: builder.mutation<void, string>({
            query: (id) => ({
                url: `/schemes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Schemes"],
        }),
        // Master Data Endpoints
        getAmcList: builder.query<any, void>({
            query: () => ({ url: '/amcs?limit=1000', method: 'GET' }),
            providesTags: [{ type: "Amcs", id: "LIST" }],
        }),
        getCategoryList: builder.query<any, void>({
            query: () => ({ url: '/masters/categories?limit=1000', method: 'GET' }),
            providesTags: [{ type: "Categories", id: "LIST" }],
        }),
        getAssetClassList: builder.query<any, void>({
            query: () => ({ url: '/masters/asset-classes?limit=1000', method: 'GET' }),
            providesTags: [{ type: "AssetClasses", id: "LIST" }],
        }),
        getBenchmarkIndexList: builder.query<any, void>({
            query: () => ({ url: '/masters/benchmark-indices?limit=1000', method: 'GET' }),
            providesTags: [{ type: "BenchmarkIndices", id: "LIST" }],
        }),
        getFundManagerList: builder.query<any, void>({
            query: () => ({ url: '/masters/fund-managers?limit=1000', method: 'GET' }),
            providesTags: [{ type: "FundManagers", id: "LIST" }],
        }),
    }),
});

export const {
    useGetSchemesQuery,
    useGetSchemeByIdQuery,
    useCreateSchemeMutation,
    useUpdateSchemeMutation,
    useDeleteSchemeMutation,
    useGetAmcListQuery,
    useGetCategoryListQuery,
    useGetAssetClassListQuery,
    useGetBenchmarkIndexListQuery,
    useGetFundManagerListQuery,
} = schemeApi;