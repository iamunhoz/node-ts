type Args<T> = {
  apiBody: T;
}

type ResponseBody<T> = {
  status: 'sucesso' | 'erro' | 'cuidado';
  apiMessage: T
}

export function successResponse<T>(args: Args<T>):ResponseBody<T> {
  return {
    status: 'sucesso',
    apiMessage: args.apiBody
  }
}

export function failResponse<T>(args: Args<T>):ResponseBody<T> {
  return {
    status: 'erro',
    apiMessage: args.apiBody
  }
}