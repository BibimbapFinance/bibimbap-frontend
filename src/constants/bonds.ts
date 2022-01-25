import { getAddresses } from '.';

export type BondKey = 'mai' | 'mai_bbb' | 'frax_44';

export const BondKeys: BondKey[] = ['mai', 'mai_bbb', 'frax_44'];

export const ReserveKeys: BondKey[] = ['mai', 'frax_44'];

export enum BondAction {
  Bond = 'bond',
  Redeem = 'redeem',
}

export interface Bond {
  key: BondKey;
  name: string;
  address: string;
  reserve: string;
  reserveUnit: string;
  type: 'token' | 'lp';
  dexUrl: string;
  deprecated: boolean;
  autostake: boolean;
}

type BondMap = {
  [key in BondKey]: Bond;
};

export function listBonds(chainId: number): BondMap {
  const { BONDS, RESERVES, MAI_ADDRESS, BBB_ADDRESS, FRAX_ADDRESS } = getAddresses(chainId);
  return {
    mai: {
      key: 'mai',
      name: 'MAI',
      address: BONDS.MAI,
      reserve: RESERVES.MAI,
      reserveUnit: 'MAI',
      type: 'token',
      dexUrl: `https://app.sushi.com/swap?outputCurrency=${MAI_ADDRESS}`,
      deprecated: true,
      autostake: false,
    },
    // mai44: {
    //   key: 'mai44',
    //   name: 'MAI (4,4)',
    //   address: '0x779CB532e289CbaA3d0692Ae989C63C2B4fBd4d0',
    //   reserve: RESERVES.MAI,
    //   reserveUnit: 'MAI',
    //   type: 'token',
    //   dexUrl: `https://quickswap.exchange/#/swap?outputCurrency=${MAI_ADDRESS}`,
    //   deprecated: false,
    //   autostake: true,
    // },
    mai_bbb: {
      key: 'mai_bbb',
      name: 'MAI-BBB LP',
      address: BONDS.MAI_BBB,
      reserve: RESERVES.MAI_BBB,
      reserveUnit: 'LP',
      type: 'lp',
      dexUrl: `https://app.sushi.com/add/${MAI_ADDRESS}/${BBB_ADDRESS}`,
      deprecated: true,
      autostake: false,
    },
    frax_44: {
      key: 'frax_44',
      name: 'FRAX (4,4)',
      address: BONDS.FRAX,
      reserve: RESERVES.FRAX,
      reserveUnit: 'FRAX',
      type: 'token',
      dexUrl: `https://quickswap.exchange/#/add/${FRAX_ADDRESS}`,
      deprecated: false,
      autostake: true,
    },
    // mai_clam44: {
    //   key: 'mai_clam44',
    //   name: 'MAI-CLAM2 (4,4)',
    //   address: '0xda0d7c3d751d00a1ec1c495eF7Cf3db1a202B0B9',
    //   reserve: RESERVES.MAI_CLAM,
    //   reserveUnit: 'LP',
    //   type: 'lp',
    //   dexUrl: `https://quickswap.exchange/#/add/${MAI_ADDRESS}/${BBB_ADDRESS}`,
    //   deprecated: false,
    //   autostake: true,
    // },
  };
}

export function getBond(bondKey: BondKey, chainId: number): Bond {
  return listBonds(chainId)[bondKey];
}
