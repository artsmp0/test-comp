import type { AppContext, Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null;
};

export type Prettify<T> = { [P in keyof T]: T[P] } & {};

export type Recordable<T = any> = Record<string, T>;

export type Key = string | number;

export type Nullable<T> = undefined | T;
