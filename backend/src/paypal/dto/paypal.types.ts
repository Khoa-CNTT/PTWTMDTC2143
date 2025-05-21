export interface PaypalOrderResponse {
  id: string;
  status: string;
  links: {
    href: string;
    rel: string;
    method: string;
  }[];
}

export interface PaypalCaptureResponse {
  id: string;
  status: string;
  purchase_units: {
    payments: {
      captures: {
        id: string;
        status: string;
        amount: {
          currency_code: string;
          value: string;
        };
      }[];
    };
  }[];
}
