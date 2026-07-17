declare module "razorpay" {
  interface RazorpayOrder {
    id: string;
    amount: number | string;
    currency: string;
    receipt?: string;
  }

  interface RazorpayPlan {
    id: string;
  }

  interface RazorpaySubscription {
    id: string;
  }

  export default class Razorpay {
    constructor(options: { key_id: string; key_secret: string });
    orders: {
      create(options: {
        amount: number;
        currency: string;
        receipt?: string;
        notes?: Record<string, string>;
      }): Promise<RazorpayOrder>;
    };
    plans: {
      create(options: {
        period: string;
        interval: number;
        item: {
          name: string;
          amount: number;
          currency: string;
          description?: string;
        };
      }): Promise<RazorpayPlan>;
    };
    subscriptions: {
      create(options: {
        plan_id: string;
        total_count: number;
        customer_notify?: number;
        notes?: Record<string, string>;
      }): Promise<RazorpaySubscription>;
    };
  }
}
