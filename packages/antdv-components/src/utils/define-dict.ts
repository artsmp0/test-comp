const toRawType = (val: unknown) => Object.prototype.toString.call(val).slice(8, -1);

const isPropertyKey = (val: unknown): val is PropertyKey => ['String', 'Number', 'Symbol'].includes(toRawType(val));

/** 提取对象键值对作为新对象 */
const pick = <T extends object>(target: T, keys: (keyof T)[]) => {
  return keys.reduce((dict, key) => ({ ...dict, [key]: target[key] }), {});
};

type ValidKeys<T, K extends keyof T = keyof T> = K extends K ? (T[K] extends PropertyKey ? K : never) : never;

function defineDict<T extends object, K extends keyof T>(dist: T[], key: K): T[K][];
function defineDict<T extends object, K extends ValidKeys<T>, V extends keyof T>(
  dist: T[],
  key: K,
  values: V
): Record<T[K] extends PropertyKey ? T[K] : never, T[V]>;
function defineDict<T extends object, K extends ValidKeys<T>, V extends keyof T>(
  dist: T[],
  key: K,
  values: V[]
): Record<T[K] extends PropertyKey ? T[K] : never, Pick<T, V>>;
function defineDict<T extends object, K extends ValidKeys<T>, V extends 'all'>(
  dist: T[],
  key: K,
  values: V
): Record<T[K] extends PropertyKey ? T[K] : never, Pick<T, ValidKeys<T>>>;
function defineDict<T extends object, K extends keyof T, V extends keyof T>(dist: T[], key: K, values?: V | V[] | 'all') {
  if (typeof values === 'undefined') {
    return dist.map(def => def[key]);
  }

  if (values === 'all') {
    return dist.reduce((map, def) => {
      const newKey = def[key];
      if (!isPropertyKey(newKey)) return map;

      const newVal = def;

      return { ...map, [newKey]: newVal };
    }, {});
  }

  return dist.reduce((map, def) => {
    const newKey = def[key];
    if (!isPropertyKey(newKey)) return map;

    const newVal = Array.isArray(values) ? pick(def, values) : def[values];

    return { ...map, [newKey]: newVal };
  }, {});
}

export { defineDict };
