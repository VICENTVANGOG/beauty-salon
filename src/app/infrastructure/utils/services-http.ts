import { IPostService, IServices } from "@/app/core/application/dto/services/services-response.dto";
import { HttpClient } from "../utils/client-http";

export class ServicesService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient()
    }

    async findAll(page: number, size: number): Promise<IServices> {
        try {
            const response = await this.httpClient.get<IServices>(`services?page=${page}&size=${size}`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async create(service: IPostService) {
        try {
            const createCompany = this.httpClient.post("sevices", service)
            return createCompany
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    /*
    async destroy(id: string) {
        try {
            const coders = this.httpClient.delete<IVacant[]>(`Coders/${id}`)

            return coders
        } catch (error) {
            console.log(error)
            throw error;
        }
    }




    async save(id: string, body:ICreateVacancy) {
        try {
            const actualizarCoder = await this.httpClient.put(`vacants/${id}`, body);
            return actualizarCoder;
        } catch (error) {
            console.log(error);
            throw error;
        }
    } */
}