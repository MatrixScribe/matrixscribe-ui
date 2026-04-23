"use client";

import { create } from "zustand";

interface TopupState {
  country: any;
  operator: any;
  product: any;
  amount: number | null;

  lastTransaction: any;
  setLastTransaction: (tx: any) => void;

  setCountry: (c: any) => void;
  setOperator: (o: any) => void;
  setProduct: (p: any) => void;
  setAmount: (a: number | null) => void;

  resetOperator: () => void;
  resetProduct: () => void;
}

export const useTopupStore = create<TopupState>((set) => ({
  country: null,
  operator: null,
  product: null,
  amount: null,

  lastTransaction: null,
  setLastTransaction: (tx) => set({ lastTransaction: tx }),

  setCountry: (c) =>
    set(() => ({
      country: c,
      operator: null,
      product: null,
      amount: null,
    })),

  setOperator: (o) =>
    set(() => ({
      operator: o,
      product: null,
      amount: null,
    })),

  setProduct: (p) =>
    set(() => ({
      product: p,
      amount: p?.amount ?? null,
    })),

  setAmount: (a) => set(() => ({ amount: a })),

  resetOperator: () =>
    set(() => ({
      operator: null,
      product: null,
      amount: null,
    })),

  resetProduct: () =>
    set(() => ({
      product: null,
      amount: null,
    })),
}));
