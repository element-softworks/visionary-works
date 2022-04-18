export interface Error {
  error: true;
  errorName: string;
  errorMessage: string;
  details: {
    message: string;
    path: string[];
    type: string;
    context: {
      label: string;
      key: string;
    };
  }[];
  meta: {
    endPointRequested: string;
    route: string;
    endpoint: string;
    method: string;
    postData: { [x: string]: any };
    queryData: { [x: string]: any };
    httpCode: number;
  };
}
