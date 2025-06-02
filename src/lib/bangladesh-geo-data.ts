import type { Division } from './types';

export const divisions: Division[] = [
  {
    id: 'dhaka',
    name: 'ঢাকা',
    districts: [
      {
        id: 'dhaka_dist',
        name: 'ঢাকা',
        thanas: [
          { id: 'dha_th_1', name: 'রমনা' },
          { id: 'dha_th_2', name: 'ধানমন্ডি' },
          { id: 'dha_th_3', name: 'পল্টন' },
          { id: 'dha_th_4', name: 'মতিঝিল' },
        ],
      },
      {
        id: 'gazipur_dist',
        name: 'গাজীপুর',
        thanas: [
          { id: 'gaz_th_1', name: 'গাজীপুর সদর' },
          { id: 'gaz_th_2', name: 'কালিয়াকৈর' },
        ],
      },
    ],
  },
  {
    id: 'chattogram',
    name: 'চট্টগ্রাম',
    districts: [
      {
        id: 'chattogram_dist',
        name: 'চট্টগ্রাম',
        thanas: [
          { id: 'cht_th_1', name: 'কোতোয়ালী' },
          { id: 'cht_th_2', name: 'পাহাড়তলী' },
        ],
      },
      {
        id: 'coxsbazar_dist',
        name: 'কক্সবাজার',
        thanas: [
          { id: 'cox_th_1', name: 'কক্সবাজার সদর' },
          { id: 'cox_th_2', name: 'উখিয়া' },
        ],
      },
    ],
  },
  {
    id: 'khulna',
    name: 'খুলনা',
    districts: [
      {
        id: 'khulna_dist',
        name: 'খুলনা',
        thanas: [
          { id: 'khl_th_1', name: 'খুলনা সদর' },
          { id: 'khl_th_2', name: 'সোনাডাঙ্গা' },
        ],
      },
    ],
  },
  // Add more divisions, districts, and thanas as needed
];
