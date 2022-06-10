import axios, { type AxiosInstance } from 'axios';

declare const _siteId: unique symbol;
export type SiteId = string & { readonly [_siteId]: never };

export interface AppConfig {
	apiBaseUrl: string;
}

export interface BaseSite {
	address: string;
	lat: string;
	lng: string;
}

export interface Site extends BaseSite {
	id: SiteId;
}

class Api {
	client: AxiosInstance;

	constructor(baseUrl: string) {
		this.client = axios.create({
			baseURL: baseUrl,
			timeout: 1000
		});
	}

	async createSite(site: BaseSite): Promise<Site> {
		const { data } = await this.client.post('/v1/sites', site);
		return data;
	}

	async getSite(siteId: SiteId): Promise<Site> {
		const { data } = await this.client.get(`/v1/sites/${siteId}`);
		return data;
	}

	async getSites(): Promise<Site[]> {
		const { data } = await this.client.get('/v1/sites');
		return data;
	}

	async updateSite(siteId: SiteId, site: BaseSite): Promise<Site> {
		const { data } = await this.client.put(`/v1/sites/${siteId}`, site);
		return data;
	}

	async deleteSite(siteId: SiteId): Promise<Site> {
		const { data } = await this.client.delete(`/v1/sites/${siteId}`);
		return data;
	}
}

let apiClient = new Api('http://localhost:8080/api');

function createApiClient(apiBaseUrl: string): Api {
	apiClient = new Api(apiBaseUrl);
	return apiClient;
}

export { apiClient, createApiClient };
