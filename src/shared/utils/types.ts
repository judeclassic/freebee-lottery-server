export type IError = {
    field: string;
    message: string;
}

type ResponseProps<Response> = {
    status: true;
    message?: string;
    data: Response
} | {
    status: false;
    message: string;
} | {
    status: false;
    message?: string;
    error: IError[];
}

export type IResponse<Response> = Promise<ResponseProps<Response>>

export type IPaginateOptions = {
    page: number;
    limit: number;
}