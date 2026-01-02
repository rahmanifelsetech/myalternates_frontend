// import ApiService from '../ApiService';
// import type {
//   GetPortfoliosResponse,
//   GetPortfolioResponse,
//   CreatePortfolioResponse,
//   UpdatePortfolioResponse,
//   DeletePortfolioResponse,
//   CreatePortfolioPayload,
//   UpdatePortfolioPayload,
// } from '@/types/portfolio';
// import type { PaginationParams } from '@/types/api';

// export const portfolioService = {
//   getPortfolios: async (params?: PaginationParams): Promise<GetPortfoliosResponse> => {
//     return ApiService.get<GetPortfoliosResponse>('/portfolios', { params });
//   },

//   getPortfolio: async (id: string): Promise<GetPortfolioResponse> => {
//     return ApiService.get<GetPortfolioResponse>(`/portfolios/${id}`);
//   },

//   createPortfolio: async (data: CreatePortfolioPayload): Promise<CreatePortfolioResponse> => {
//     return ApiService.post<CreatePortfolioResponse>('/portfolios', data);
//   },

//   updatePortfolio: async (id: string, data: UpdatePortfolioPayload): Promise<UpdatePortfolioResponse> => {
//     return ApiService.put<UpdatePortfolioResponse>(`/portfolios/${id}`, data);
//   },

//   deletePortfolio: async (id: string): Promise<DeletePortfolioResponse> => {
//     return ApiService.deleteRequest<DeletePortfolioResponse>(`/portfolios/${id}`);
//   },

//   getPortfolioSummary: async (id: string): Promise<GetPortfolioResponse> => {
//     return ApiService.get<GetPortfolioResponse>(`/portfolios/${id}/summary`);
//   },
// };

// export default portfolioService;
